/* ================================================================
   EVEREST GLOBAL 360 - JavaScript Principal
   ================================================================
   Archivo: static/js/main.js
   Descripción: Lógica interactiva del sitio web.
   
   CONTENIDOS:
   1. Menú Hamburguesa (toggle, overlay, cierre)
   2. Header Scroll Effect
   3. Carrusel de Imágenes (prev, next, indicadores, autoplay)
   4. Scroll Reveal (animaciones al hacer scroll)
   ================================================================ */


document.addEventListener('DOMContentLoaded', function () {

    /* ============================================================
       1. MENÚ HAMBURGUESA
       ============================================================
       Controla la apertura/cierre del menú móvil con animación.
       - Click en hamburguesa → toggle menú
       - Click en overlay → cerrar menú
       - Click en enlace del nav → cerrar menú
       - Bloquea el scroll del body cuando el menú está abierto
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    /**
     * Alterna el estado del menú hamburguesa.
     * Añade/quita la clase 'active' en hamburguesa, menú y overlay.
     * Bloquea/desbloquea el scroll del body.
     */
    function toggleMenu() {
        const isOpen = navMenu.classList.contains('active');

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');

        // Bloquear scroll cuando el menú está abierto
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    /**
     * Cierra el menú hamburguesa si está abierto.
     */
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Evento: click en botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Evento: click en overlay oscuro → cerrar menú
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Evento: click en cualquier enlace del nav → cerrar menú
    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    // Evento: tecla Escape → cerrar menú
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });


    /* ============================================================
       2. HEADER SCROLL EFFECT
       ============================================================
       Añade la clase 'scrolled' al header cuando el usuario
       hace scroll más allá de 50px, cambiando la sombra.
       ============================================================ */
    const header = document.getElementById('mainHeader');

    if (header) {
        /**
         * Verifica la posición de scroll y actualiza la clase del header.
         */
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Usar passive para mejor rendimiento
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Ejecutar una vez al cargar (por si la página carga ya scrolleada)
        handleScroll();
    }


    /* ============================================================
       3. CARRUSEL DE IMÁGENES
       ============================================================
       Carrusel con transición crossfade. Funcionalidades:
       - Navegación con flechas prev/next
       - Indicadores clickeables (puntos)
       - Auto-play cada 5 segundos
       - Soporte para touch/swipe en móviles
       - Pausa autoplay al hover (desktop)
       ============================================================ */
    const carouselElement = document.getElementById('heroCarousel');

    if (carouselElement) {
        const slides = carouselElement.querySelectorAll('.carousel-slide');
        const indicators = carouselElement.querySelectorAll('.carousel-indicators button');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        let currentSlide = 0;
        let autoplayInterval = null;
        const AUTOPLAY_DELAY = 5000; // 5 segundos

        /**
         * Cambia a la diapositiva indicada por el índice.
         * Maneja el loop (circular) automáticamente.
         * @param {number} index - Índice de la diapositiva destino
         */
        function goToSlide(index) {
            // Quitar clase active de la diapositiva actual
            slides[currentSlide].classList.remove('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.remove('active');
            }

            // Calcular nuevo índice (loop circular)
            currentSlide = ((index % slides.length) + slides.length) % slides.length;

            // Activar nueva diapositiva
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        }

        /**
         * Avanza a la siguiente diapositiva.
         */
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        /**
         * Retrocede a la diapositiva anterior.
         */
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        /**
         * Inicia el auto-play del carrusel.
         */
        function startAutoplay() {
            stopAutoplay(); // Limpiar intervalo anterior si existe
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        }

        /**
         * Detiene el auto-play del carrusel.
         */
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        /**
         * Reinicia el temporizador del auto-play.
         * Se usa después de una interacción manual.
         */
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // --- Event Listeners: Flechas ---
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prevSlide();
                resetAutoplay();
            });
        }

        // --- Event Listeners: Indicadores (puntos) ---
        indicators.forEach(function (indicator, index) {
            indicator.addEventListener('click', function () {
                goToSlide(index);
                resetAutoplay();
            });
        });

        // --- Event Listeners: Touch/Swipe (móviles) ---
        let touchStartX = 0;
        let touchEndX = 0;
        const SWIPE_THRESHOLD = 50; // Mínimo de pixels para considerar swipe

        carouselElement.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselElement.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0) {
                    // Swipe izquierda → siguiente
                    nextSlide();
                } else {
                    // Swipe derecha → anterior
                    prevSlide();
                }
                resetAutoplay();
            }
        }, { passive: true });

        // --- Event Listeners: Pausa al hover (desktop) ---
        carouselElement.addEventListener('mouseenter', stopAutoplay);
        carouselElement.addEventListener('mouseleave', startAutoplay);

        // --- Event Listener: Teclado (accesibilidad) ---
        document.addEventListener('keydown', function (e) {
            // Solo si el carrusel está visible en viewport
            const rect = carouselElement.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetAutoplay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetAutoplay();
                }
            }
        });

        // --- Iniciar autoplay ---
        startAutoplay();

        // --- Pausar autoplay si la pestaña no está visible ---
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });
    }


    /* ============================================================
       4. SCROLL REVEAL (ANIMACIONES AL SCROLL)
       ============================================================
       Utiliza IntersectionObserver para detectar cuándo los
       elementos con clase '.fade-in-up' entran al viewport
       y les añade la clase 'visible' para activar la animación.
       ============================================================ */
    const fadeElements = document.querySelectorAll('.fade-in-up');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,         // Se activa cuando 10% del elemento es visible
            rootMargin: '0px 0px -50px 0px'  // Margen inferior de 50px
        };

        const scrollObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Dejar de observar una vez animado (mejor rendimiento)
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar todos los elementos con la clase
        fadeElements.forEach(function (el) {
            scrollObserver.observe(el);
        });
    } else {
        // Fallback: si no hay soporte para IntersectionObserver,
        // mostrar todos los elementos directamente
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

});
