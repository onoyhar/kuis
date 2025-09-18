import { showFeedback } from '../utils.js';

export function start(ctx) {
  const BODY_PARTS = [
    { name: "Jantung", function: "Memompa darah", location: "Dada" },
    { name: "Paru-paru", function: "Bernapas", location: "Dada" },
    { name: "Hati", function: "Menyaring racun", location: "Perut" },
    { name: "Ginjal", function: "Menyaring darah", location: "Pinggang" },
    { name: "Otak", function: "Berpikir dan mengontrol tubuh", location: "Kepala" }
  ];

  const $ = s => ctx.host.querySelector(s);
  ctx.host.innerHTML = `
    <section class="hero">
      <div class="hero-content glass">
        <h1>🫀 Tubuh Manusia</h1>
        <p>Pelajari organ-organ tubuh manusia!</p>
      </div>
    </section>
    <section class="card glass">
      <div class="quiz-simple">
        <h2>Kuis tentang tubuh manusia akan segera hadir!</h2>
        <p>Game ini sedang dalam pengembangan. Akan segera dilengkapi dengan:</p>
        <ul>
          <li>• Kuis tentang organ tubuh</li>
          <li>• Fungsi masing-masing organ</li>
          <li>• Lokasi organ dalam tubuh</li>
          <li>• Sistem tubuh manusia</li>
        </ul>
        <button class="btn primary" onclick="alert('Coming Soon!')">Demo</button>
      </div>
    </section>
  `;
}