const counters = document.querySelectorAll('[data-target]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = 'true';
    const end = Number(entry.target.dataset.target);
    const started = performance.now();
    const duration = 900;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      entry.target.textContent = Math.floor(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });
counters.forEach((counter) => observer.observe(counter));
