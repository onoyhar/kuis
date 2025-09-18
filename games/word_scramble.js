export function start(ctx){
  const WORDS=["sekolah","bahasa","matematika","kreatif","komputer","gadget","kucing","jerapah","apel","pisang","jeruk"];
  const $ = s=>ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero"><h1>🔤 Susun Huruf</h1>
      <div class="chips"><span class="chip" id="score">Skor: 0</span></div>
    </section>
    <section class="card">
      <div class="card" style="background:#fff">
        <div id="scr" style="font-size:28px;font-weight:900;letter-spacing:2px">---</div>
        <input id="ans" class="btn" placeholder="Ketik kata…" style="width:100%;margin:8px 0"/>
        <div style="display:flex;gap:8px;justify-content:space-between">
          <button id="check" class="btn play">Cek ✔</button>
          <button id="skip" class="btn">Lewati ↷</button>
        </div>
      </div>
    </section>`;
  const shuffle = a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  let score=0, curr="";
  function newWord(){ curr = WORDS[Math.floor(Math.random()*WORDS.length)]; const s = shuffle(curr.split("")).join(" "); $('#scr').textContent=s; $('#ans').value=""; $('#ans').focus(); }
  function check(){ if($('#ans').value.trim().toLowerCase()===curr){ score+=10; } $('#score').textContent=`Skor: ${score}`; newWord(); }
  $('#check').onclick=check; $('#skip').onclick=newWord; newWord();
}
