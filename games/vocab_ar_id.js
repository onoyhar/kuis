import { showFeedback } from '../utils.js';

export function start(ctx){
  const WORDS = [
    {ar:"السلام عليكم", id:"Salam sejahtera atasmu"},{ar:"مرحبا", id:"Selamat datang"},{ar:"صباح الخير", id:"Selamat pagi"},
    {ar:"مساء الخير", id:"Selamat sore/malam"},{ar:"كيف حالك؟", id:"Apa kabar?"},{ar:"أنا بخير", id:"Saya baik-baik saja"},
    {ar:"شكرا", id:"Terima kasih"},{ar:"عفوا", id:"Sama-sama/maaf"},{ar:"نعم", id:"Ya"},{ar:"لا", id:"Tidak"},
    {ar:"من", id:"Siapa"},{ar:"ماذا", id:"Apa"},{ar:"أين", id:"Di mana"},{ar:"متى", id:"Kapan"},{ar:"لماذا", id:"Kenapa/mengapa"},
    {ar:"بيت", id:"Rumah"},{ar:"مسجد", id:"Masjid"},{ar:"مدرسة", id:"Sekolah"},{ar:"مطبخ", id:"Dapur"},{ar:"غرفة", id:"Kamar"},
    {ar:"كتاب", id:"Buku"},{ar:"قلم", id:"Pena"},{ar:"ورق", id:"Kertas"},{ar:"كرسي", id:"Kursi"},{ar:"طاولة", id:"Meja"},
    {ar:"باب", id:"Pintu"},{ar:"نافذة", id:"Jendela"},{ar:"سيارة", id:"Mobil"},{ar:"دراجة", id:"Sepeda"},{ar:"قطار", id:"Kereta"},
    {ar:"طائرة", id:"Pesawat"},{ar:"ماء", id:"Air"},{ar:"خبز", id:"Roti"},{ar:"أرز", id:"Nasi"},{ar:"لحم", id:"Daging"},
    {ar:"سمك", id:"Ikan"},{ar:"دجاج", id:"Ayam"},{ar:"تفاح", id:"Apel"},{ar:"موز", id:"Pisang"},{ar:"برتقال", id:"Jeruk"},
    {ar:"أبي", id:"Ayah"},{ar:"أمي", id:"Ibu"},{ar:"أخ", id:"Saudara laki-laki"},{ar:"أخت", id:"Saudara perempuan"},
    {ar:"ولد", id:"Anak laki-laki"},{ar:"بنت", id:"Anak perempuan"},{ar:"صديق", id:"Teman"},{ar:"معلم", id:"Guru"},{ar:"طالب", id:"Murid/siswa"},
    {ar:"الله", id:"Allah (Tuhan)"}
  ];
  const $ = s=>ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero"><h1>🌙 Kuis Kosakata Arab–Indonesia</h1>
      <div class="chips"><span class="chip" id="modeTag">Mode: Arab ➜ Indonesia</span>
      <span class="chip" id="timeTag">⏱ 02:00</span><span class="chip" id="scoreTag">Skor: 0</span></div>
    </section>
    <section class="card">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <button class="btn" id="btnArId">Arab ➜ Indonesia</button>
        <button class="btn" id="btnIdAr">Indonesia ➜ Arab</button>
        <button class="btn primary" id="btnRestart">Mulai Ulang</button>
      </div>
      <div class="card" style="background:#fff">
        <div id="qText" style="font-size:28px;font-weight:900">—</div>
        <div style="color:#64748b"><span id="qCounter">0</span>/<span id="qTotal">0</span></div>
        <div id="options" class="grid" style="grid-template-columns:1fr"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <button class="btn" id="next" disabled>Berikutnya ➜</button>
          <progress id="prog" value="0" max="1"></progress>
        </div>
      </div>
    </section>`;

  ctx.modalHost.innerHTML = `<div class="modal-backdrop" id="vbModal"><div class="modal">
      <h2>🏁 Ringkasan</h2>
      <div class="grid" style="grid-template-columns:repeat(2,1fr)">
        <div class="card">Total Soal: <b id="mTotal">0</b></div>
        <div class="card">Skor: <b id="mScore">0</b></div>
        <div class="card">Benar: <b id="mCorrect">0</b></div>
        <div class="card">Salah: <b id="mWrong">0</b></div>
      </div>
      <div style="text-align:right;margin-top:8px"><button class="btn play" id="playAgain">Main Lagi ↻</button></div>
    </div></div>`;

  const modal = document.getElementById('vbModal');
  const openModal = ()=> modal.classList.add('show');
  const closeModal = ()=> modal.classList.remove('show');

  const rnd = n=>Math.floor(Math.random()*n);
  const shuffle = a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1); [a[i],a[j]]=[a[j],a[i]]}return a};
  const fmt = s=>String(s).padStart(2,'0');

  let mode = 'ar-id', pool=[], qIndex=0, correct=0, wrong=0, score=0, answered=0, selected=null, timer=null, remain=120;

  function buildOptions(item){
    const others = shuffle(WORDS.filter(w=>w!==item)).slice(0,3);
    const labels = mode==='ar-id' ? [item.id,...others.map(x=>x.id)] : [item.ar,...others.map(x=>x.ar)];
    const ans = mode==='ar-id' ? item.id : item.ar;
    return shuffle(labels).map(lbl => ({lbl, ok: lbl===ans}));
  }
  function render(){
    const q = pool[qIndex];
    const qText = $('#qText'); qText.textContent = (mode==='ar-id')? q.ar : q.id;
    $('#qCounter').textContent = qIndex+1; $('#qTotal').textContent = pool.length;
    const opts = $('#options'); opts.innerHTML='';
    buildOptions(q).forEach((op,i)=>{
      const b = document.createElement('button');
      b.className='btn'; b.textContent = op.lbl; b.dataset.ok = op.ok?'1':'0';
      b.style.textAlign='left';
      b.onclick = ()=>{ selected=i; Array.from(opts.children).forEach((n,ix)=>n.style.outline = ix===i?'3px solid #93c5fd':''); $('#next').disabled=false; };
      opts.appendChild(b);
    });
    $('#prog').max = pool.length; $('#prog').value = answered;
  }
  function next(){
    if(selected==null) return;
    const node = $('#options').children[selected];
    const questionText = $('#qText');
    const isCorrect = node.dataset.ok === '1';
    if(isCorrect){ correct++; score+=10; } else { wrong++; }
    showFeedback(questionText, isCorrect);
    showFeedback(node, isCorrect);
    answered++; selected=null;
    if(qIndex<pool.length-1){ qIndex++; render(); }
    else finish();
    $('#scoreTag').textContent = `Skor: ${score}`;
    $('#prog').value = answered;
    $('#next').disabled = true;
  }
  function finish(){
    clearInterval(timer); timer=null;
    document.getElementById('mTotal').textContent = pool.length;
    document.getElementById('mCorrect').textContent = correct;
    document.getElementById('mWrong').textContent = wrong;
    document.getElementById('mScore').textContent = score;
    openModal();
  }
  function startTimer(){
    clearInterval(timer); remain=120; $('#timeTag').textContent = `⏱ 02:00`;
    timer = setInterval(()=>{
      remain--; $('#timeTag').textContent = `⏱ ${fmt(Math.floor(remain/60))}:${fmt(remain%60)}`;
      if(remain<=0) finish();
    },1000);
  }
  function newSession(){
    closeModal();
    pool = shuffle(WORDS.slice()); qIndex=0; correct=0; wrong=0; score=0; answered=0; selected=null;
    $('#scoreTag').textContent='Skor: 0'; $('#modeTag').textContent = `Mode: ${mode==='ar-id'?'Arab ➜ Indonesia':'Indonesia ➜ Arab'}`;
    startTimer(); render();
  }

  $('#btnArId').onclick = ()=>{ mode='ar-id'; newSession(); };
  $('#btnIdAr').onclick = ()=>{ mode='id-ar'; newSession(); };
  $('#btnRestart').onclick = newSession;
  $('#next').onclick = next;
  document.getElementById('playAgain').onclick = newSession;

  newSession();
}
