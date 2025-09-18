import { showFeedback } from '../utils.js';

export function start(ctx){
  const $ = s=>ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero"><h1>🧮 Math Speed</h1>
      <div class="chips"><span class="chip" id="time">⏱ 01:00</span><span class="chip" id="score">Skor: 0</span></div>
    </section>
    <section class="card">
      <div class="card" style="background:#fff">
        <div id="q" style="font-size:28px;font-weight:900">0 + 0 = ?</div>
        <input id="ans" inputmode="numeric" pattern="[0-9\-]*" class="btn" placeholder="Jawaban…" style="width:100%;margin:8px 0"/>
        <div style="display:flex;gap:8px;justify-content:space-between">
          <button id="submit" class="btn play">Jawab ✔</button>
          <button id="skip" class="btn">Lewati ↷</button>
        </div>
      </div>
    </section>`;

  ctx.modalHost.innerHTML = `<div class="modal-backdrop" id="mModal"><div class="modal">
    <h2>🏁 Hasil Math Speed</h2>
    <div class="grid" style="grid-template-columns:repeat(2,1fr)">
      <div class="card">Benar: <b id="ok">0</b></div>
      <div class="card">Salah: <b id="bad">0</b></div>
    </div>
    <div style="text-align:right;margin-top:8px"><button id="again" class="btn play">Main Lagi ↻</button></div>
  </div></div>`;
  const modal = document.getElementById('mModal');
  const openModal = ()=> modal.classList.add('show'); const closeModal = ()=> modal.classList.remove('show');

  const rnd = (a,b)=> Math.floor(Math.random()*(b-a+1))+a;
  let score=0, ok=0, bad=0, t=60, timer=null, a=0,b=0,op='+';

  function newQ(){
    const ops=['+','-','×','÷']; op = ops[rnd(0,3)];
    a=rnd(1,20); b=rnd(1,20);
    if(op==='-'){ if(b>a) [a,b]=[b,a]; }
    if(op==='÷'){ a = a*b; }
    $('#q').textContent = `${a} ${op} ${b} = ?`;
    $('#ans').value=''; $('#ans').focus();
  }
  function val(){
    const v = parseInt($('#ans').value,10);
    let correct = 0;
    switch(op){
      case '+': correct=a+b; break;
      case '-': correct=a-b; break;
      case '×': correct=a*b; break;
      case '÷': correct=a/b; break;
    }
    const isCorrect = v === correct;
    if(isCorrect){ ok++; score+=10; } else { bad++; }
    $('#score').textContent = `Skor: ${score}`;
    showFeedback($('#q'), isCorrect);
    showFeedback($('#ans'), isCorrect);
    setTimeout(newQ, 300); // Short delay to show feedback
  }
  function tick(){
    t--; $('#time').textContent = `⏱ 00:${String(t).padStart(2,'0')}`;
    if(t<=0){
      clearInterval(timer);
      document.getElementById('ok').textContent=ok;
      document.getElementById('bad').textContent=bad;
      openModal();
    }
  }
  function start(){ closeModal(); score=0; ok=0; bad=0; t=60; $('#score').textContent='Skor: 0'; $('#time').textContent='⏱ 01:00'; newQ(); clearInterval(timer); timer=setInterval(tick,1000); }
  $('#submit').onclick = val; $('#skip').onclick = newQ; document.getElementById('again').onclick = start;
  start();
}
