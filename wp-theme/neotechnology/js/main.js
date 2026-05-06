/* NeoTechnology Solutions — main.js */
(function() {
  'use strict';

  /* ── Mobile nav ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Nav scroll style ── */
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(12,12,14,0.97)';
      } else {
        nav.style.background = 'rgba(12,12,14,0.85)';
      }
    }, { passive: true });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = body.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-trigger').forEach(b => b.classList.remove('active'));

      if (!isOpen) {
        body.classList.add('open');
        btn.classList.add('active');
      }
    });
  });

  /* ── Fade-in on scroll — activate only after JS ready ── */
  document.body.classList.add('js-animate');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    observer.observe(el);
  });

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Interactive Terminal ── */
  (function initTerminal() {
    const output   = document.getElementById('terminal-output');
    const inputEl  = document.getElementById('terminal-input');
    const clockEl  = document.getElementById('panel-clock');
    const statusEl = document.getElementById('term-status');

    if (!output || !inputEl) return;

    /* ── Live clock ── */
    function updateClock() {
      if (!clockEl) return;
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      clockEl.textContent =
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) +
        ' — ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* ── Line factory ── */
    function makeLine(type, prompt, text) {
      const row = document.createElement('div');
      row.className = 'term-line ' + type;
      if (type === 'cmd') {
        const ps = document.createElement('span');
        ps.className = 'term-prompt';
        ps.textContent = prompt || 'neo@nts:~$';
        row.appendChild(ps);
        row.appendChild(document.createTextNode(' '));
      }
      const content = document.createElement('span');
      content.className = 'term-text';
      content.textContent = text;
      row.appendChild(content);
      output.appendChild(row);
      output.scrollTop = output.scrollHeight;
      return { row, content };
    }

    /* ── Cursor element ── */
    function makeCursor() {
      const c = document.createElement('span');
      c.className = 'term-cursor';
      return c;
    }

    /* ── Typewriter for a single line ── */
    function typeText(span, text, speed, done) {
      let i = 0;
      const cursor = makeCursor();
      span.appendChild(cursor);
      function tick() {
        if (i < text.length) {
          cursor.before(text[i]);
          i++;
          setTimeout(tick, speed);
        } else {
          cursor.remove();
          if (done) done();
        }
      }
      tick();
    }

    /* ── Boot sequence ── */
    const BOOT = [
      { type: 'cmd',  prompt: 'neo@nts:~$', text: 'neotech init --platform=production', speed: 38 },
      { type: 'ok',   prompt: '',            text: '✓  store-setup        loaded',        delay: 180 },
      { type: 'ok',   prompt: '',            text: '✓  payment-gateways   8+ active',     delay: 200 },
      { type: 'ok',   prompt: '',            text: '✓  automation         6 000+ flows',  delay: 200 },
      { type: 'ok',   prompt: '',            text: '✓  markets            US + GCC',      delay: 200 },
      { type: 'info', prompt: '',            text: '─────────────────────────────────',   delay: 160 },
      { type: 'ok',   prompt: '',            text: '●  STATUS   READY     v2.0.0',        delay: 140 },
    ];

    function runBoot(index, afterDone) {
      if (index >= BOOT.length) {
        /* idle blinking cursor at end */
        const { row, content } = makeLine('cmd', 'neo@nts:~$', '');
        row.appendChild(makeCursor());
        if (afterDone) afterDone();
        return;
      }
      const step = BOOT[index];
      if (index === 0) {
        /* typewriter for the first command line */
        const { content } = makeLine('cmd', step.prompt, '');
        typeText(content, step.text, step.speed, () => {
          setTimeout(() => runBoot(index + 1, afterDone), 300);
        });
      } else {
        setTimeout(() => {
          const { content } = makeLine(step.type, '', '');
          typeText(content, step.text, 14, () => {
            runBoot(index + 1, afterDone);
          });
        }, step.delay || 160);
      }
    }

    /* ── Command responses ── */
    const COMMANDS = {
      help: [
        { type: 'info', text: 'Available commands:' },
        { type: 'ok',   text: '  services   → list what we build' },
        { type: 'ok',   text: '  pricing    → view packages & rates' },
        { type: 'ok',   text: '  about      → who we are' },
        { type: 'ok',   text: '  contact    → reach us' },
        { type: 'ok',   text: '  clear      → reset terminal' },
      ],
      services: [
        { type: 'info', text: '── Services ──────────────────────' },
        { type: 'ok',   text: '  store-setup · payments · automation' },
        { type: 'ok',   text: '  hosting · ai-consulting · brokerage' },
        { type: 'ok',   text: '  quick-fix · communication-suite' },
        { type: 'info', text: 'Scrolling to services section…', scroll: 'services' },
      ],
      pricing: [
        { type: 'info', text: '── Packages ──────────────────────' },
        { type: 'ok',   text: '  Starter     $999   one-time' },
        { type: 'ok',   text: '  Professional $2 499 one-time' },
        { type: 'ok',   text: '  GCC Special  $3 499 one-time' },
        { type: 'ok',   text: '  Enterprise   Custom' },
        { type: 'info', text: 'Scrolling to pricing section…', scroll: 'pricing' },
      ],
      about: [
        { type: 'info', text: '── About ─────────────────────────' },
        { type: 'ok',   text: '  NeoTechnology Solutions LLC' },
        { type: 'ok',   text: '  Wyoming • EIN 36-5148912' },
        { type: 'ok',   text: '  US + GCC markets' },
        { type: 'info', text: 'Scrolling to about section…', scroll: 'about' },
      ],
      contact: [
        { type: 'info', text: 'Routing to contact form…', scroll: 'contact' },
      ],
    };

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    function appendIdlePrompt() {
      /* remove any existing idle prompt first */
      const last = output.lastElementChild;
      if (last && last.classList.contains('idle-prompt')) last.remove();
      const row = document.createElement('div');
      row.className = 'term-line cmd idle-prompt';
      const ps = document.createElement('span');
      ps.className = 'term-prompt';
      ps.textContent = 'neo@nts:~$';
      row.appendChild(ps);
      row.appendChild(document.createTextNode(' '));
      row.appendChild(makeCursor());
      output.appendChild(row);
      output.scrollTop = output.scrollHeight;
    }

    function handleCommand(raw) {
      const cmd = raw.trim().toLowerCase();

      /* echo the typed command */
      const { content } = makeLine('cmd', 'neo@nts:~$', cmd);

      if (cmd === 'clear') {
        setTimeout(() => {
          output.innerHTML = '';
          appendIdlePrompt();
        }, 120);
        return;
      }

      const response = COMMANDS[cmd];
      if (response) {
        let delay = 60;
        response.forEach(line => {
          setTimeout(() => {
            makeLine(line.type, '', line.text);
            if (line.scroll) scrollToSection(line.scroll);
          }, delay);
          delay += 90;
        });
        setTimeout(appendIdlePrompt, delay + 40);
      } else if (cmd === '') {
        appendIdlePrompt();
      } else {
        setTimeout(() => {
          makeLine('err', '', 'command not found: ' + cmd + '   (type help)');
          appendIdlePrompt();
        }, 80);
      }
    }

    /* ── Wire up input ── */
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = inputEl.value;
        inputEl.value = '';
        /* remove idle blinking line before echoing command */
        const last = output.lastElementChild;
        if (last && last.classList.contains('idle-prompt')) last.remove();
        handleCommand(val);
      }
    });

    /* clicking anywhere on panel focuses input */
    const panel = document.getElementById('hero-terminal');
    if (panel) {
      panel.addEventListener('click', () => inputEl.focus());
    }

    /* ── Status colour: amber while booting, green when ready ── */
    if (statusEl) { statusEl.textContent = '● BOOTING'; statusEl.style.color = '#FBBF24'; }

    /* ── Start ── */
    setTimeout(() => runBoot(0, () => {
      if (statusEl) statusEl.style.color = '#4ADE80';
      appendIdlePrompt();
    }), 400);

  })();

})();
