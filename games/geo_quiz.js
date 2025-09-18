import { showFeedback } from '../utils.js';

export function start(ctx) {
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🗺️ Peta & Geografi</h1>
        <p>Jelajahi geografi Indonesia & dunia!</p>
      </div>
    </section>
    <section class="card glass">
      <h2>Kuis geografi akan segera hadir!</h2>
      <button class="btn primary" onclick="alert('Coming Soon!')">Demo</button>
    </section>
  `;
}
