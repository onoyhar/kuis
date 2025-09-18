import { showFeedback } from '../utils.js';

export function start(ctx) {
  const WORD_PAIRS = [
    { word: "besar", synonym: "raksasa", antonym: "kecil", type: "adjektif" },
    { word: "cepat", synonym: "kilat", antonym: "lambat", type: "adjektif" },
    { word: "pintar", synonym: "cerdas", antonym: "bodoh", type: "adjektiva" },
    { word: "senang", synonym: "gembira", antonym: "sedih", type: "adjektiva" },
    { word: "indah", synonym: "cantik", antonym: "jelek", type: "adjektiva" },
    { word: "tinggi", synonym: "jangkung", antonym: "rendah", type: "adjektiva" },
    { word: "terang", synonym: "cerah", antonym: "gelap", type: "adjektiva" },
    { word: "panas", synonym: "hangat", antonym: "dingin", type: "adjektiva" }
  ];

  const $ = s => ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>📚 Sinonim & Antonim</h1>
        <p>Pelajari kata-kata yang memiliki makna sama dan berlawanan!</p>
      </div>
    </section>
    <section class="card glass">
      <div class="game-stats">
        <div class="chips">
          <span class="chip" id="modeTag">Mode: Sinonim</span>
          <span class="chip" id="scoreTag">Skor: 0</span>
          <span class="chip" id="levelTag">Level: 1</span>
        </div>
      </div>
      
      <div class="word-focus">
        <h2 id="currentWord" class="focus-word">Pilih Mode</h2>
        <p id="wordType" class="word-type"></p>
      </div>
      
      <div class="game-modes">
        <button class="btn primary" id="synonymMode">Sinonim (Persamaan)</button>
        <button class="btn primary" id="antonymMode">Antonim (Lawan Kata)</button>
      </div>
      
      <div id="gameArea" class="game-area" style="display: none;">
        <div class="question-box glass">
          <h3 id="questionPrompt">Pilih sinonim yang tepat:</h3>
          <div id="optionsContainer" class="options-grid"></div>
        </div>
        
        <div class="progress-section">
          <progress id="gameProgress" value="0" max="5"></progress>
          <span id="progressText">0/5</span>
        </div>
      </div>
      
      <div class="game-controls">
        <button class="btn" id="resetGame">Mulai Ulang</button>
        <button class="btn" id="nextRound" disabled>Lanjut ➜</button>
      </div>
    </section>
  `;

  ctx.modalHost.innerHTML = `
    <div class="modal-backdrop" id="synonymModal">
      <div class="modal glass">
        <h2 id="modalTitle">🎉 Bagus!</h2>
        <div id="modalContent">
          <p id="modalMessage"></p>
          <div class="final-stats">
            <div class="stat-item">
              <span class="stat-label">Skor Akhir:</span>
              <span id="finalScore" class="stat-value">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Akurasi:</span>
              <span id="accuracy" class="stat-value">0%</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn primary" id="playAgain">Main Lagi</button>
          <button class="btn" id="changeMode">Ganti Mode</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('synonymModal');
  const openModal = () => modal.classList.add('show');
  const closeModal = () => modal.classList.remove('show');

  let currentMode = 'synonym'; // 'synonym' or 'antonym'
  let currentRound = 0;
  let score = 0;
  let correctAnswers = 0;
  let totalRounds = 5;
  let currentWordData = null;
  let usedWords = new Set();

  function startGame(mode) {
    currentMode = mode;
    currentRound = 0;
    score = 0;
    correctAnswers = 0;
    usedWords.clear();
    
    $('#modeTag').textContent = `Mode: ${mode === 'synonym' ? 'Sinonim' : 'Antonim'}`;
    $('#gameArea').style.display = 'block';
    $('.game-modes').style.display = 'none';
    
    nextRound();
  }

  function nextRound() {
    if (currentRound >= totalRounds) {
      endGame();
      return;
    }
    
    // Select random unused word
    const availableWords = WORD_PAIRS.filter(w => !usedWords.has(w.word));
    if (availableWords.length === 0) {
      usedWords.clear();
    }
    
    currentWordData = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.add(currentWordData.word);
    
    $('#currentWord').textContent = currentWordData.word;
    $('#wordType').textContent = `(${currentWordData.type})`;
    
    const correctAnswer = currentMode === 'synonym' ? currentWordData.synonym : currentWordData.antonym;
    const prompt = currentMode === 'synonym' ? 
      `Pilih SINONIM (persamaan makna) dari "${currentWordData.word}":` :
      `Pilih ANTONIM (lawan kata) dari "${currentWordData.word}":`;
    
    $('#questionPrompt').textContent = prompt;
    
    // Create options
    const wrongOptions = WORD_PAIRS
      .filter(w => w !== currentWordData)
      .map(w => currentMode === 'synonym' ? w.synonym : w.antonym)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    const container = $('#optionsContainer');
    container.innerHTML = '';
    
    allOptions.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'option-btn glass-button';
      btn.textContent = option;
      btn.onclick = () => selectAnswer(option, correctAnswer);
      container.appendChild(btn);
    });
    
    currentRound++;
    updateProgress();
    $('#nextRound').disabled = true;
  }

  function selectAnswer(selected, correct) {
    const buttons = [...$('#optionsContainer').children];
    const selectedBtn = buttons.find(b => b.textContent === selected);
    
    // Disable all buttons
    buttons.forEach(b => b.disabled = true);
    
    if (selected === correct) {
      selectedBtn.classList.add('correct');
      showFeedback(selectedBtn, true);
      score += 20;
      correctAnswers++;
    } else {
      selectedBtn.classList.add('wrong');
      showFeedback(selectedBtn, false);
      // Highlight correct answer
      const correctBtn = buttons.find(b => b.textContent === correct);
      correctBtn.classList.add('correct');
    }
    
    updateStats();
    $('#nextRound').disabled = false;
  }

  function updateProgress() {
    $('#gameProgress').value = currentRound - 1;
    $('#progressText').textContent = `${currentRound - 1}/${totalRounds}`;
  }

  function updateStats() {
    $('#scoreTag').textContent = `Skor: ${score}`;
    $('#gameProgress').value = currentRound;
    $('#progressText').textContent = `${currentRound}/${totalRounds}`;
  }

  function endGame() {
    const accuracy = Math.round((correctAnswers / totalRounds) * 100);
    
    document.getElementById('modalTitle').textContent = accuracy >= 80 ? '🎉 Hebat!' : '👍 Bagus!';
    document.getElementById('modalMessage').textContent = 
      accuracy >= 80 ? 
      'Luar biasa! Kamu sangat menguasai sinonim dan antonim!' :
      'Terus berlatih! Kamu semakin baik memahami makna kata.';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    openModal();
  }

  function resetToModeSelection() {
    $('#gameArea').style.display = 'none';
    $('.game-modes').style.display = 'flex';
    $('#currentWord').textContent = 'Pilih Mode';
    $('#wordType').textContent = '';
    currentRound = 0;
    score = 0;
    correctAnswers = 0;
    updateStats();
    closeModal();
  }

  // Event listeners
  $('#synonymMode').onclick = () => startGame('synonym');
  $('#antonymMode').onclick = () => startGame('antonym');
  $('#nextRound').onclick = nextRound;
  $('#resetGame').onclick = resetToModeSelection;
  document.getElementById('playAgain').onclick = () => {
    closeModal();
    startGame(currentMode);
  };
  document.getElementById('changeMode').onclick = resetToModeSelection;

  // Initialize
  updateStats();
}