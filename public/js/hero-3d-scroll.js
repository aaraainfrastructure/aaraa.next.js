/**
 * Hero 3D Scroll — canvas frame-sequence hero driven by GSAP ScrollTrigger.
 * Usage: <div class="hero-3d-scroll" data-frame-folder="/3d-scroll/commercial/"
 *             data-frame-count="300" data-frame-prefix="ezgif-frame-" data-frame-pad="3">
 */
(function () {
  function pad(num, size) {
    var s = String(num);
    while (s.length < size) s = '0' + s;
    return s;
  }

  function initHero(el) {
    var folder = el.dataset.frameFolder;
    if (!folder) return null;
    var prefix = el.dataset.framePrefix || 'ezgif-frame-';
    var ext = el.dataset.frameExt || '.jpg';
    var count = parseInt(el.dataset.frameCount || '300', 10);
    var padLen = parseInt(el.dataset.framePad || '3', 10);

    var canvas = el.querySelector('.hero-3d-canvas');
    var loaderBar = el.querySelector('.hero-3d-loader .bar');
    if (!canvas) return null;
    var ctx = canvas.getContext('2d');

    var images = new Array(count);
    var loadedCount = 0;
    var currentFrame = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function frameUrl(i) {
      return folder + prefix + pad(i + 1, padLen) + ext;
    }

    function resizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      render();
    }

    function render() {
      var img = images[currentFrame];
      if (!img || !img.complete || !img.naturalWidth) return;
      var cw = canvas.width;
      var ch = canvas.height;
      var iw = img.naturalWidth;
      var ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale;
      var dh = ih * scale;
      var dx = (cw - dw) / 2;
      var dy = 0;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function setFrame(i) {
      var next = Math.max(0, Math.min(count - 1, i));
      if (next === currentFrame && el.classList.contains('is-ready')) return;
      currentFrame = next;
      render();
    }

    var EAGER_COUNT = Math.min(12, count);
    var CONCURRENCY = 4;

    function loadOne(index, onDone) {
      var img = new Image();
      img.decoding = 'async';
      if (index >= EAGER_COUNT) img.fetchPriority = 'low';
      img.onload = img.onerror = function () {
        loadedCount++;
        if (loaderBar) loaderBar.style.width = Math.round((loadedCount / count) * 100) + '%';
        if (index === 0) {
          render();
          el.classList.add('is-ready');
        }
        if (loadedCount >= count) {
          el.classList.add('is-loaded');
        }
        onDone();
      };
      img.src = frameUrl(index);
      images[index] = img;
    }

    function loadBackground(startIndex) {
      var next = startIndex;
      var active = 0;

      function idle(cb) {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(cb, { timeout: 1500 });
        } else {
          setTimeout(cb, 60);
        }
      }

      function pump() {
        while (active < CONCURRENCY && next < count) {
          var index = next++;
          active++;
          /* eslint-disable no-loop-func */
          loadOne(index, function () {
            active--;
            idle(pump);
          });
          /* eslint-enable no-loop-func */
        }
      }

      idle(pump);
    }

    function loadImages() {
      var remaining = EAGER_COUNT;
      if (remaining === 0) {
        loadBackground(0);
        return;
      }
      for (var i = 0; i < EAGER_COUNT; i++) {
        loadOne(i, function () {
          remaining--;
          if (remaining === 0) loadBackground(EAGER_COUNT);
        });
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    loadImages();

    return {
      setFrameByProgress: function (progress) {
        setFrame(Math.round(progress * (count - 1)));
      }
    };
  }

  function boot() {
    var sections = document.querySelectorAll('.hero-3d-scroll[data-frame-folder]');
    if (!sections.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasGsap = !!(window.gsap && window.ScrollTrigger);

    if (hasGsap && window.ScrollTrigger.getAll) {
      window.ScrollTrigger.getAll().forEach(function (st) {
        if (st.trigger && st.trigger.classList && st.trigger.classList.contains('hero-3d-scroll')) {
          st.kill();
        }
      });
    }

    sections.forEach(function (section) {
      var engine = initHero(section);
      if (!engine) return;

      if (reduceMotion || !hasGsap) return;

      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: function (self) {
          engine.setFrameByProgress(self.progress);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
