const GAMES = [
  { id:"vocab_arab", title:"Kuis Kosakata Arab–Indonesia", cat:"Bahasa", desc:"Tebak arti kata. 2 menit, +10 poin/benar.", module:"./games/vocab_ar_id.js" },
  { id:"speed_math", title:"Math Speed", cat:"Matematika", desc:"Hitung cepat + timer.", module:"./games/speed_math.js" },
  { id:"word_scramble", title:"Susun Huruf", cat:"Bahasa", desc:"Urutkan huruf menjadi kata benar.", module:"./games/word_scramble.js" },
  { id:"guess_number", title:"Tebak Angka", cat:"Logika", desc:"Tebak angka 1–100 dengan petunjuk.", module:"./games/guess_number.js" },
  { id:"memory_match", title:"Memory Card", cat:"Logika", desc:"Cocokkan pasangan kartu.", module:"./games/memory_match.js" },
  { id:"flashcards", title:"Flashcards", cat:"Bahasa", desc:"Latihan kosakata dengan kartu", module:"./games/flashcards.js" },
  { id:"hangman", title:"Tebak Kata (Hangman)", cat:"Bahasa", desc:"Tebak kata sebelum hangman selesai", module:"./games/hangman.js" },
  { id:"synonym_quiz", title:"Sinonim/Antonim", cat:"Bahasa", desc:"Kuis sinonim dan antonim kata", module:"./games/synonym_quiz.js" },
  { id:"planet_quiz", title:"Kuis Tata Surya", cat:"Sains", desc:"Tes pengetahuan tentang planet", module:"./games/planet_quiz.js" },
  { id:"human_body", title:"Tubuh Manusia", cat:"Sains", desc:"Kuis tentang organ tubuh manusia", module:"./games/human_body.js" },
  { id:"indonesia_history", title:"Sejarah Indonesia", cat:"Sains", desc:"Kuis sejarah Indonesia", module:"./games/indonesia_history.js" },
  { id:"geo_quiz", title:"Peta & Geografi", cat:"Sains", desc:"Kuis geografi Indonesia & dunia", module:"./games/geo_quiz.js" },
  { id:"color_match", title:"Cocok Warna", cat:"Kreativitas", desc:"Cocokkan warna yang sama", module:"./games/color_match.js" },
  { id:"melody_guess", title:"Tebak Melodi", cat:"Kreativitas", desc:"Tebak nada yang dimainkan", module:"./games/melody_guess.js" },
  { id:"art_culture", title:"Seni & Budaya", cat:"Kreativitas", desc:"Kuis seni dan budaya Indonesia", module:"./games/art_culture.js" },
  { id:"drawing_game", title:"Gambar Bentuk", cat:"Kreativitas", desc:"Ikuti pola untuk menggambar", module:"./games/drawing_game.js" },
  { id:"simon_says", title:"Simon Says", cat:"Logika", desc:"Ikuti pola warna dan suara", module:"./games/simon_says.js" },
  { id:"decision_making", title:"Pilihan Sikap", cat:"Life Skills", desc:"Latihan mengambil keputusan", module:"./games/decision_making.js" },
  { id:"finance_quiz", title:"Keuangan Dasar", cat:"Life Skills", desc:"Belajar mengelola keuangan", module:"./games/finance_quiz.js" },
  { id:"healthy_habits", title:"Kebiasaan Sehat", cat:"Life Skills", desc:"Kuis tentang pola hidup sehat", module:"./games/healthy_habits.js" },
  { id:"safety_quiz", title:"Keselamatan", cat:"Life Skills", desc:"Kuis keselamatan sehari-hari", module:"./games/safety_quiz.js" },
  { id:"daily_challenge", title:"Tantangan Harian", cat:"Logika", desc:"Tantangan baru setiap hari", module:"./games/daily_challenge.js" },
  { id:"fractions", title:"Pecahan", cat:"Matematika", desc:"Belajar pecahan dengan mudah", module:"./games/fractions.js" },
  { id:"geometry", title:"Geometri Dasar", cat:"Matematika", desc:"Belajar bentuk dan ruang", module:"./games/geometry.js" },
  { id:"sudoku_easy", title:"Sudoku Mudah", cat:"Logika", desc:"Puzzle angka untuk pemula", module:"./games/sudoku_easy.js" },
  { id:"math_match", title:"Math Match", cat:"Matematika", desc:"Cocokkan hasil perhitungan", module:"./games/math_match.js" },
  { id:"units_quiz", title:"Satuan & Ukuran", cat:"Sains", desc:"Kuis konversi satuan", module:"./games/units_quiz.js" }
];

