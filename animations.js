/**
 * VITAL HUB — SHARED ANIMATION ENGINE v2.0
 * Scroll reveals, header shadow, progress bar, stat counters, magnetic hover
 */

(function () {
    'use strict';

    /* ── 1. Page Load Progress Bar ── */
    const bar = document.getElementById('progress-bar');
    if (bar) {
        let w = 0;
        const iv = setInterval(() => {
            w += Math.random() * 18;
            if (w >= 90) { clearInterval(iv); w = 90; }
            bar.style.width = w + '%';
        }, 120);
        window.addEventListener('load', () => {
            bar.style.width = '100%';
            setTimeout(() => { bar.style.opacity = '0'; }, 400);
        });
    }

    /* ── 2. Scroll Reveal (IntersectionObserver) ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('visible');

            /* Stagger children */
            el.querySelectorAll('.reveal-stagger > *').forEach((child, i) => {
                child.style.transitionDelay = (i * 0.1) + 's';
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, i * 100 + 50);
            });

            /* Accent lines */
            el.querySelectorAll('.section-reveal-line').forEach(line => {
                setTimeout(() => line.classList.add('visible'), 200);
            });

            revealObserver.unobserve(el);
        });
    }, { threshold: 0.10 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => revealObserver.observe(el));

    /* ── 3. Stat Counter Animation ── */
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const isFloat = String(target).includes('.');
                const duration = 1500;
                const start = performance.now();
                el.classList.add('pop');

                (function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = target * eased;
                    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                })(performance.now());
            });
            statObserver.unobserve(entry.target);
        });
    }, { threshold: 0.45 });

    document.querySelectorAll('[data-stats-section]').forEach(el => statObserver.observe(el));

    /* ── 4. Header Scroll Shadow ── */
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /* ── 5. Cart Badge Pop (MutationObserver) ── */
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        const badgeObserver = new MutationObserver(() => {
            cartBadge.classList.remove('badge-pop');
            void cartBadge.offsetWidth; // reflow
            cartBadge.classList.add('badge-pop');
        });
        badgeObserver.observe(cartBadge, { childList: true, characterData: true, subtree: true });
    }

    /* ── 6. Smooth Scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── 7. Ripple effect on buttons ── */
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('button, .btn-shimmer');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position:absolute;
            border-radius:50%;
            background:rgba(255,255,255,0.25);
            width:${size}px;height:${size}px;
            left:${e.clientX - rect.left - size/2}px;
            top:${e.clientY - rect.top - size/2}px;
            transform:scale(0);
            animation:rippleAnim 0.5s ease-out forwards;
            pointer-events:none;
            z-index:99;
        `;
        if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    /* Inject ripple keyframe once */
    if (!document.getElementById('ripple-style')) {
        const s = document.createElement('style');
        s.id = 'ripple-style';
        s.textContent = '@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}';
        document.head.appendChild(s);
    }

})();