(async()=>{
 const g=qa.game,results=[];
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const key=(type,code)=>window.dispatchEvent(new KeyboardEvent(type,{code,bubbles:true}));
 document.getElementById('startButton').click();
 const before=g.snapshot(),start=performance.now();
 for(let i=0;i<10;i++){key('keydown','ArrowRight');key('keyup','ArrowRight');}
 await wait(80);
 results.push({test:'10 keydowns within 1 second',elapsedMs:performance.now()-start,events:g.inputEvents-before.inputEvents,actions:g.inputActions-before.inputActions,deltaX:g.player.x-before.player.x});
 document.getElementById('pauseButton').click();
 const paused=JSON.stringify(g);
 await wait(1200);
 results.push({test:'pause freezes complete engine state',pass:paused===JSON.stringify(g)});
 document.getElementById('resumeButton').click();await wait(150);
 results.push({test:'resume advances time',pass:g.time>before.time&&g.status==='playing'});
 window.dispatchEvent(new Event('blur'));
 const blurred=JSON.stringify(g);await wait(200);
 results.push({test:'blur pauses and clears keys',pass:g.status==='paused'&&g.keys.size===0&&blurred===JSON.stringify(g)});
 document.getElementById('resumeButton').click();key('keydown','ArrowLeft');key('keyup','ArrowLeft');await wait(80);
 results.push({test:'input after focus return',pass:g.inputActions===11&&g.status==='playing'});
 document.getElementById('pauseButton').click();
 qa.resizeBaseline=JSON.stringify(g);
 qa.controls=results;
 return results;
})()
