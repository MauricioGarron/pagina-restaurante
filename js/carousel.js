document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.categories__track');
  const prevBtn = document.querySelector('.slider-btn--prev');
  const nextBtn = document.querySelector('.slider-btn--next');

  if (!track || !prevBtn || !nextBtn) return;

  const items = Array.from(track.children);
  let currentIndex = 0;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 480) return 2;
    return 1;
  }

  function updateTransform() {
    if (!items[0]) return;
    const itemRect = items[0].getBoundingClientRect();
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 0;
    const step = itemRect.width + gap;
    track.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  function refreshCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, items.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);
    updateTransform();
  }

  prevBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = items.length - visibleCount;
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateTransform();
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = items.length - visibleCount;
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateTransform();
  });

  window.addEventListener('resize', () => {
    refreshCarousel();
  });

  // initial setup
  track.style.transition = 'transform 0.35s ease';
  track.style.willChange = 'transform';
  refreshCarousel();
});