const drawer = document.getElementById('drawer');
const btnMenu = document.getElementById('btnMenu');
const btnCloseDrawer = document.getElementById('btnCloseDrawer');
const backdrop = document.getElementById('backdrop');
const gameList = document.getElementById('gameList');
const cards = document.getElementById('cards');
const view = document.getElementById('view');
const modalHost = document.getElementById('modalHost');
const loader = document.getElementById('loader');

function openDrawer(){ drawer.classList.add('open'); backdrop.classList.add('show'); }
function closeDrawer(){ drawer.classList.remove('open'); backdrop.classList.remove('show'); }

btnMenu.addEventListener('click', openDrawer);
btnCloseDrawer.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

function renderLists(){
  gameList.innerHTML = "";
  cards.innerHTML = "";
  for(const g of GAMES){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${g.id}`;
a.innerHTML = `<span>${g.title} <small style=\"color:#64748b\">• ${g.cat}</small></span><span>▶</span>`;
a.setAttribute('aria-label', `Buka ${g.title}`);
    a.addEventListener('click', (e)=>{ e.preventDefault(); launch(g.id); closeDrawer(); });
    li.appendChild(a);
    gameList.appendChild(li);

    const card = document.createElement('div');
card.className = "card interactive";
    card.innerHTML = `<h3>${g.title}</h3><div class="meta">${g.cat}</div><p class="meta">${g.desc || 'Siap dimainkan.'}</p>`;
    const btn = document.createElement('button');
btn.className = 'btn play interactive';
btn.setAttribute('aria-label', `Mainkan ${g.title}`);
    btn.textContent = 'Mainkan ▶';
    btn.addEventListener('click', ()=> launch(g.id));
    card.appendChild(btn);
    cards.appendChild(card);
  }
}

async function launch(id){
  const g = GAMES.find(x=>x.id===id);
  if(!g){ alert('Game tidak ditemukan'); return; }
  if(g.stub){ alert('Game ini masih stub. Siap kita aktifkan kalau kamu mau!'); return; }
  
  try {
    loader.classList.add('show');
    const mod = await import(g.module);
    mod.start({ host: view, modalHost });
    window.scrollTo({top:0,behavior:'smooth'});
  } catch (error) {
    alert('Gagal memuat game. Silakan coba lagi.');
    console.error('Failed to load game:', error);
  } finally {
    loader.classList.remove('show');
  }
}

// Category navigation
const categoryView = document.getElementById('categoryView');
const gameListView = document.getElementById('gameListView');
const categoryTitle = document.getElementById('categoryTitle');

function showCategories() {
  categoryView.style.display = 'block';
  gameListView.style.display = 'none';
  view.innerHTML = '';
}

function showGamesByCategory(category) {
  categoryView.style.display = 'none';
  gameListView.style.display = 'block';
  
  const filteredGames = category === 'Semua' 
    ? GAMES 
    : GAMES.filter(g => g.cat === category);
  
  categoryTitle.textContent = category === 'Semua' ? 'Semua Games' : `Kategori: ${category}`;
  
  cards.innerHTML = '';
  gameList.innerHTML = '';
  
  for(const g of filteredGames){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${g.id}`;
    a.innerHTML = `<span>${g.title} <small style="color:#64748b">• ${g.cat}</small></span><span>▶</span>`;
    a.setAttribute('aria-label', `Buka ${g.title}`);
    a.addEventListener('click', (e)=>{ e.preventDefault(); launch(g.id); closeDrawer(); });
    li.appendChild(a);
    gameList.appendChild(li);

    const card = document.createElement('div');
    card.className = "card interactive";
    card.innerHTML = `<h3>${g.title}</h3><div class="meta">${g.cat}</div><p class="meta">${g.desc || 'Siap dimainkan.'}</p>`;
    const btn = document.createElement('button');
    btn.className = 'btn play interactive';
    btn.setAttribute('aria-label', `Mainkan ${g.title}`);
    btn.textContent = 'Mainkan ▶';
    btn.addEventListener('click', ()=> launch(g.id));
    card.appendChild(btn);
    cards.appendChild(card);
  }
}

// Add event listeners to category buttons
document.querySelectorAll('.category-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const category = e.currentTarget.dataset.category;
    showGamesByCategory(category);
  });
});

// Make showCategories global
window.showCategories = showCategories;

renderLists();
