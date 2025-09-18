import { showFeedback } from '../utils.js';

export function start(ctx) {
  const $ = s => ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🇮🇩 Sejarah Indonesia</h1>
        <p>Pelajari sejarah bangsa Indonesia!</p>
      </div>
    </section>
    <section class="card glass">
      <h2>Kuis sejarah Indonesia akan segera hadir!</h2>
      <p>Akan mencakup: Kemerdekaan, Pahlawan, Era kolonial, dll.</p>
      <button class="btn primary" onclick="alert('Coming Soon!')">Demo</button>
    </section>
  `;
}
