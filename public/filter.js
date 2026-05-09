(() => {
  const groups = document.querySelectorAll('[data-filter-group]');
  groups.forEach(group => {
    const scope = group.parentElement || document;
    const buttons = group.querySelectorAll('[data-filter]');
    const items = scope.querySelectorAll('[data-filter-item]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-filter');
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        items.forEach(item => {
          const show = value === 'all' || item.getAttribute('data-filter-item') === value;
          item.hidden = !show;
        });
      });
    });
  });
})();
