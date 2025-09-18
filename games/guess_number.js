export function start(ctx){
  const $ = s=>ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero"><h1>🎯 Tebak Angka</h1>
      <p class="chips"><span class="chip">1–100</span></p>
    </section>
    <section class="card">
      <div class="card" style="background:#fff">
        <div id="hint" style="font-size:18px;color:#64748b">Aku memilih satu angka. Coba tebak!</div>
        <input id="g" class="btn" inputmode="numeric" placeholder="Masukkan tebakan…" style="width:100%;margin:8px 0"/>
        <div style="display:flex;gap:8px">
          <button id="go" class="btn play">Tebak ✔</button>
          <button id="reset" class="btn">Ulang ↻</button>
        </div>
      </div>
    </section>`;
  let target = Math.floor(Math.random()*100)+1, tries=0;
  function guess(){
    const v = parseInt($('#g').value,10); if(!v && v!==0) return;
    tries++;
    if(v===target){ $('#hint').textContent = `Benar! Angkanya ${target}. Percobaan: ${tries}`; }
    else if(v<target){ $('#hint').textContent = "Terlalu kecil!"; }
    else { $('#hint').textContent = "Terlalu besar!"; }
    $('#g').focus();
  }
  function reset(){ target = Math.floor(Math.random()*100)+1; tries=0; $('#hint').textContent="Aku memilih satu angka. Coba tebak!"; $('#g').value=""; }
  $('#go').onclick=guess; $('#reset').onclick=reset;
}
