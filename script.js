const photoGrid = document.querySelector('#photo-grid');
const galleryEmpty = document.querySelector('#gallery-empty');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const galleryImages = [];

// Use the first available local photo as a restrained portrait in the Hero.
const heroPhotoFiles = ['photo_1_2026-09-02_16-59-41.jpg', 'photo_2_2026-09-02_16-59-41.jpg'];
const heroSide = document.querySelector('.hero-side');
let heroPhotoLoaded = false;
heroPhotoFiles.some((file) => {
  const image = new Image();
  image.onload = () => {
    if (heroPhotoLoaded) return;
    heroPhotoLoaded = true;
    const portrait = document.createElement('img');
    portrait.className = 'hero-photo';
    portrait.src = image.src;
    portrait.alt = 'Kost1al — Костя';
    heroSide.prepend(portrait);
    heroSide.querySelector('.portrait-mark').style.display = 'none';
  };
  image.src = `assets/photos/${file}`;
  return false;
});

// Add filenames when adding photos to assets/photos/. Missing files are skipped safely.
const photoFiles = [
  'photo_1_2026-09-02_16-59-41.jpg', 'photo_2_2026-09-02_16-59-41.jpg',
  'photo_3_2026-09-02_16-59-41.jpg', 'photo_4_2026-09-02_16-59-41.jpg',
  'photo_5_2026-09-02_16-59-41.jpg', 'photo_6_2026-09-02_16-59-41.jpg',
  'photo_7_2026-09-02_16-59-41.jpg', 'photo_8_2026-09-02_16-59-41.jpg',
  'photo_9_2026-09-02_16-59-41.jpg', 'photo_10_2026-09-02_16-59-42.jpg',
  'photo_11_2026-09-02_16-59-42.jpg', 'photo_12_2026-09-02_16-59-42.jpg',
  'photo_13_2026-09-02_16-59-42.jpg', 'photo_14_2026-09-02_16-59-42.jpg',
  'photo_15_2026-09-02_16-59-42.jpg', 'photo_16_2026-09-02_16-59-42.jpg'
];

function loadImage(path, onLoad) {
  const image = new Image();
  image.onload = () => onLoad(image, path);
  image.src = path;
}

photoFiles.forEach((file) => loadImage(`assets/photos/${file}`, (image, path) => {
  const card = document.createElement('button');
  card.className = 'photo-card';
  card.type = 'button';
  card.setAttribute('aria-label', 'Открыть фотографию Kost1al');
  image.alt = 'Kost1al — Костя';
  card.append(image);
  photoGrid.append(card);
  galleryImages.push({ src: path, alt: image.alt });
  const imageIndex = galleryImages.length - 1;
  card.addEventListener('click', () => openLightbox(imageIndex));
  galleryEmpty.classList.remove('visible');
}));
galleryEmpty.classList.add('visible');

function openLightbox(index) {
  const item = galleryImages[index];
  if (!item) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightbox.dataset.index = index;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
function moveLightbox(step) {
  if (!galleryImages.length) return;
  openLightbox((Number(lightbox.dataset.index) + step + galleryImages.length) % galleryImages.length);
}
lightbox.querySelector('.close').addEventListener('click', closeLightbox);
lightbox.querySelector('.prev').addEventListener('click', () => moveLightbox(-1));
lightbox.querySelector('.next').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft' && lightbox.classList.contains('open')) moveLightbox(-1);
  if (event.key === 'ArrowRight' && lightbox.classList.contains('open')) moveLightbox(1);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
