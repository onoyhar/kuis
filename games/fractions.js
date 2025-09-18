import { showFeedback } from '../utils.js';

export function start(ctx) {
  const $ = s => ctx.host.querySelector(s);
  
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🍕 Pecahan</h1>
        <p>Belajar pecahan dengan cara yang menyenangkan!</p>
      </div>
    </section>
    <section class="card glass">
      <div class="game-stats">
        <div class="chips">
          <span class="chip" id="scoreTag">Skor: 0</span>
          <span class="chip" id="levelTag">Level: 1</span>
          <span class="chip" id="streakTag">Streak: 0</span>
        </div>
      </div>
      
      <div class="fraction-display">
        <h2>Berapa nilai pecahan ini?</h2>
        <div id="fractionVisual" class="fraction-visual"></div>
        <div id="fractionText" class="fraction-text">1/2</div>
      </div>
      
      <div class="answer-options" id="answerOptions"></div>
      
      <div class="game-controls">
        <button class="btn primary" id="nextQuestion" disabled>Pertanyaan Berikutnya</button>
        <button class="btn" id="newGame">Game Baru</button>
      </div>
    </section>
  `;

  let score = 0;
  let level = 1;
  let streak = 0;
  let currentAnswer = 0;
  let answered = false;

  function generateFraction() {
    const denominators = [2, 3, 4, 5, 6, 8, 10];
    const denominator = denominators[Math.floor(Math.random() * denominators.length)];
    const numerator = Math.floor(Math.random() * denominator) + 1;
    return { numerator, denominator };
  }

  function displayFraction(numerator, denominator) {
    $('#fractionText').textContent = `${numerator}/${denominator}`;
    
    const visual = $('#fractionVisual');
    visual.innerHTML = '';
    
    // Create visual representation
    for (let i = 0; i < denominator; i++) {
      const piece = document.createElement('div');
      piece.className = `fraction-piece ${i < numerator ? 'filled' : 'empty'}`;
      visual.appendChild(piece);
    }
    
    return numerator / denominator;
  }

  function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    
    while (options.length < 4) {
      const wrongFraction = generateFraction();
      const wrongAnswer = wrongFraction.numerator / wrongFraction.denominator;
      
      if (!options.some(opt => Math.abs(opt - wrongAnswer) < 0.01)) {
        options.push(wrongAnswer);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  }

  function displayOptions(options, correctAnswer) {
    const container = $('#answerOptions');
    container.innerHTML = '';
    
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'option-btn glass-button';
      btn.textContent = option.toFixed(2);
      btn.onclick = () => selectAnswer(option, correctAnswer);
      container.appendChild(btn);
    });
  }

  function selectAnswer(selected, correct) {
    if (answered) return;
    
    answered = true;
    const buttons = [...$('#answerOptions').children];
    const selectedBtn = buttons.find(b => parseFloat(b.textContent) === selected);
    
    if (Math.abs(selected - correct) < 0.01) {
      selectedBtn.classList.add('correct');
      showFeedback(selectedBtn, true);
      score += 10 + (streak * 2);
      streak++;
    } else {
      selectedBtn.classList.add('wrong');
      showFeedback(selectedBtn, false);
      streak = 0;
      // Show correct answer
      const correctBtn = buttons.find(b => Math.abs(parseFloat(b.textContent) - correct) < 0.01);
      correctBtn.classList.add('correct');
    }
    
    buttons.forEach(b => b.disabled = true);
    $('#nextQuestion').disabled = false;
    updateStats();
  }

  function nextQuestion() {
    answered = false;
    const fraction = generateFraction();
    currentAnswer = displayFraction(fraction.numerator, fraction.denominator);
    const options = generateOptions(currentAnswer);
    displayOptions(options, currentAnswer);
    $('#nextQuestion').disabled = true;
    
    if (score > 0 && score % 100 === 0) {
      level++;
    }
  }

  function updateStats() {
    $('#scoreTag').textContent = `Skor: ${score}`;
    $('#levelTag').textContent = `Level: ${level}`;
    $('#streakTag').textContent = `Streak: ${streak}`;
  }

  function newGame() {
    score = 0;
    level = 1;
    streak = 0;
    updateStats();
    nextQuestion();
  }

  $('#nextQuestion').onclick = nextQuestion;
  $('#newGame').onclick = newGame;

  // Start the game
  newGame();
}