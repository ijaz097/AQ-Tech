(() => {
  const normalizeIndexPath = () => {
    const path = window.location.pathname;
    if (!path.endsWith('/index.html')) return;

    const url = new URL(window.location.href);
    url.pathname = path.replace(/\/index\.html$/, '/');
    window.location.replace(url.toString());
  };

  normalizeIndexPath();

  if (location.protocol === 'file:') {
    document.addEventListener('click', e => {
      if (!(e.target instanceof Element) || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname.endsWith('/index.html')) {
        e.preventDefault();
        window.location.href = url.pathname.replace(/\/index\.html$/, '/');
      }
    });
  }

  const toggle = document.querySelector('.mobile-toggle'), nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
  }

  const number = '923062142514';
  function whatsapp(message) {
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  document.querySelectorAll('[data-package]').forEach(el => {
    const pkg = el.dataset.package;
    el.href = whatsapp(`Hello AQ Tech, I'd like a quotation for the ${pkg} CCTV package. Please confirm current availability and pricing.`);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-service]').forEach(el => {
    el.href = whatsapp(`Hello AQ Tech, I would like to discuss your ${el.dataset.service} service. Please contact me with the next steps.`);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  const tabs = document.querySelectorAll('[role=tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
      });
    });
  });

  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const clean = k => String(data.get(k) || '').trim();
      const name = clean('name');
      const phone = clean('phone');
      const service = clean('service');
      const details = clean('details');
      const message = `Hello AQ Tech, I would like a quotation.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDetails: ${details}`;
      window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }
})();
