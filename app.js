const SPLASH_DURATION = 3000;
const splash = document.getElementById('splash-screen');
const splashBar = document.getElementById('splash-bar');
const gameContainer = document.getElementById('game-container');
const gameIframe = document.getElementById('game-iframe');
const launcher = document.getElementById('launcher');
const exitBtn = document.getElementById('exit-btn');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

(function drawExitButton() {
  const canvas = document.getElementById('exit-canvas');
  const ctx = canvas.getContext('2d');
  const px = [
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,3,3,2,2,2,2,2,2,3,3,2,2,1],
    [1,2,2,3,4,3,2,2,2,2,3,4,3,2,2,1],[1,2,2,2,3,4,3,2,2,3,4,3,2,2,2,1],
    [1,2,2,2,2,3,4,3,3,4,3,2,2,2,2,1],[1,2,2,2,2,2,3,4,4,3,2,2,2,2,2,1],
    [1,2,2,2,2,2,3,4,4,3,2,2,2,2,2,1],[1,2,2,2,2,3,4,3,3,4,3,2,2,2,2,1],
    [1,2,2,2,3,4,3,2,2,3,4,3,2,2,2,1],[1,2,2,3,4,3,2,2,2,2,3,4,3,2,2,1],
    [1,2,2,3,3,2,2,2,2,2,2,3,3,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0]
  ];
  const colors = {1:'#111111',2:'#2a0a0a',3:'#8b0000',4:'#ff4444'};
  px.forEach((row,y) => row.forEach((v,x) => { if (colors[v]) { ctx.fillStyle=colors[v]; ctx.fillRect(x,y,1,1); } }));
})();

function showSplash(callback) {
  splash.classList.add('active');
  requestAnimationFrame(() => { splashBar.style.transition = 'width ' + SPLASH_DURATION + 'ms linear'; splashBar.style.width = '100%'; });
  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    splash.classList.remove('active');
    splashBar.style.transition = '';
    splashBar.style.width = '0%';
    callback();
  }
  const timer = setTimeout(dismiss, SPLASH_DURATION);
  splash.addEventListener('click', () => { clearTimeout(timer); dismiss(); }, { once:true });
}
function launchGame() {
  showSplash(() => {
    launcher.style.display = 'none';
    gameIframe.src = 'ut/game.html?t=' + Date.now();
    gameContainer.classList.add('active');
  });
}
function exitToLauncher() {
  gameContainer.classList.remove('active');
  gameIframe.src = 'about:blank';
  launcher.style.display = '';
}
exitBtn.addEventListener('click', exitToLauncher);
document.getElementById('utweb').addEventListener('click', launchGame);
