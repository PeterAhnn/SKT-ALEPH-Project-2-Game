// Controlled boundary fixtures; these records are not actual player evidence.
(async()=>{
 const g=qa.game,results=[],wait=ms=>new Promise(r=>setTimeout(r,ms));
 const click=id=>document.getElementById(id).click();
 const until=async predicate=>{const end=performance.now()+3000;while(!predicate()){if(performance.now()>end)throw Error('Browser state wait timed out');await wait(30)}};
 const resetState=()=>({hp:g.hp,time:g.time,score:g.score,level:g.level,enemies:g.enemies.length,bullets:g.bullets.length,gems:g.gems.length,inputActions:g.inputActions});
 if(document.getElementById('reduceMotion').checked)click('reduceMotion');
 const ctx=document.getElementById('game').getContext('2d'),fill=ctx.fillRect;
 let particles=0;
 ctx.fillRect=function(x,y,w,h){if(w===5&&h===5)particles++;return fill.call(this,x,y,w,h)};
 click('startButton');await wait(100);
 results.push({test:'no success particles during ordinary play',pass:particles===0});
 g.hp=0;await until(()=>g.status==='lost');
 results.push({test:'loss boundary has no success particles',pass:g.status==='lost'&&particles===0});
 click('restartButton');
 results.push({test:'restart after loss',state:resetState()});
 g.time=29.99;await until(()=>g.status==='won');await wait(100);
 results.push({test:'success unlocks next stage and creates effect',pass:g.status==='won'&&!document.getElementById('nextStageButton').hidden&&particles>0,particleDraws:particles});
 click('reduceMotion');particles=0;await wait(100);
 results.push({test:'reduce motion immediately stops active particles',pass:particles===0});
 click('nextStageButton');
 results.push({test:'next stage resets current round',stage:g.stage,state:resetState()});
 g.time=29.99;await until(()=>g.status==='won');await wait(50);click('nextStageButton');
 results.push({test:'second win unlocks third stage',stage:g.stage,state:resetState()});
 g.time=29.99;await until(()=>g.status==='won');await wait(50);
 results.push({test:'final stage has no next-stage button',pass:g.status==='won'&&document.getElementById('nextStageButton').hidden});
 click('restartButton');results.push({test:'restart after success',state:resetState()});
 g.status='upgrade';await wait(50);click('pauseButton');await wait(50);click('resumeButton');
 results.push({test:'pause during upgrade preserves choice',pass:g.status==='upgrade'&&!document.getElementById('upgradeScreen').hidden});
 document.querySelector('[data-upgrade="rate"]').click();
 results.push({test:'upgrade resumes play',pass:g.status==='playing'&&g.fireInterval<.48});
 click('pauseButton');const records=JSON.parse(localStorage.getItem('dev-survivor.v1')).records.length;click('homeButton');
 results.push({test:'home abandons round without adding record',pass:g.status==='ready'&&JSON.parse(localStorage.getItem('dev-survivor.v1')).records.length===records});
 ctx.fillRect=fill;
 qa.lifecycle=results;
 qa.persisted=localStorage.getItem('dev-survivor.v1');
 return results;
})()
