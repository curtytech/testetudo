(async function includePartials() {
  const anchors = document.querySelectorAll('[data-include]');
  for (const el of anchors) {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(`/partials/${file}`);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error('Falha ao carregar parcial:', file, e);
    }
  }
})();