/**
 * Sectors 3D Scroll — chained multi-sector canvas frame-sequence carousel.
 * One pinned viewport plays each sector's 300-frame sequence in place as
 * the user scrolls, then slides the next sector in from the right.
 * Pinning uses GSAP ScrollTrigger's native pin:true (not CSS sticky) so it
 * stays robust alongside this page's other independent ScrollTrigger
 * animations.
 */
(function () {
  function pad(num, size) {
    var s = String(num);
    while (s.length < size) s = '0' + s;
    return s;
  }

  function initSlide(slideEl) {
    var folder = slideEl.dataset.frameFolder;
    var prefix = slideEl.dataset.framePrefix || 'ezgif-frame-';
    var ext = slideEl.dataset.frameExt || '.jpg';
    var count = parseInt(slideEl.dataset.frameCount || '300', 10);
    var padLen = parseInt(slideEl.dataset.framePad || '3', 10);
    var canvas = slideEl.querySelector('.sectors-3d-canvas');
    var ctx = canvas.getContext('2d');
    var images = new Array(count);
    var currentFrame = -1;
    var loadedCount = 0;

    function frameUrl(i) { return folder + prefix + pad(i + 1, padLen) + ext; }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      render();
    }

    function render() {
      var img = images[currentFrame];
      if (!img || !img.complete || !img.naturalWidth) return;
      var cw = canvas.width, ch = canvas.height;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale, dh = ih * scale;
      var dx = (cw - dw) / 2, dy = 0;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function setFrame(i) {
      var next = Math.max(0, Math.min(count - 1, i));
      if (next === currentFrame) return;
      currentFrame = next;
      render();
    }

    function loadOne(index, cb) {
      if (images[index]) { cb(); return; }
      var img = new Image();
      img.decoding = 'async';
      if (index > 0) img.fetchPriority = 'low';
      img.onload = img.onerror = function () {
        loadedCount++;
        if (index === currentFrame) render();
        cb();
      };
      img.src = frameUrl(index);
      images[index] = img;
    }

    function loadRange(start, end, done) {
      var remaining = Math.max(0, end - start);
      if (remaining === 0) { if (done) done(); return; }
      for (var k = start; k < end; k++) {
        loadOne(k, function () { if (--remaining === 0 && done) done(); });
      }
    }

    function loadBackground(startIndex, onProgress) {
      var next = startIndex;
      function idle(cb) {
        if (window.requestIdleCallback) window.requestIdleCallback(cb, {timeout: 1500});
        else setTimeout(cb, 60);
      }
      function pump() {
        if (next >= count) return;
        var index = next++;
        loadOne(index, function () {
          if (onProgress) onProgress(loadedCount, count);
          idle(pump);
        });
      }
      idle(pump);
    }

    window.addEventListener('resize', resize);
    resize();

    return {
      count: count,
      setFrameByProgress: function (progress) { setFrame(Math.round(progress * (count - 1))); },
      loadEager: function (n, done) { loadRange(0, Math.min(n, count), done); },
      loadRest: function (onProgress) { loadBackground(0, onProgress); },
      resize: resize
    };
  }

  function boot() {
    var section = document.querySelector('.sectors-3d-scroll');
    if (!section) return;
    var pinEl = section.querySelector('.sectors-3d-pin');
    var slideEls = Array.prototype.slice.call(section.querySelectorAll('.sectors-3d-slide'));
    if (!slideEls.length || !pinEl) return;

    var caption = section.querySelector('.sectors-3d-caption-label');
    var dots = Array.prototype.slice.call(section.querySelectorAll('.sectors-3d-dots .dot'));
    var nextBtn = section.querySelector('.sectors-3d-next');
    var loaderWrap = section.querySelector('.sectors-3d-loader');
    var loaderBar = section.querySelector('.sectors-3d-loader .bar');

    var engines = slideEls.map(initSlide);
    var N = slideEls.length;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasGsap = !!(window.gsap && window.ScrollTrigger);
    var started = false;
    var lastProgress = 0;
    var st = null;

    function setActiveLabel(i) {
      if (caption) caption.textContent = slideEls[i].dataset.sectorLabel || '';
      dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
    }

    function startLoading() {
      if (started) return;
      started = true;
      function loadNext(i) {
        if (i >= N) { if (loaderWrap) loaderWrap.style.display = 'none'; return; }
        engines[i].loadEager(10, function () {
          if (i === 0) section.classList.add('is-ready');
          engines[i].loadRest(function (loaded, count) {
            if (loaderBar) {
              var overall = ((i + loaded / count) / N) * 100;
              loaderBar.style.width = Math.min(100, overall) + '%';
            }
          });
          loadNext(i + 1);
        });
      }
      loadNext(0);
    }

    function update(progress) {
      lastProgress = progress;
      var scaled = progress * N;
      var i = Math.min(N - 1, Math.floor(scaled));
      var local = scaled - i;
      var isLast = i === N - 1;
      var scrubPortion = isLast ? 1 : 0.75;

      slideEls.forEach(function (el, idx) {
        if (idx < i) el.style.transform = 'translateX(-100%)';
        else if (idx > i + 1) el.style.transform = 'translateX(100%)';
      });

      if (local < scrubPortion) {
        engines[i].setFrameByProgress(local / scrubPortion);
        slideEls[i].style.transform = 'translateX(0%)';
        if (slideEls[i + 1]) slideEls[i + 1].style.transform = 'translateX(100%)';
        setActiveLabel(i);
      } else {
        var t = (local - scrubPortion) / (1 - scrubPortion);
        engines[i].setFrameByProgress(1);
        slideEls[i].style.transform = 'translateX(' + (-100 * t) + '%)';
        if (slideEls[i + 1]) {
          engines[i + 1].setFrameByProgress(0);
          slideEls[i + 1].style.transform = 'translateX(' + (100 * (1 - t)) + '%)';
        }
        setActiveLabel(t > 0.5 && i + 1 < N ? i + 1 : i);
      }
    }

    setActiveLabel(0);

    if (reduceMotion || !hasGsap) {
      startLoading();
      engines[0].setFrameByProgress(0);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { startLoading(); io.disconnect(); }
      });
    }, {rootMargin: '800px 0px'});
    io.observe(section);

    window.gsap.registerPlugin(window.ScrollTrigger);

    var scrollDistance = Math.max(window.innerHeight * N, 600 * N);

    st = window.ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=' + scrollDistance,
      pin: pinEl,
      pinSpacing: true,
      scrub: 0.2,
      onUpdate: function (self) { update(self.progress); }
    });

    update(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!st) return;
        var current = Math.min(N - 1, Math.floor(lastProgress * N));
        var targetIndex = Math.min(N - 1, current + 1);
        var targetProgress = targetIndex >= N - 1 ? 1 : (targetIndex + 0.02) / N;
        var targetY = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({top: targetY, behavior: 'smooth'});
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
