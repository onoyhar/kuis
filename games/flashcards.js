import { showFeedback } from '../utils.js';

export function start(ctx) {
  const CARDS = [
    { front: "Apple", back: "Apel", category: "Fruits" },
    { front: "Book", back: "Buku", category: "Objects" },
    { front: "Cat", back: "Kucing", category: "Animals" },
    { front: "Dog", back: "Anjing", category: "Animals" },
    { front: "House", back: "Rumah", category: "Buildings" },
    { front: "Water", back: "Air", category: "Nature" },
    { front: "Fire", back: "Api", category: "Nature" },
    { front: "Moon", back: "Bulan", category: "Space" },
    { front: "Sun", back: "Matahari", category: "Space" },
    { front: "Tree", back: "Pohon", category: "Nature" },
    { front: "Flower", back: "Bunga", category: "Nature" },
    { front: "School", back: "Sekolah", category: "Buildings" },
    { front: "Teacher", back: "Guru", category: "People" },
    { front: "Student", back: "Siswa", category: "People" },
    { front: "Happy", back: "Senang", category: "Emotions" }
  ];
  
  const $ = s => ctx.host.querySelector(s);
  
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>📇 Flashcards</h1>
        <p>Latihan kosakata dengan kartu interaktif</p>
      </div>
    </section>
    <section class="card glass">
      <div class="game-stats">
        <div class="chips">
          <span class="chip" id="progress">Kartu: 1/${CARDS.length}</span>
          <span class="chip" id="score">Benar: 0</span>
          <span class="chip" id="category">Kategori: ${CARDS[0].category}</span>
        </div>
      </div>
      
      <div class="flashcard-container">
        <div class="flashcard-large glass" id="flashcard">
          <div id="cardContent" class="card-content">
            <div id="front" class="card-face front-face">
              <div class="card-text">${CARDS[0].front}</div>
              <div class="card-category-badge">${CARDS[0].category}</div>
            </div>
            <div id="back" class="card-face back-face" style="display: none;">
              <div class="card-text">${CARDS[0].back}</div>
              <div class="card-category-badge">${CARDS[0].category}</div>
            </div>
          </div>
          <div class="card-hint">💡 Klik untuk membalik kartu</div>
        </div>
      </div>
      
      <div class="flashcard-actions">
        <button class="btn danger-btn" id="btnWrong">❌ Belum Hafal</button>
        <button class="btn success-btn" id="btnCorrect">✅ Sudah Hafal</button>
      </div>
      
      <div class="flashcard-navigation">
        <button class="btn" id="btnPrev">← Sebelumnya</button>
        <button class="btn" id="btnShuffle">🔀 Acak</button>
        <button class="btn" id="btnNext">Selanjutnya →</button>
      </div>
    </section>`;
  
  ctx.modalHost.innerHTML = `
    <div class="modal-backdrop" id="fcModal">
      <div class="modal glass">
        <h2>🏁 Hasil Belajar Flashcards</h2>
        <div class="flashcard-results">
          <div class="result-stats">
            <div class="stat-item">
              <span class="stat-label">Total Kartu:</span>
              <span class="stat-value">${CARDS.length}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Sudah Hafal:</span>
              <span id="modalCorrect" class="stat-value">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Persentase:</span>
              <span id="modalPercent" class="stat-value">0%</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn play" id="playAgain">Main Lagi ↻</button>
        </div>
      </div>
    </div>`;
  
  const modal = document.getElementById('fcModal');
  const flashcard = $('#flashcard');
  const front = $('#front');
  const back = $('#back');
  
  let currentIndex = 0;
  let isFlipped = false;
  let correct = 0;
  let cardStatus = new Array(CARDS.length).fill(null);
  
  function showCard(index) {
    currentIndex = index;
    isFlipped = false;
    front.style.display = 'block';
    back.style.display = 'none';
    $('#front .card-text').textContent = CARDS[index].front;
    $('#back .card-text').textContent = CARDS[index].back;
    $('#front .card-category-badge').textContent = CARDS[index].category;
    $('#back .card-category-badge').textContent = CARDS[index].category;
    $('#progress').textContent = `Kartu: ${index + 1}/${CARDS.length}`;
    $('#category').textContent = `Kategori: ${CARDS[index].category}`;
    
    // Update card appearance based on status
    flashcard.classList.remove('correct', 'wrong');
    if (cardStatus[index] === true) {
      flashcard.classList.add('correct');
    } else if (cardStatus[index] === false) {
      flashcard.classList.add('wrong');
    }
  }
  
  function flip() {
    isFlipped = !isFlipped;
    if (isFlipped) {
      front.style.display = 'none';
      back.style.display = 'block';
    } else {
      front.style.display = 'block';
      back.style.display = 'none';
    }
    showFeedback(flashcard, true);
  }
  
  function markCard(isCorrect) {
    if (cardStatus[currentIndex] === null && isCorrect) {
      correct++;
    } else if (cardStatus[currentIndex] === true && !isCorrect) {
      correct--;
    }
    
    cardStatus[currentIndex] = isCorrect;
    $('#score').textContent = `Benar: ${correct}`;
    showFeedback(flashcard, isCorrect);
    
    flashcard.classList.remove('correct', 'wrong');
    if (isCorrect) {
      flashcard.classList.add('correct');
    } else {
      flashcard.classList.add('wrong');
    }
    
    // Auto advance to next card after a delay
    setTimeout(() => {
      if (currentIndex < CARDS.length - 1) {
        showCard(currentIndex + 1);
      } else if (correct === CARDS.length) {
        finish();
      }
    }, 1000);
  }
  
  function finish() {
    const percentage = Math.round((correct / CARDS.length) * 100);
    document.getElementById('modalCorrect').textContent = correct;
    document.getElementById('modalPercent').textContent = `${percentage}%`;
    modal.classList.add('show');
  }
  
  function shuffle() {
    for (let i = CARDS.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [CARDS[i], CARDS[j]] = [CARDS[j], CARDS[i]];
    }
    cardStatus = new Array(CARDS.length).fill(null);
    correct = 0;
    $('#score').textContent = `Benar: 0`;
    showCard(0);
  }
  
  flashcard.addEventListener('click', flip);
  
  $('#btnCorrect').addEventListener('click', () => markCard(true));
  $('#btnWrong').addEventListener('click', () => markCard(false));
  
  $('#btnNext').addEventListener('click', () => {
    if (currentIndex < CARDS.length - 1) {
      showCard(currentIndex + 1);
    }
  });
  
  $('#btnPrev').addEventListener('click', () => {
    if (currentIndex > 0) {
      showCard(currentIndex - 1);
    }
  });
  
  $('#btnShuffle').addEventListener('click', shuffle);
  
  document.getElementById('playAgain').addEventListener('click', () => {
    modal.classList.remove('show');
    cardStatus = new Array(CARDS.length).fill(null);
    correct = 0;
    $('#score').textContent = `Benar: 0`;
    showCard(0);
  });
  
  showCard(0);
}
