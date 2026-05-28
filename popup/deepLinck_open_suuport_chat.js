//quin win
(function() {
    function checkChatTrigger() {
        // Перевіряємо, чи поточний URL містить наш хеш-тег
        if (window.location.hash.indexOf('open_chat') !== -1) {
            
            // Намагаємося відкрити Freshchat з інтервалом, поки віджет не завантажиться
            var chatInterval = setInterval(function() {
                if (typeof window.fcWidget !== 'undefined' && typeof window.fcWidget.open === 'function') {
                    window.fcWidget.open();
                    clearInterval(chatInterval);
                    
                    // Красиво прибираємо решітку з URL, щоб користувач залишався на тій же сторінці
                    var cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
                    window.history.replaceState({path: cleanUrl}, '', cleanUrl);
                }
            }, 200);
            
            // Запобіжник: зупиняємо пошук через 7 секунд
            setTimeout(function() { clearInterval(chatInterval); }, 7000);
        }
    }

    // Постійно стежимо за зміною хешу в браузері (коли користувач тисне на кнопку в попапі)
    window.addEventListener('hashchange', checkChatTrigger);
    
    // Перевіряємо також при первинному завантаженні сторінки
    checkChatTrigger();
})();

//rocket play
(function() {
    function checkUniversalChatTrigger() {
        // Перевіряємо, чи в URL з'явився наш хеш
        if (window.location.hash.indexOf('open_chat') !== -1) {
            
            var lookupInterval = setInterval(function() {
                var opened = false;

                // СПОСІБ 1: Прямий виклик Freshchat (працює всюди, де є віджет, незалежно від кнопок)
                if (typeof window.fcWidget !== 'undefined' && typeof window.fcWidget.open === 'function') {
                    window.fcWidget.open();
                    opened = true;
                }

                // СПОСІБ 2: Якщо перший спосіб не пройшов, шукаємо ВСІ можливі кнопки сапорту на сайті
                if (!opened) {
                    // Збираємо до купи селектори з усіх твоїх сторінок
                    var supportElements = document.querySelectorAll(
                        '.user-buttons__support, .user-buttons__support button, .support-widget button.fe-button, [class*="support"]'
                    );

                    if (supportElements.length > 0) {
                        supportElements.forEach(function(el) {
                            if (typeof el.click === 'function') {
                                el.click(); // Імітуємо клік по кожній знайденій кнопці
                            }
                        });
                        opened = true;
                    }
                }

                // Якщо чат успішно викликано одним із способів
                if (opened) {
                    clearInterval(lookupInterval); // Зупиняємо пошук
                    
                    // Безпечно прибираємо решітку з URL (адаптовано під Vue.js)
                    setTimeout(function() {
                        if (typeof window.history.replaceState === 'function') {
                            history.replaceState(null, document.title, window.location.pathname + window.location.search);
                        } else {
                            window.location.hash = '';
                        }
                    }, 150);
                }
            }, 250);
            
            // Запобіжник: припиняємо мучити сторінку через 8 секунд, якщо нічого не знайшли
            setTimeout(function() { clearInterval(lookupInterval); }, 8000);
        }
    }

    // Стежимо за появою #open_chat
    window.addEventListener('hashchange', checkUniversalChatTrigger);
    
    // Перевіряємо при першому завантаженні сторінки
    checkUniversalChatTrigger();
})();