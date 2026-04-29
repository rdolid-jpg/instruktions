<script>
  (function() {
    // Значення нижче за z-index вашого модального вікна
    var LOW_Z = '8889';

    // Перевіряємо, чи відкрита модалка
    try {
      var modal = parent.document.querySelector('.modal');
      if (modal && window.getComputedStyle(modal).display !== 'none') {
        // Модалка відкрита — опускаємо попап
        var iframe = parent.document.querySelector('.__btgPromoHolder');
        if (iframe) {
          iframe.style.setProperty('z-index', LOW_Z);
        }
      }
    } catch (e) {}
    // Якщо модалка закрита — нічого не робимо, попап залишається зі стандартним z-index
  })();
</script>