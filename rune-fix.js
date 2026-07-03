/* rune-fix.js
   Adds unified pointer/click/touch handlers for rune buttons to fix mobile input issues.
   Usage: include <script src="rune-fix.js"></script> after existing scripts or at end of body.
*/
(function(){
    function setupRuneListeners() {
        for (let i = 0; i < 4; i++) {
            const el = document.getElementById('rune' + i);
            if (!el) continue;

            // Neutralize inline handlers to avoid double calls
            try { el.onmousedown = null; } catch(_) {}
            try { el.ontouchstart = null; } catch(_) {}

            // pointerdown covers mouse/touch/stylus in modern browsers
            el.addEventListener('pointerdown', function (ev) {
                // prevent default to avoid synthesized mouse events / scrolling
                if (ev.cancelable) ev.preventDefault();
                if (typeof initAudio === 'function') initAudio();
                if (typeof handleRuneClick === 'function') handleRuneClick(i);
            });

            // click as a fallback
            el.addEventListener('click', function (ev) {
                if (ev.cancelable) ev.preventDefault();
                if (typeof initAudio === 'function') initAudio();
                if (typeof handleRuneClick === 'function') handleRuneClick(i);
            });

            // touchend as additional reinforcement on older WebViews
            el.addEventListener('touchend', function (ev) {
                if (ev.cancelable) ev.preventDefault();
                if (typeof initAudio === 'function') initAudio();
                if (typeof handleRuneClick === 'function') handleRuneClick(i);
            }, { passive: false });
        }
    }

    // Wait for DOM ready; if already loaded, run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupRuneListeners);
    } else {
        setupRuneListeners();
    }
})();
