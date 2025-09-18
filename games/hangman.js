import { showFeedback } from '../utils.js';

export function start(ctx) {
  const WORDS = [
    { word: "SEKOLAH", hint: "Tempat belajar" },
    { word: "KELUARGA", hint: "Orang-orang terdekat di rumah" },
    { word: "PERSAHABATAN", hint: "Ikatan antar teman" },
    { word: "PENDIDIKAN", hint: "Proses belajar mengajar" },
    { word: "KESEHATAN", hint: "Kondisi tubuh yang baik" },
    { word: "LINGKUNGAN", hint: "Alam sekitar kita" },
    { word: "TEKNOLOGI", hint: "Kemajuan ilmu pengetahuan" },
    { word: "KEBUDAYAAN", hint: "Warisan nenek moyang" },
    { word: "TOLERANSI", hint: "Sikap saling menghargai" },
    { word: "KREATIVITAS", hint: "Kemampuan berkarya" },
    { word: "TANGGUNG", hint: "Sikap yang dapat diandalkan" },
    { word: "KERJASAMA", hint: "Bekerja bersama-sama" }
  ];

  const $ = s => ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🎯 Tebak Kata (Hangman)</h1>
        <p>Tebak kata sebelum hangman selesai!</p>
      </div>
    </section>
    <section class="card glass">
      <div class="game-stats">
        <div class="chips">
          <span class="chip" id="levelTag">Level: 1</span>
          <span class="chip" id="scoreTag">Skor: 0</span>
          <span class="chip" id="livesTag">Nyawa: 6</span>
        </div>
      </div>
      
      <div class="hangman-container">
        <div id="hangmanArt" class="hangman-art">
          <div class="gallows">
            <div class="pole"></div>
            <div class="top-bar"></div>
            <div class="noose" id="noose"></div>
          </div>
          <div id="hangmanParts" class="hangman-parts"></div>
        </div>
        
        <div class="word-container">
          <div id="hintText" class="hint-text glass">Petunjuk akan muncul di sini</div>
          <div id="wordDisplay" class="word-display"></div>
        </div>
      </div>
      
      <div class="alphabet-container">
        <div id="alphabet" class="alphabet-grid"></div>
      </div>
      
      <div class="game-controls">
        <button class="btn primary" id="btnNewGame">Game Baru</button>
        <button class="btn" id="btnHint">Tampilkan Petunjuk</button>
      </div>
    </section>
  `;

  ctx.modalHost.innerHTML = `
    <div class="modal-backdrop" id="hangmanModal">
      <div class="modal glass">
        <h2 id="modalTitle">🎉 Selamat!</h2>
        <div id="modalContent">
          <p id="modalMessage"></p>
          <div class="game-result">
            <div class="result-stats">
              <div class="stat-item">
                <span class="stat-label">Kata:</span>
                <span id="finalWord" class="stat-value"></span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Skor:</span>
                <span id="finalScore" class="stat-value"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn primary" id="playAgain">Main Lagi</button>
          <button class="btn" id="closeModal">Tutup</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('hangmanModal');
  const openModal = () => modal.classList.add('show');
  const closeModal = () => modal.classList.remove('show');

  let currentWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  let maxWrongGuesses = 6;
  let score = 0;
  let level = 1;
  let currentHint = '';
  let hintShown = false;

  const hangmanParts = [
    '<div class="head"></div>',
    '<div class="body"></div>',
    '<div class="left-arm"></div>',
    '<div class="right-arm"></div>',
    '<div class="left-leg"></div>',
    '<div class="right-leg"></div>'
  ];

  function createAlphabet() {
    const alphabet = $('#alphabet');
    alphabet.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const btn = document.createElement('button');
      btn.className = 'letter-btn glass-button';
      btn.textContent = letter;
      btn.onclick = () => guessLetter(letter);
      alphabet.appendChild(btn);
    }
  }

  function selectRandomWord() {
    const wordData = WORDS[Math.floor(Math.random() * WORDS.length)];
    currentWord = wordData.word.toUpperCase();
    currentHint = wordData.hint;
    $('#hintText').textContent = 'Klik "Tampilkan Petunjuk" untuk bantuan';
    hintShown = false;
  }

  function displayWord() {
    const display = $('#wordDisplay');
    display.innerHTML = '';
    
    for (let letter of currentWord) {
      const span = document.createElement('span');
      span.className = 'letter-slot glass';
      span.textContent = guessedLetters.includes(letter) ? letter : '_';
      display.appendChild(span);
    }
  }

  function guessLetter(letter) {
    if (guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);
    const btn = [...$('#alphabet').children].find(b => b.textContent === letter);
    btn.disabled = true;
    btn.classList.add('guessed');

    if (currentWord.includes(letter)) {
      btn.classList.add('correct');
      showFeedback(btn, true);
      score += 10;
      checkWin();
    } else {
      btn.classList.add('wrong');
      showFeedback(btn, false);
      wrongGuesses++;
      drawHangman();
      if (wrongGuesses >= maxWrongGuesses) {
        gameOver(false);
      }
    }

    displayWord();
    updateStats();
  }

  function drawHangman() {
    const parts = $('#hangmanParts');
    if (wrongGuesses <= hangmanParts.length) {
      parts.innerHTML += hangmanParts[wrongGuesses - 1];
    }
  }

  function checkWin() {
    const isComplete = [...currentWord].every(letter => guessedLetters.includes(letter));
    if (isComplete) {
      score += (maxWrongGuesses - wrongGuesses) * 20; // Bonus untuk sisa nyawa
      gameOver(true);
    }
  }

  function gameOver(won) {
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const finalWord = document.getElementById('finalWord');
    const finalScore = document.getElementById('finalScore');

    if (won) {
      modalTitle.textContent = '🎉 Hebat!';
      modalMessage.textContent = 'Selamat! Kamu berhasil menebak kata dengan benar!';
      level++;
    } else {
      modalTitle.textContent = '💔 Game Over';
      modalMessage.textContent = 'Jangan menyerah! Coba lagi untuk meningkatkan kemampuanmu.';
    }

    finalWord.textContent = `"${currentWord}" - ${currentHint}`;
    finalScore.textContent = score;
    openModal();
  }

  function updateStats() {
    $('#levelTag').textContent = `Level: ${level}`;
    $('#scoreTag').textContent = `Skor: ${score}`;
    $('#livesTag').textContent = `Nyawa: ${maxWrongGuesses - wrongGuesses}`;
  }

  function newGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    $('#hangmanParts').innerHTML = '';
    selectRandomWord();
    displayWord();
    createAlphabet();
    updateStats();
    closeModal();
  }

  function showHint() {
    if (!hintShown) {
      $('#hintText').textContent = `💡 ${currentHint}`;
      hintShown = true;
      score = Math.max(0, score - 20); // Penalti untuk menggunakan hint
      updateStats();
    }
  }

  // Event listeners
  $('#btnNewGame').onclick = newGame;
  $('#btnHint').onclick = showHint;
  document.getElementById('playAgain').onclick = newGame;
  document.getElementById('closeModal').onclick = closeModal;

  // Initialize game
  newGame();
}