/**
 * Храм Иверской иконы — общие скрипты
 */
(function () {
    'use strict';

    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    function onImageError(img) {
        img.style.display = 'none';
        var wrap = img.closest('.cleric-photo-wrap');
        if (wrap) {
            var fallback = document.createElement('span');
            fallback.className = 'cleric-photo-fallback';
            fallback.setAttribute('aria-hidden', 'true');
            fallback.textContent = img.alt || 'Фото';
            wrap.appendChild(fallback);
        }
    }
    document.querySelectorAll('.cleric-photo, .history-img, .gallery-img, .main-school-img').forEach(function (img) {
        if (img.complete && img.naturalWidth === 0) onImageError(img);
        else img.addEventListener('error', function () { onImageError(img); });
    });

    var lightboxOverlay = null, lightboxImg = null;
    function getLightbox() {
        if (lightboxOverlay) return lightboxOverlay;
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.setAttribute('role', 'dialog');
        lightboxOverlay.setAttribute('aria-label', 'Увеличить фото');
        lightboxImg = document.createElement('img');
        lightboxImg.alt = '';
        var imgWrap = document.createElement('div');
        imgWrap.className = 'lightbox-img-wrap';
        imgWrap.appendChild(lightboxImg);
        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Закрыть');
        lightboxOverlay.appendChild(imgWrap);
        lightboxOverlay.appendChild(closeBtn);
        document.body.appendChild(lightboxOverlay);
        function closeLightbox() {
            lightboxOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
        lightboxOverlay.addEventListener('click', function (e) {
            if (e.target === lightboxOverlay) closeLightbox();
        });
        imgWrap.addEventListener('click', function (e) { e.stopPropagation(); });
        closeBtn.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('is-open')) closeLightbox();
        });
        return lightboxOverlay;
    }
    document.querySelectorAll('.history-img, .gallery-img, .cleric-photo, .main-school-img').forEach(function (img) {
        img.addEventListener('click', function () {
            var src = this.currentSrc || this.src;
            if (src) {
                getLightbox();
                lightboxImg.src = src;
                lightboxImg.alt = this.alt || 'Фото';
                lightboxOverlay.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    var scrollBtn = document.createElement('button');
    scrollBtn.type = 'button';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'В начало страницы');
    scrollBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(scrollBtn);
    function toggleScrollBtn() {
        scrollBtn.classList.toggle('is-visible', window.pageYOffset > 400);
    }
    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn();
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
