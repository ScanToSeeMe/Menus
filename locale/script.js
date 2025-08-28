// Minimal, smooth slider με touch gestures, axis lock, pinch-zoom friendly και αυστηρά άκρα
(function () {
  const slidesEl = document.getElementById('slides');
  const hintEl = document.getElementById('hint');

  const state = {
    index: 0,            // 0 ή 1
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    dragging: false,
    lockedAxis: null,    // 'x' | 'y' | null
    width: () => window.innerWidth,
    startedOnLink: false
  };

  const clampIndex = (i) => Math.max(0, Math.min(1, i));
  const setIndex = (i, opts = { animate: true }) => {
    state.index = clampIndex(i);
    slidesEl.style.transition = opts.animate
      ? 'transform 300ms cubic-bezier(.22,.61,.36,1)'
      : 'none';
    const x = -state.index * state.width();
    slidesEl.style.transform = `translateX(${x}px)`;

    // Κρύψε hint όταν ο χρήστης αλλάξει slide
    if (state.index > 0) hideHint();
  };

  const hideHint = () => {
    if (!hintEl) return;
    hintEl.classList.add('hide');
    // Προαιρετικά: καθυστέρηση για smooth fade
    setTimeout(() => {}, 600);
  };

  // Touch handlers με axis lock και pinch-zoom allowance
  const onTouchStart = (e) => {
    // Αν υπάρχουν 2+ δάχτυλα, άφησε το browser να κάνει pinch-zoom
    if (e.touches.length !== 1) {
      state.dragging = false;
      state.lockedAxis = null;
      return;
    }
    state.dragging = true;
    state.lockedAxis = null;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
    state.currentX = state.startX;
    state.currentY = state.startY;
    state.startedOnLink = e.target.closest && !!e.target.closest('a, area');
    slidesEl.style.transition = 'none';
  };

  const AXIS_LOCK_THRESHOLD = 8; // px

  const onTouchMove = (e) => {
    if (!state.dragging) return;
    // Αν ο χρήστης έχει 2+ δάχτυλα, μην επεμβαίνεις (pinch-zoom)
    if (e.touches.length !== 1) return;
    if (state.startedOnLink) return;

    state.currentX = e.touches[0].clientX;
    state.currentY = e.touches[0].clientY;

    const dx = state.currentX - state.startX;
    const dy = state.currentY - state.startY;

    // Κλείδωμα άξονα: αποφάσισε αν η χειρονομία είναι οριζόντια ή κάθετη
    if (!state.lockedAxis) {
      if (Math.abs(dx) > AXIS_LOCK_THRESHOLD || Math.abs(dy) > AXIS_LOCK_THRESHOLD) {
        state.lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      } else {
        return; // περιμένουμε να ξεκαθαρίσει η χειρονομία
      }
    }

    // Αν κλειδώθηκε στον άξονα Y, μην σέρνεις το slider (άφησε scroll/zoom)
    if (state.lockedAxis === 'y') return;

    // Εδώ είμαστε σε οριζόντια χειρονομία
    const delta = dx;

    // Αυστηρά άκρα: στο πρώτο slide μόνο αριστερά, στο δεύτερο μόνο δεξιά
    if (state.index === 0 && delta > 0) {
      slidesEl.style.transform = `translateX(${-state.index * state.width()}px)`;
      return;
    }
    if (state.index === 1 && delta < 0) {
      slidesEl.style.transform = `translateX(${-state.index * state.width()}px)`;
      return;
    }

    const offset = -state.index * state.width() + delta;
    slidesEl.style.transform = `translateX(${offset}px)`;
  };

  const onTouchEnd = () => {
    if (!state.dragging) return;
    state.dragging = false;

    const delta = state.currentX - state.startX;
    // Πιο αυστηρό threshold για να μην αλλάζει εύκολα κατά λάθος
    const threshold = Math.max(140, state.width() * 0.30);

    if (state.lockedAxis === 'x' && Math.abs(delta) > threshold) {
      if (delta < 0) setIndex(state.index + 1);
      else setIndex(state.index - 1);
    } else {
      setIndex(state.index, { animate: true });
    }

    state.lockedAxis = null;
    hideHint();
  };

  // Mouse (desktop) — ίδια αυστηρή λογική
  let mouseDown = false;

  const onMouseDown = (e) => {
    mouseDown = true;
    state.dragging = true;
    state.lockedAxis = 'x'; // στο mouse θεωρούμε άμεσα οριζόντιο drag
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.currentX = e.clientX;
    state.currentY = e.clientY;
    state.startedOnLink = e.target.closest && !!e.target.closest('a, area');
    slidesEl.style.transition = 'none';
  };

  const onMouseMove = (e) => {
    if (!mouseDown || !state.dragging) return;
    if (state.startedOnLink) return;

    state.currentX = e.clientX;
    state.currentY = e.clientY;

    const dx = state.currentX - state.startX;
    const delta = dx;

    // Αυστηρά άκρα
    if (state.index === 0 && delta > 0) {
      slidesEl.style.transform = `translateX(${-state.index * state.width()}px)`;
      return;
    }
    if (state.index === 1 && delta < 0) {
      slidesEl.style.transform = `translateX(${-state.index * state.width()}px)`;
      return;
    }

    const offset = -state.index * state.width() + delta;
    slidesEl.style.transform = `translateX(${offset}px)`;
  };

  const onMouseUp = () => {
    if (!mouseDown) return;
    mouseDown = false;

    const delta = state.currentX - state.startX;
    const threshold = Math.max(140, state.width() * 0.30);

    if (Math.abs(delta) > threshold) {
      if (delta < 0) setIndex(state.index + 1);
      else setIndex(state.index - 1);
    } else {
      setIndex(state.index, { animate: true });
    }

    state.lockedAxis = null;
    hideHint();
  };

  const onMouseLeave = () => {
    if (mouseDown) onMouseUp();
  };

  // Resize/Orientation: επανατοποθέτηση
  const onResize = () => {
    setIndex(state.index, { animate: false });
  };

  // Init
  setIndex(0, { animate: false });

  // Listeners
  slidesEl.addEventListener('touchstart', onTouchStart, { passive: true });
  slidesEl.addEventListener('touchmove', onTouchMove, { passive: true });
  slidesEl.addEventListener('touchend', onTouchEnd);
  slidesEl.addEventListener('touchcancel', onTouchEnd);

  slidesEl.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  slidesEl.addEventListener('mouseleave', onMouseLeave);

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // Hint auto-hide
  setTimeout(hideHint, 4500);
})();