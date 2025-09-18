import { showFeedback } from '../utils.js';

export function start(ctx) {
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🎮 Game</h1>
        <p>Game ini akan segera tersedia!</p>
      </div>
    </section>
    <section class="card glass">
      <h2>Game sedang dalam pengembangan...</h2>
      <button class="btn primary" onclick="alert('Coming Soon!')">Demo</button>
    </section>
  `;
}
