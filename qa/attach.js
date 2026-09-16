(async()=>{
 const {Game}=await import('./engine.js');
 const original=Game.prototype.update;
 window.qa={attachedAt:new Date().toISOString(),errors:[]};
 window.addEventListener('error',e=>qa.errors.push(e.message));
 window.addEventListener('unhandledrejection',e=>qa.errors.push(String(e.reason)));
 Game.prototype.update=function(dt){qa.game=this;return original.call(this,dt)};
 return 'Read-only game observation attached; rules unchanged.';
})()
