export const WIDTH = 960, HEIGHT = 540, DURATION = 30, RULESET = 2;
// Roster informed by TIOBE September 2026; ranks are not difficulty weights.
export const ENEMIES={
 python:{label:'Python 오류',hp:2,speed:65},
 c:{label:'C 포인터 오류',hp:2,speed:70},
 cpp:{label:'C++ 메모리 누수',hp:4,speed:49},
 csharp:{label:'C# 예외 폭주',hp:3,speed:62},
 javascript:{label:'JavaScript 비동기 폭주',hp:1,speed:96},
 typescript:{label:'TypeScript 타입 오류',hp:2,speed:76},
 rust:{label:'Rust 소유권 충돌',hp:3,speed:58},
 go:{label:'Go 고루틴 폭주',hp:2,speed:88},
 php:{label:'PHP 서버 오류',hp:3,speed:55},
 r:{label:'R 분석 과부하',hp:4,speed:43},
 swift:{label:'Swift 질주',hp:1,speed:104},
 ruby:{label:'Ruby 런타임 오류',hp:2,speed:74},
 kotlin:{label:'Kotlin 코루틴 폭주',hp:2,speed:83},
 router:{label:'라우터 폭주',hp:2,speed:67},
 shield:{label:'방화벽 충돌',hp:4,speed:48},
 cpu:{label:'CPU 과부하',hp:3,speed:62},
 bot:{label:'AI 폭주',hp:2,speed:80},
 smartphone:{label:'기기 오류',hp:2,speed:88}
};
export const STAGES = [
 {title:'별 것도 아닌 일에 “어~?” 금지',tag:'UNEXPECTED ERROR',enemies:['python','c','cpp','javascript','typescript','go','php','ruby'],seed:4201,accent:'#c3f86d'},
 {title:'3인 이상 모여있기 금지',tag:'UNPLANNED MEETING',enemies:['csharp','rust','r','kotlin','swift','router','shield','cpu','bot','smartphone'],seed:4202,accent:'#84c8f3'},
 {title:'“한가롭네, 평화롭네” 금지',tag:'DEPLOYMENT FRIDAY',enemies:Object.keys(ENEMIES),seed:4203,accent:'#f5a66c'}
];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const DIRECTIONS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export class Game {
 constructor(onEnd=()=>{}){this.onEnd=onEnd;this.reset(0,'A');this.status='ready';}
 reset(stage=this.stage,difficulty=this.difficulty){
  if(!Number.isInteger(stage)||!STAGES[stage]||!['A','B'].includes(difficulty))throw new Error('잘못된 게임 설정');
  this.stage=stage;this.difficulty=difficulty;this.spawnInterval=difficulty==='A'?.8:.6;this.status='playing';this.time=0;this.hp=100;this.score=0;this.level=1;this.xp=0;this.nextXp=5;this.kills=0;this.power=1;this.fireInterval=.48;this.shotClock=.15;this.spawnClock=.15;this.invincible=0;this.player={x:WIDTH/2,y:HEIGHT/2};this.enemies=[];this.bullets=[];this.gems=[];this.keys=new Set();this.queue=[];this.inputEvents=0;this.inputActions=0;this.lastHit='';this.rng=STAGES[stage].seed;this.id=0;this.upgrades=[];
 }
 random(){this.rng=(Math.imul(this.rng,1664525)+1013904223)>>>0;return this.rng/4294967296;}
 input(direction,held=true){if(this.status!=='playing'||!DIRECTIONS[direction])return false;this.inputEvents++;this.queue.push(direction);if(held)this.keys.add(direction);return true;}
 release(direction){this.keys.delete(direction);}
 clearInput(){this.keys.clear();this.queue.length=0;}
 pause(){if(['playing','upgrade'].includes(this.status)){this.resumeStatus=this.status;this.status='paused';this.clearInput();return true;}return false;}
 resume(){if(this.status==='paused'){this.status=this.resumeStatus==='upgrade'?'upgrade':'playing';this.resumeStatus=null;this.clearInput();return true;}return false;}
 home(){this.reset(0,this.difficulty);this.status='ready';this.resumeStatus=null;}
 upgrade(kind){if(this.status!=='upgrade'||!['power','rate','heal'].includes(kind))return false;if(kind==='power')this.power++;if(kind==='rate')this.fireInterval=Math.max(.13,this.fireInterval*.85);if(kind==='heal')this.hp=Math.min(100,this.hp+25);this.upgrades.push(kind);this.clearInput();this.status='playing';return true;}
 move(dx,dy){this.player.x=clamp(this.player.x+dx,22,WIDTH-22);this.player.y=clamp(this.player.y+dy,32,HEIGHT-22);}
 spawn(){
  const definition=STAGES[this.stage],wave=this.stage===1?3:(this.stage===2&&this.time>15?2:1);
  for(let i=0;i<wave;i++){
   const edge=Math.floor(this.random()*4),t=this.random(),type=definition.enemies[Math.floor(this.random()*definition.enemies.length)];
   const x=edge===0?-22:edge===1?WIDTH+22:t*WIDTH,y=edge===2?-22:edge===3?HEIGHT+22:t*HEIGHT;
   const spec=ENEMIES[type];this.enemies.push({id:++this.id,type,x,y,hp:spec.hp,speed:spec.speed*(1+this.time*.008),radius:17});
  }
 }
 finish(result){if(this.status!=='playing')return;this.status=result;this.clearInput();const record={ruleset:RULESET,stage:this.stage,difficulty:this.difficulty,spawnInterval:this.spawnInterval,score:this.score,time:Math.round(this.time*100)/100,result,cause:result==='won'?'':this.lastHit||'적과 충돌',kills:this.kills,level:this.level,upgrades:[...this.upgrades],inputEvents:this.inputEvents,inputActions:this.inputActions};this.onEnd(record);}
 update(dt){
  if(this.status!=='playing'||!Number.isFinite(dt)||dt<0)return;dt=Math.min(dt,.05);
  // Each keydown is consumed once; held movement is independently time-based.
  for(const direction of this.queue){const [dx,dy]=DIRECTIONS[direction];this.move(dx*3,dy*3);this.inputActions++;}this.queue.length=0;
  let dx=0,dy=0;for(const direction of this.keys){const d=DIRECTIONS[direction];dx+=d[0];dy+=d[1];}const length=Math.hypot(dx,dy);if(length)this.move(dx/length*185*dt,dy/length*185*dt);
  this.time=Math.min(DURATION,this.time+dt);this.invincible=Math.max(0,this.invincible-dt);
  this.spawnClock-=dt;if(this.spawnClock<=0){this.spawn();this.spawnClock+=this.spawnInterval;}
  this.shotClock-=dt;if(this.shotClock<=0){if(this.enemies.length){let target=null,nearest=Infinity;for(const e of this.enemies){const d=Math.hypot(e.x-this.player.x,e.y-this.player.y);if(d<nearest){target=e;nearest=d;}}const angle=Math.atan2(target.y-this.player.y,target.x-this.player.x);this.bullets.push({x:this.player.x,y:this.player.y,vx:Math.cos(angle)*470,vy:Math.sin(angle)*470,life:2.5,damage:this.power});}this.shotClock+=this.fireInterval;}
  for(const b of this.bullets){b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;for(const e of this.enemies){if(b.life>0&&e.hp>0&&Math.hypot(b.x-e.x,b.y-e.y)<e.radius+5){e.hp-=b.damage;b.life=0;if(e.hp<=0){this.score+=10;this.kills++;this.gems.push({x:e.x,y:e.y});}break;}}}this.bullets=this.bullets.filter(b=>b.life>0&&b.x>-30&&b.x<WIDTH+30&&b.y>-30&&b.y<HEIGHT+30);this.enemies=this.enemies.filter(e=>e.hp>0);
  for(const e of this.enemies){const ax=this.player.x-e.x,ay=this.player.y-e.y,dist=Math.hypot(ax,ay)||1;e.x+=ax/dist*e.speed*dt;e.y+=ay/dist*e.speed*dt;if(dist<e.radius+13&&this.invincible===0){this.hp=Math.max(0,this.hp-20);this.lastHit=ENEMIES[e.type].label;this.invincible=.9;e.x-=ax/dist*24;e.y-=ay/dist*24;}}
  const remaining=[];for(const gem of this.gems){const gx=this.player.x-gem.x,gy=this.player.y-gem.y,d=Math.hypot(gx,gy);if(d<25){this.xp++;this.score+=2;}else{if(d<105){gem.x+=gx/d*250*dt;gem.y+=gy/d*250*dt;}remaining.push(gem);}}this.gems=remaining;
  if(this.hp<=0){this.finish('lost');return;}if(this.time>=DURATION){this.score+=100;this.finish('won');return;}
  if(this.xp>=this.nextXp){this.xp-=this.nextXp;this.nextXp+=3;this.level++;this.status='upgrade';this.clearInput();}
 }
 snapshot(){return {status:this.status,stage:this.stage,difficulty:this.difficulty,time:this.time,hp:this.hp,score:this.score,level:this.level,player:{...this.player},enemies:this.enemies.length,inputEvents:this.inputEvents,inputActions:this.inputActions};}
}
export function defaultSave(reduced=false){return {version:2,best:[0,0,0],reduced:!!reduced,difficulty:'A',records:[],decision:null,unlocked:1};}
export function parseSave(raw,reduced=false){
 const fallback=defaultSave(reduced);if(raw===null||raw===undefined||raw==='')return {data:fallback,recovered:false};
 try{
  const s=JSON.parse(raw),integer=(v)=>Number.isSafeInteger(v)&&v>=0&&v<=10000000;
  if(!s||![1,2].includes(s.version)||!Array.isArray(s.best)||s.best.length!==3||!s.best.every(integer)||typeof s.reduced!=='boolean'||!['A','B'].includes(s.difficulty)||!Array.isArray(s.records)||s.records.length>200)throw Error();
  for(const r of s.records){if(!r||!Number.isInteger(r.stage)||!STAGES[r.stage]||!['A','B'].includes(r.difficulty)||r.spawnInterval!==(r.difficulty==='A'?.8:.6)||!integer(r.score)||!Number.isFinite(r.time)||r.time<0||r.time>30||!['won','lost'].includes(r.result)||typeof r.cause!=='string'||r.cause.length>100||!integer(r.kills)||!integer(r.level)||!Array.isArray(r.upgrades)||r.upgrades.length>50||!r.upgrades.every(x=>['power','rate','heal'].includes(x))||!integer(r.inputEvents)||!integer(r.inputActions))throw Error();}
  if(s.decision!==null&&(!s.decision||!['A','B'].includes(s.decision.difficulty)||!Number.isInteger(s.decision.stage)||!STAGES[s.decision.stage]||typeof s.decision.reason!=='string'||s.decision.reason.length>1000))throw Error();
  if(s.version===1){s.version=2;s.unlocked=1;for(const r of s.records){r.ruleset=1;if(r.result==='won')s.unlocked=Math.max(s.unlocked,Math.min(3,r.stage+2));}s.decision=null;}
  if(!Number.isInteger(s.unlocked)||s.unlocked<1||s.unlocked>3)throw Error();
  if(s.records.some(r=>![1,RULESET].includes(r.ruleset)))throw Error();
  return {data:s,recovered:false};
 }catch{return {data:fallback,recovered:true};}
}
