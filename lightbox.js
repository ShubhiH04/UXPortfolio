// Click (or press Enter/Space on) any case study image to view it larger.
(function () {
    const images = document.querySelectorAll('.detail-gallery img, .detail-figure img');
    if (!images.length) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Enlarged image');
    dialog.innerHTML = '<button type="button" class="lightbox-close">Close</button><img alt=""><p></p>';
    document.body.appendChild(dialog);

    const big = dialog.querySelector('img');
    const caption = dialog.querySelector('p');
    const closeBtn = dialog.querySelector('.lightbox-close');

    const open = (img) => {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        const fig = img.closest('figure');
        const cap = fig && fig.querySelector('figcaption');
        caption.textContent = cap ? cap.textContent : '';
        dialog.showModal();
        closeBtn.focus();
    };

    images.forEach((img) => {
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Enlarge image: ' + img.alt);
        img.addEventListener('click', () => open(img));
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(img);
            }
        });
    });

    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
})();