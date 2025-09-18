# 🎓 EduGames - Portal Edukasi Interaktif

Platform web berisi kumpulan **28 game edukasi** yang dirancang khusus untuk anak-anak dan remaja. Aplikasi ini mobile-friendly dan dapat diakses secara offline sebagai Progressive Web App (PWA).

![Educational Games](https://img.shields.io/badge/Games-28%20Available-brightgreen)
![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange)

## ✨ Fitur Utama

- **28 Game Edukasi** tersebar dalam 6 kategori pembelajaran
- **Responsive Design** - Optimal di desktop, tablet, dan mobile
- **Progressive Web App** - Dapat diinstal dan digunakan offline
- **Kategori Beragam** - Bahasa, Matematika, Sains, Kreativitas, Logika, dan Life Skills
- **Interface Ramah Anak** - Desain colorful dengan glass morphism effect
- **Modular Architecture** - Setiap game adalah modul ES6 terpisah

## 🎮 Kategori Game

### 📚 Bahasa (7 Games)
- Kuis Kosakata Arab-Indonesia
- Susun Huruf (Word Scramble)
- Flashcards
- Tebak Kata (Hangman)
- Sinonim/Antonim

### 🔢 Matematika (4 Games)
- Math Speed (Hitung Cepat)
- Pecahan
- Geometri Dasar
- Math Match

### 🔬 Sains (5 Games)
- Kuis Tata Surya
- Tubuh Manusia
- Sejarah Indonesia
- Peta & Geografi
- Satuan & Ukuran

### 🎨 Kreativitas (4 Games)
- Cocok Warna
- Tebak Melodi
- Seni & Budaya
- Gambar Bentuk

### 🧩 Logika (4 Games)
- Tebak Angka
- Memory Card
- Simon Says
- Tantangan Harian
- Sudoku Mudah

### 💡 Life Skills (4 Games)
- Pilihan Sikap (Decision Making)
- Keuangan Dasar
- Kebiasaan Sehat
- Keselamatan

## 🚀 Quick Start

### Menjalankan Secara Lokal

1. **Clone atau Download** project ini
2. **Buka terminal** di folder project
3. **Jalankan local server** (pilih salah satu):
   ```bash
   # Menggunakan Python 3
   python -m http.server 8000
   
   # Menggunakan Node.js (jika ada npx)
   npx serve .
   
   # Menggunakan PHP
   php -S localhost:8000
   ```
4. **Buka browser** dan akses `http://localhost:8000`

### Deploy ke Netlify

#### Opsi 1: Deploy Manual (Drag & Drop)
1. **Buka [Netlify](https://netlify.com)** → **Add new site** → **Deploy manually**
2. **Drag & drop** folder project atau ZIP file
3. **Pastikan** file `netlify.toml` dan `_redirects` terupload untuk SPA routing
4. **Setelah live**, buka URL situs Anda

#### Opsi 2: Deploy via GitHub (Recommended)

**Step 1: Persiapkan Repository GitHub**

1. **Login** ke GitHub dan buat repository baru
2. **Push** project ke GitHub:
   ```bash
   # Inisialisasi Git (jika belum)
   git init
   
   # Tambahkan semua file
   git add .
   
   # Commit pertama
   git commit -m "Initial commit - EduGames project"
   
   # Tambahkan remote GitHub (ganti dengan URL repo Anda)
   git remote add origin https://github.com/username/repo-name.git
   
   # Push ke GitHub
   git branch -M main
   git push -u origin main
   ```

**Step 2: Connect ke Netlify**

1. **Login** ke [Netlify](https://netlify.com)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **"Deploy with GitHub"**
4. **Authorize** Netlify untuk mengakses GitHub Anda
5. **Pilih repository** yang baru Anda buat
6. **Configure settings**:
   - **Branch to deploy**: `main` (atau `master`)
   - **Build command**: (kosongkan, karena ini static site)
   - **Publish directory**: (kosongkan atau isi dengan `/`)
7. Klik **"Deploy site"**

**Step 3: Configure Domain & Settings**

1. **Custom Domain** (opsional):
   - Go to **Site settings** → **Domain management**
   - Add custom domain jika ada
2. **Environment Variables** (jika diperlukan):
   - Go to **Site settings** → **Environment variables**
3. **Build & Deploy Settings**:
   - Pastikan **Auto publishing** aktif untuk deploy otomatis setiap push

**Step 4: Verifikasi Deploy**

- Netlify akan otomatis build dan deploy
- Cek **Deploy log** jika ada error
- Test semua fitur PWA dan game modules
- Pastikan routing SPA berfungsi dengan baik

**Tips & Best Practices untuk GitHub + Netlify:**

✅ **Auto Deploy**: Setiap kali Anda push ke branch `main`, Netlify akan otomatis deploy ulang

✅ **Branch Preview**: Buat branch `development` untuk testing sebelum merge ke `main`

✅ **Build Commands**: Untuk static site seperti ini, tidak perlu build command

✅ **Custom Domain**: Gunakan domain custom untuk tampilan profesional

**Troubleshooting Common Issues:**

🔧 **404 Error pada Refresh**: 
   - Pastikan file `_redirects` dan `netlify.toml` ada di root folder
   - Isi `_redirects` dengan: `/* /index.html 200`

🔧 **Game Module Tidak Load**: 
   - Check console browser untuk error CORS atau module loading
   - Pastikan semua file `.js` di folder `games/` ter-upload

🔧 **PWA Tidak Berfungsi**:
   - Verifikasi `manifest.webmanifest` dan `sw.js` accessible
   - Test di HTTPS (Netlify otomatis provide SSL)

🔧 **Deploy Gagal**:
   - Check Deploy log di Netlify dashboard
   - Pastikan tidak ada file yang terlalu besar (>100MB)
   - Verify Git history tidak corrupt

### Deploy ke Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy ke GitHub Pages

1. Push ke GitHub repository
2. Aktifkan GitHub Pages di Settings → Pages
3. Pilih source branch (biasanya `main` atau `master`)

## 📁 Struktur Project

```
kuis/
├── index.html              # Halaman utama aplikasi
├── landing.html             # Landing page (opsional)
├── styles.css               # Stylesheet utama dengan glass morphism
├── app.js                   # Registry game & navigation logic
├── utils.js                 # Utility functions
├── sw.js                    # Service Worker untuk PWA
├── manifest.webmanifest     # PWA manifest
├── netlify.toml             # Konfigurasi Netlify
├── _redirects               # Redirect rules untuk SPA
├── assets/                  # Asset gambar & icon
│   ├── icon-192.png
│   └── icon-512.png
└── games/                   # Modul-modul game
    ├── vocab_ar_id.js       # ✅ Game Vocabulary Arab
    ├── speed_math.js        # ✅ Math Speed Game
    ├── word_scramble.js     # ✅ Word Scramble
    ├── guess_number.js      # ✅ Guess Number
    ├── memory_match.js      # ✅ Memory Match
    ├── flashcards.js        # Game Flashcards
    ├── hangman.js           # Game Hangman
    ├── human_body.js        # Quiz Tubuh Manusia
    ├── geo_quiz.js          # Quiz Geografi
    ├── color_match.js       # Game Cocok Warna
    ├── art_culture.js       # Quiz Seni Budaya
    ├── drawing_game.js      # Game Menggambar
    ├── decision_making.js   # Game Pengambilan Keputusan
    ├── finance_quiz.js      # Quiz Keuangan
    ├── healthy_habits.js    # Quiz Kebiasaan Sehat
    ├── daily_challenge.js   # Tantangan Harian
    ├── fractions.js         # Game Pecahan
    ├── geometry.js          # Game Geometri
    └── ...                  # Game modules lainnya
```

## 🛠 Teknologi yang Digunakan

- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan glass morphism effects
- **Vanilla JavaScript** - ES6+ modules, async/await
- **PWA** - Service Worker, Web App Manifest
- **Responsive Design** - CSS Grid, Flexbox
- **Accessibility** - ARIA labels, semantic HTML

## 🎯 Cara Menambah Game Baru

1. **Buat file game** baru di folder `games/`, contoh: `my_game.js`

```javascript
// games/my_game.js
export function start({ host, modalHost }) {
  host.innerHTML = `
    <div class="game-container">
      <h2>Game Saya</h2>
      <p>Konten game...</p>
      <button onclick="backToHome()">Kembali</button>
    </div>
  `;
}

function backToHome() {
  document.getElementById('view').innerHTML = '';
  window.showCategories();
}
```

2. **Daftarkan di app.js** dalam array `GAMES`:

```javascript
{ 
  id: "my_game", 
  title: "Game Saya", 
  cat: "Logika", 
  desc: "Deskripsi game saya", 
  module: "./games/my_game.js" 
}
```

3. **Update counter** di `index.html` sesuai kategori

## 🎨 Kustomisasi Theme

Edit `styles.css` untuk mengubah warna tema:

```css
:root {
  --primary: #22c55e;      /* Hijau utama */
  --secondary: #3b82f6;    /* Biru sekunder */
  --accent: #f59e0b;       /* Orange aksen */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}
```

## 📱 PWA Features

- **Installable** - Dapat diinstal di home screen
- **Offline Support** - Cache assets penting
- **App-like Experience** - Fullscreen mode
- **Push Notifications** - Ready untuk notifikasi (belum implementasi)

## 🤝 Kontribusi

Kami menerima kontribusi! Cara berkontribusi:

1. **Fork** repository ini
2. **Buat branch** fitur: `git checkout -b fitur-game-baru`
3. **Commit** perubahan: `git commit -am 'Tambah game XYZ'`
4. **Push** ke branch: `git push origin fitur-game-baru`
5. **Buat Pull Request**

### Guidelines Kontribusi

- Game harus edukatif dan sesuai untuk anak-anak
- Ikuti pattern struktur game yang ada
- Pastikan responsive dan accessible
- Test di berbagai device sebelum submit

## 📄 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 🔧 Development

### Prerequisites

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Local web server (Python, Node.js, atau PHP)
- Text editor (VS Code, Sublime, dll)
- Git untuk version control
- GitHub account untuk hosting repository
- Netlify account untuk deployment

### Workflow Development dengan GitHub + Netlify

```bash
# 1. Clone repository (untuk kontributor)
git clone https://github.com/username/repo-name.git
cd repo-name

# 2. Buat branch fitur baru
git checkout -b feature/new-game

# 3. Develop dan test locally
python -m http.server 8000
# Test di http://localhost:8000

# 4. Commit changes
git add .
git commit -m "feat: add new educational game"

# 5. Push branch ke GitHub
git push origin feature/new-game

# 6. Buat Pull Request di GitHub
# 7. Setelah merge ke main, Netlify auto-deploy
```

### Local Development Setup

1. **Clone project:**
   ```bash
   git clone https://github.com/your-username/kuis.git
   cd kuis
   ```

2. **Start local server:**
   ```bash
   # Pilih salah satu:
   python -m http.server 8000
   # atau
   npx serve .
   # atau
   php -S localhost:8000
   ```

3. **Open browser:**
   - Navigate to `http://localhost:8000`
   - Test semua games dan features

4. **Development workflow:**
   - Edit files dengan text editor favorit
   - Test changes di local server
   - Commit dan push ke GitHub
   - Netlify akan auto-deploy dari GitHub

### Best Practices

- **Git Flow**: Gunakan branch terpisah untuk setiap fitur
- **ES6+ Features**: Utilize modern JavaScript
- **Error Handling**: Implement proper try-catch blocks
- **Mobile Testing**: Test di berbagai device sizes
- **Performance**: Optimize assets dan loading times
- **Accessibility**: Follow WCAG guidelines
- **PWA**: Ensure offline functionality works

## 📞 Support

Jika ada pertanyaan atau masalah:

- **Create Issue** di GitHub repository
- **Email**: your-email@domain.com
- **Documentation**: Cek file README ini

---

## 🚀 Quick Deploy Action

Jika Anda ingin langsung deploy project ini ke Netlify via GitHub, jalankan commands berikut:

```bash
# 1. Add semua file ke Git
git add .

# 2. Commit dengan message yang jelas
git commit -m "docs: update comprehensive README with deployment guide"

# 3. Push ke GitHub (pastikan sudah ada remote origin)
git push origin main

# 4. Lanjut ke Step 2 di panduan "Deploy via GitHub" di atas
```

**Current Git Status:**
- ✅ Repository sudah di-initialize
- ✅ Remote origin sudah terpasang
- 📝 README.md telah diupdate dengan dokumentasi lengkap
- ⏳ Siap untuk commit dan push

---

**Dibuat dengan ❤️ untuk pendidikan anak Indonesia**

Copyright © 2024 Portal Games Seru. All Rights Reserved.
