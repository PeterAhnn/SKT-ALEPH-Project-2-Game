// Real wall-clock browser exercise, not a simulation and not student A/B evidence.
qa.soak={startedAt:new Date().toISOString(),start:performance.now(),rounds:0,upgrades:0,samples:[],done:false};
document.getElementById('homeButton').click();
const codes=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'];
let held=null,waypoint=0,lastSample=0;
const corners=[[760,130],[760,410],[200,410],[200,130]];
const key=(type,code)=>window.dispatchEvent(new KeyboardEvent(type,{code,bubbles:true}));
qa.soakTimer=setInterval(()=>{
 const g=qa.game,s=qa.soak,elapsed=performance.now()-s.start;
 if(elapsed>=600000){
  if(held)key('keyup',held);
  clearInterval(qa.soakTimer);
  s.done=true;s.elapsedMs=elapsed;s.finishedAt=new Date().toISOString();s.final=g.snapshot();s.errors=[...qa.errors];
  document.getElementById('pauseButton').click();return;
 }
 if(elapsed-lastSample>=30000){s.samples.push({elapsedMs:elapsed,...g.snapshot()});lastSample=elapsed;}
 if(g.status==='ready'){document.getElementById('startButton').click();waypoint=0;held=null;}
 else if(g.status==='won'||g.status==='lost'){s.rounds++;document.getElementById('restartButton').click();waypoint=0;held=null;}
 else if(g.status==='upgrade'){s.upgrades++;document.querySelector('[data-upgrade="power"]').click();held=null;}
 else if(g.status==='paused'){document.getElementById('resumeButton').click();held=null;}
 else if(g.status==='playing'){
  const target=corners[waypoint],dx=target[0]-g.player.x,dy=target[1]-g.player.y;
  if(Math.hypot(dx,dy)<25)waypoint=(waypoint+1)%4;
  const code=Math.abs(dx)>Math.abs(dy)?(dx>0?codes[0]:codes[2]):(dy>0?codes[1]:codes[3]);
  if(held!==code){if(held)key('keyup',held);key('keydown',code);held=code;}
 }
},100);
'Real-time 600-second browser run started.'
