(() => {
  'use strict';
  document.documentElement.classList.add('js');
  if (location.protocol !== 'file:' && location.pathname.endsWith('/index.html')) {
    const url = new URL(location.href);
    url.pathname = url.pathname.replace(/\/index\.html$/, '/');
    history.replaceState(null, '', url);
  }
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
    matchMedia('(min-width: 851px)').addEventListener('change', () => setOpen(false));
  }
  const whatsapp = message => 'https://wa.me/923062142514?text=' + encodeURIComponent(message);
  document.querySelectorAll('[data-package], [data-service]').forEach(link => {
    link.href = whatsapp(link.dataset.package
      ? `Hello AQ Tech, I'd like a quotation for the ${link.dataset.package} CCTV package. Please confirm current availability and pricing.`
      : `Hello AQ Tech, I would like to discuss your ${link.dataset.service} service. Please contact me with the next steps.`);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  document.querySelectorAll('[role=tablist]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role=tab]')];
    const activate = tab => {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !selected;
          panel.classList.toggle('active', selected);
        }
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        activate(tabs[next]);
        tabs[next].focus();
      });
    });
    if (tabs.length) activate(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  });
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const clean = key => String(data.get(key) || '').trim();
      const message = `Hello AQ Tech, I would like a quotation.\n\nName: ${clean('name')}\nPhone: ${clean('phone')}\nService: ${clean('service')}\nLocation: ${clean('location')}\nProperty: ${clean('property') || 'Not specified'}\nDetails: ${clean('details') || 'Not specified'}`;
      // Same-tab navigation avoids popup blockers; preserve the customer's draft.
      location.assign(whatsapp(message));
    });
    form.querySelector('[type=submit]').disabled = false;
  }
})();
