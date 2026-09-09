/**
 * Kost1al Portfolio - Interactive Core Script
 * Features:
 * - Particle Canvas Background
 * - 16-Photo Gallery Grid Renderer
 * - Full-featured Lightbox Modal with Keyboard & Touch Support
 * - Mobile Navigation Drawer
 * - Clipboard Copy Helper
 */

// 1. Photo Archive Data
const photoFiles = [
  { file: 'photo_1_2026-09-02_16-59-41.jpg', title: 'Kost1al — Портрет разработчика', tag: 'Developer' },
  { file: 'photo_2_2026-09-02_16-59-41.jpg', title: 'Kost1al — Profile Photo', tag: 'Developer' },
  { file: 'photo_3_2026-09-02_16-59-41.jpg', title: 'Day X Reforged — Постапокалипсис', tag: 'Day X' },
  { file: 'photo_4_2026-09-02_16-59-41.jpg', title: 'Kost1al 3D — Моделирование & Печать', tag: '3D Print' },
  { file: 'photo_5_2026-09-02_16-59-41.jpg', title: 'Server Setup & Инфраструктура', tag: 'Infra' },
  { file: 'photo_6_2026-09-02_16-59-41.jpg', title: 'Day X Reforged — Игровой мир Forge', tag: 'Day X' },
  { file: 'photo_7_2026-09-02_16-59-41.jpg', title: 'Проектная разработка и тесты', tag: 'Project' },
  { file: 'photo_8_2026-09-02_16-59-41.jpg', title: 'Hardware & Серверное окружение', tag: 'Hardware' },
  { file: 'photo_9_2026-09-02_16-59-41.jpg', title: 'Kost1al 3D — Прототип изделия', tag: '3D Print' },
  { file: 'photo_10_2026-09-02_16-59-42.jpg', title: 'Детализация сборки и визуализация', tag: 'Visuals' },
  { file: 'photo_11_2026-09-02_16-59-42.jpg', title: 'Кастомные модели и текстуры', tag: 'Assets' },
  { file: 'photo_12_2026-09-02_16-59-42.jpg', title: 'Производство изделий Kost1al 3D', tag: '3D Print' },
  { file: 'photo_13_2026-09-02_16-59-42.jpg', title: 'Сетевая архитектура и синхронизация', tag: 'Systems' },
  { file: 'photo_14_2026-09-02_16-59-42.jpg', title: 'Рабочее пространство разработки', tag: 'Workspace' },
  { file: 'photo_15_2026-09-02_16-59-42.jpg', title: 'Тестирование Forge 1.20.1 ядра', tag: 'Forge' },
  { file: 'photo_16_2026-09-02_16-59-42.jpg', title: 'Развертывание и боевой сервер', tag: 'Release' }
];

// 2. Interactive Canvas Particle Background
(function initCanvas() {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const count = Math.floor(Math.min(width, 1200) / 32);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// 3. Render Photo Grid
const photoGrid = document.getElementById('photo-grid');
if (photoGrid) {
  photoFiles.forEach((item, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'group relative aspect-square rounded-xl overflow-hidden border border-surface-border bg-surface text-left transition-all duration-300 hover:border-zinc-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400';
    card.setAttribute('aria-label', `Открыть ${item.title}`);

    card.innerHTML = `
      <img 
        src="assets/photos/${item.file}" 
        alt="${item.title}" 
        loading="lazy" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
      
      <!-- Top index badge -->
      <div class="absolute top-2.5 left-2.5 flex items-center gap-1 font-mono text-[10px] text-zinc-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
        <span>#${String(index + 1).padStart(2, '0')}</span>
      </div>

      <!-- Bottom overlay info -->
      <div class="absolute bottom-2.5 left-2.5 right-2.5 z-10">
        <span class="inline-block text-[9px] font-mono uppercase tracking-wider text-emerald-400 mb-0.5">${item.tag}</span>
        <p class="text-xs font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">${item.title}</p>
      </div>

      <!-- Zoom icon on hover -->
      <div class="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-black/70 text-white">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(index));
    photoGrid.appendChild(card);
  });
}

// 4. Lightbox Modal Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxIndex = document.getElementById('lightbox-index');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;

function openLightbox(index) {
  if (!lightbox || !photoFiles[index]) return;
  currentIndex = index;
  const item = photoFiles[currentIndex];

  lightboxImg.src = `assets/photos/${item.file}`;
  lightboxImg.alt = item.title;
  lightboxCaption.textContent = item.title;
  lightboxIndex.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(photoFiles.length).padStart(2, '0')}`;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openLightboxByFile(filename) {
  const index = photoFiles.findIndex(p => p.file === filename);
  if (index !== -1) {
    openLightbox(index);
  } else {
    // fallback if file not in array
    if (!lightbox) return;
    lightboxImg.src = `assets/photos/${filename}`;
    lightboxCaption.textContent = 'Day X Reforged Preview';
    lightboxIndex.textContent = 'PREVIEW';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}
window.openLightboxByFile = openLightboxByFile;

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function nextLightbox() {
  currentIndex = (currentIndex + 1) % photoFiles.length;
  openLightbox(currentIndex);
}

function prevLightbox() {
  currentIndex = (currentIndex - 1 + photoFiles.length) % photoFiles.length;
  openLightbox(currentIndex);
}

if (lightbox) {
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', (e) => { e.stopPropagation(); prevLightbox(); });
  lightboxNext?.addEventListener('click', (e) => { e.stopPropagation(); nextLightbox(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lightbox') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

// 5. Mobile Navigation Drawer Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

// 6. Copy To Clipboard Helper
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerText;
    btnElement.innerText = 'Скопировано ✓';
    btnElement.classList.add('bg-emerald-400', 'text-black');
    setTimeout(() => {
      btnElement.innerText = originalText;
      btnElement.classList.remove('bg-emerald-400', 'text-black');
    }, 2000);
  }).catch(err => {
    console.error('Copy failed: ', err);
  });
}
window.copyToClipboard = copyToClipboard;
