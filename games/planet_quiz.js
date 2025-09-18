import { showFeedback } from '../utils.js';

export function start(ctx) {
  const PLANETS = [
    {
      name: "Merkurius",
      facts: ["Planet terdekat dari Matahari", "Tidak memiliki atmosfer", "Suhu sangat ekstrem"],
      questions: [
        { q: "Planet mana yang terdekat dari Matahari?", a: "Merkurius", opts: ["Venus", "Mars", "Merkurius", "Jupiter"] },
        { q: "Apakah Merkurius memiliki atmosfer?", a: "Tidak", opts: ["Ya", "Tidak", "Sedikit", "Tidak diketahui"] }
      ]
    },
    {
      name: "Venus",
      facts: ["Planet terpanas di tata surya", "Atmosfer beracun", "Bintang pagi dan sore"],
      questions: [
        { q: "Planet mana yang paling panas?", a: "Venus", opts: ["Merkurius", "Venus", "Mars", "Jupiter"] },
        { q: "Venus sering disebut apa?", a: "Bintang pagi", opts: ["Planet merah", "Bintang pagi", "Planet cincin", "Planet biru"] }
      ]
    },
    {
      name: "Bumi",
      facts: ["Satu-satunya planet berpenghuni", "70% permukaannya air", "Memiliki satu satelit"],
      questions: [
        { q: "Berapa persen permukaan Bumi yang berupa air?", a: "70%", opts: ["50%", "60%", "70%", "80%"] },
        { q: "Satelit alami Bumi adalah?", a: "Bulan", opts: ["Bulan", "Mars", "Venus", "Asteroid"] }
      ]
    },
    {
      name: "Mars",
      facts: ["Planet merah", "Memiliki kutub es", "Hari hampir sama dengan Bumi"],
      questions: [
        { q: "Mars dijuluki sebagai?", a: "Planet merah", opts: ["Planet biru", "Planet merah", "Planet hijau", "Planet putih"] },
        { q: "Apa yang menyebabkan Mars berwarna merah?", a: "Oksida besi", opts: ["Air", "Oksida besi", "Gas", "Debu"] }
      ]
    },
    {
      name: "Jupiter",
      facts: ["Planet terbesar", "Terbuat dari gas", "Memiliki banyak bulan"],
      questions: [
        { q: "Planet mana yang terbesar?", a: "Jupiter", opts: ["Saturn", "Jupiter", "Uranus", "Neptunus"] },
        { q: "Jupiter terbuat dari?", a: "Gas", opts: ["Batu", "Air", "Gas", "Es"] }
      ]
    },
    {
      name: "Saturnus",
      facts: ["Memiliki cincin indah", "Densitas rendah", "Bisa mengapung di air"],
      questions: [
        { q: "Planet mana yang terkenal dengan cincinnya?", a: "Saturnus", opts: ["Jupiter", "Saturnus", "Uranus", "Neptunus"] },
        { q: "Saturnus bisa mengapung di air karena?", a: "Densitas rendah", opts: ["Ringan", "Densitas rendah", "Berongga", "Terbuat dari es"] }
      ]
    }
  ];

  const $ = s => ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🪐 Kuis Tata Surya</h1>
        <p>Jelajahi keajaiban planet-planet di tata surya kita!</p>
      </div>
    </section>
    <section class="card glass">
      <div class="game-stats">
        <div class="chips">
          <span class="chip" id="planetTag">Planet: -</span>
          <span class="chip" id="scoreTag">Skor: 0</span>
          <span class="chip" id="progressTag">Progres: 0/0</span>
        </div>
      </div>
      
      <div id="planetExplorer" class="planet-explorer">
        <div class="planet-display">
          <div id="planetIcon" class="planet-icon">🪐</div>
          <h2 id="planetName" class="planet-name">Pilih Planet</h2>
        </div>
        
        <div id="planetFacts" class="planet-facts glass">
          <h3>Fakta Menarik:</h3>
          <ul id="factsList"></ul>
        </div>
      </div>
      
      <div id="planetSelector" class="planet-selector">
        <h3>Pilih Planet untuk Dipelajari:</h3>
        <div class="planet-grid" id="planetGrid"></div>
      </div>
      
      <div id="quizSection" class="quiz-section" style="display: none;">
        <div class="question-container glass">
          <h3 id="questionText" class="question-text">Pertanyaan akan muncul di sini</h3>
          <div id="questionOptions" class="question-options"></div>
          <div class="question-controls">
            <button class="btn" id="btnBack">← Kembali ke Planet</button>
            <button class="btn primary" id="btnNext" disabled>Pertanyaan Berikutnya</button>
          </div>
        </div>
      </div>
      
      <div class="game-controls">
        <button class="btn primary" id="btnStartQuiz" disabled>Mulai Kuis 🚀</button>
        <button class="btn" id="btnRandomFact">Fakta Acak ✨</button>
      </div>
    </section>
  `;

  ctx.modalHost.innerHTML = `
    <div class="modal-backdrop" id="planetModal">
      <div class="modal glass">
        <h2 id="modalTitle">🎉 Selamat!</h2>
        <div id="modalContent">
          <p id="modalMessage"></p>
          <div class="quiz-results">
            <div class="result-stats">
              <div class="stat-item">
                <span class="stat-label">Planet Dipelajari:</span>
                <span id="planetsLearned" class="stat-value">0</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Jawaban Benar:</span>
                <span id="correctAnswers" class="stat-value">0</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Skor:</span>
                <span id="totalScore" class="stat-value">0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn primary" id="continueExploring">Lanjut Eksplorasi</button>
          <button class="btn" id="resetExploration">Mulai Ulang</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('planetModal');
  const openModal = () => modal.classList.add('show');
  const closeModal = () => modal.classList.remove('show');

  let currentPlanet = null;
  let currentQuestionIndex = 0;
  let score = 0;
  let correctCount = 0;
  let learnedPlanets = new Set();
  let selectedAnswer = null;

  const planetIcons = {
    "Merkurius": "☿️",
    "Venus": "♀️", 
    "Bumi": "🌍",
    "Mars": "♂️",
    "Jupiter": "🪐",
    "Saturnus": "🪐"
  };

  function createPlanetSelector() {
    const grid = $('#planetGrid');
    grid.innerHTML = '';
    
    PLANETS.forEach(planet => {
      const planetCard = document.createElement('div');
      planetCard.className = `planet-card glass-button ${learnedPlanets.has(planet.name) ? 'learned' : ''}`;
      planetCard.innerHTML = `
        <div class="planet-icon-small">${planetIcons[planet.name] || '🪐'}</div>
        <div class="planet-name-small">${planet.name}</div>
        ${learnedPlanets.has(planet.name) ? '<div class="learned-badge">✓</div>' : ''}
      `;
      planetCard.onclick = () => selectPlanet(planet);
      grid.appendChild(planetCard);
    });
  }

  function selectPlanet(planet) {
    currentPlanet = planet;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    
    $('#planetIcon').textContent = planetIcons[planet.name] || '🪐';
    $('#planetName').textContent = planet.name;
    $('#planetTag').textContent = `Planet: ${planet.name}`;
    
    // Display facts
    const factsList = $('#factsList');
    factsList.innerHTML = '';
    planet.facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      factsList.appendChild(li);
    });
    
    $('#btnStartQuiz').disabled = false;
    $('#planetSelector').style.display = 'none';
    $('#planetExplorer').style.display = 'block';
  }

  function startQuiz() {
    if (!currentPlanet) return;
    
    $('#planetExplorer').style.display = 'none';
    $('#quizSection').style.display = 'block';
    displayQuestion();
  }

  function displayQuestion() {
    if (currentQuestionIndex >= currentPlanet.questions.length) {
      completeQuiz();
      return;
    }

    const question = currentPlanet.questions[currentQuestionIndex];
    $('#questionText').textContent = question.q;
    $('#progressTag').textContent = `Progres: ${currentQuestionIndex + 1}/${currentPlanet.questions.length}`;
    
    const options = $('#questionOptions');
    options.innerHTML = '';
    selectedAnswer = null;
    $('#btnNext').disabled = true;
    
    question.opts.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn glass-button';
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(opt, index, question.a);
      options.appendChild(btn);
    });
  }

  function selectAnswer(answer, index, correctAnswer) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = answer;
    const buttons = $('#questionOptions').children;
    const selectedBtn = buttons[index];
    
    if (answer === correctAnswer) {
      selectedBtn.classList.add('correct');
      showFeedback(selectedBtn, true);
      score += 20;
      correctCount++;
    } else {
      selectedBtn.classList.add('wrong');
      showFeedback(selectedBtn, false);
      // Highlight correct answer
      [...buttons].forEach(btn => {
        if (btn.textContent === correctAnswer) {
          btn.classList.add('correct');
        }
      });
    }
    
    // Disable all buttons
    [...buttons].forEach(btn => btn.disabled = true);
    $('#btnNext').disabled = false;
    updateStats();
  }

  function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
  }

  function completeQuiz() {
    learnedPlanets.add(currentPlanet.name);
    
    if (learnedPlanets.size === PLANETS.length) {
      // All planets learned
      showCompletionModal();
    } else {
      backToPlanets();
    }
  }

  function showCompletionModal() {
    document.getElementById('modalTitle').textContent = '🎉 Eksplorasi Selesai!';
    document.getElementById('modalMessage').textContent = 'Selamat! Kamu telah mempelajari semua planet di tata surya!';
    document.getElementById('planetsLearned').textContent = learnedPlanets.size;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('totalScore').textContent = score;
    openModal();
  }

  function backToPlanets() {
    $('#quizSection').style.display = 'none';
    $('#planetSelector').style.display = 'block';
    $('#planetExplorer').style.display = 'none';
    currentPlanet = null;
    $('#btnStartQuiz').disabled = true;
    $('#planetTag').textContent = 'Planet: -';
    createPlanetSelector();
  }

  function showRandomFact() {
    const allFacts = PLANETS.flatMap(planet => 
      planet.facts.map(fact => `${planet.name}: ${fact}`)
    );
    const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
    
    // Temporarily show random fact
    const factsList = $('#factsList');
    const originalHTML = factsList.innerHTML;
    factsList.innerHTML = `<li style="color: var(--accent); font-style: italic;">✨ ${randomFact}</li>`;
    
    setTimeout(() => {
      factsList.innerHTML = originalHTML;
    }, 3000);
  }

  function updateStats() {
    $('#scoreTag').textContent = `Skor: ${score}`;
  }

  function resetGame() {
    score = 0;
    correctCount = 0;
    learnedPlanets.clear();
    currentPlanet = null;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    
    backToPlanets();
    updateStats();
    closeModal();
  }

  // Event listeners
  $('#btnStartQuiz').onclick = startQuiz;
  $('#btnRandomFact').onclick = showRandomFact;
  $('#btnBack').onclick = backToPlanets;
  $('#btnNext').onclick = nextQuestion;
  document.getElementById('continueExploring').onclick = closeModal;
  document.getElementById('resetExploration').onclick = resetGame;

  // Initialize
  createPlanetSelector();
  updateStats();
}