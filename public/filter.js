(() => {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const scope = group.parentElement || document;
    const buttons = group.querySelectorAll('[data-filter]');
    const items = scope.querySelectorAll('[data-filter-item]');
    group.hidden = false;
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.classList.contains('is-active')));
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-filter');
        buttons.forEach(b => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        items.forEach(item => { item.hidden = value !== 'all' && item.getAttribute('data-filter-item') !== value; });
      });
    });
  });
})();
