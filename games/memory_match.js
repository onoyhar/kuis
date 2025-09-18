import { showFeedback } from '../utils.js';

export function start(ctx){
  const EMO=["🐶","🐱","🦊","🐼","🐸","🦁","🐵","🐰"].slice(0,4);
  const icons = [...EMO, ...EMO];
  const shuffle = a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const $ = s=>ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero"><h1>🃏 Memory Card</h1><div class="chips"><span class="chip" id="score">Skor: 0</span></div></section>
    <section class="card">
      <div class="grid" id="board" style="grid-template-columns:repeat(4,1fr)"></div>
    </section>`;
  let opened=[], score=0;
  function build(){
    const board = $('#board'); board.innerHTML="";
    shuffle(icons.slice()).forEach((em,idx)=>{
      const cell = document.createElement('button');
      cell.className='btn'; cell.style.height='72px'; cell.dataset.icon=em; cell.dataset.open='0';
      cell.textContent="❓";
      cell.onclick=()=>flip(cell);
      board.appendChild(cell);
    });
  }
  function flip(cell){
    if(cell.dataset.open==='1' || opened.length===2) return;
    cell.dataset.open='1'; cell.textContent = cell.dataset.icon;
    opened.push(cell);
    if(opened.length===2){
      setTimeout(()=>{
        const [a,b]=opened;
        const isMatch = a.dataset.icon===b.dataset.icon;
        if(isMatch){
          showFeedback(a, true);
          showFeedback(b, true);
          a.disabled=b.disabled=true;
          score+=10;
          document.getElementById('score').textContent=`Skor: ${score}`;
        }else{
          showFeedback(a, false);
          showFeedback(b, false);
          setTimeout(() => {
            a.dataset.open=b.dataset.open='0';
            a.textContent=b.textContent="❓";
          }, 300);
        }
        opened=[];
      },550);
    }
  }
  build();
}
