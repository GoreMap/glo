/* ==========================================================================
   ModsDark Assistant - Interactive Scripts
   ========================================================================== */

// Theme Toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Card glow cursor tracking
  const cards = document.querySelectorAll('.feat-card, .showcase-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// Lightbox Modal functions
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-container')) {
    closeLightboxDirect();
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById('lightbox');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const img = document.getElementById('lightbox-img');
    if (img) img.src = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightboxDirect();
  }
});
