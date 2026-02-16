// JavaScript para 3 carruseles independientes en horizontal
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar TODOS los carruseles dentro de facilities-section
    const carruseles = document.querySelectorAll('.facilities-section .carousel-modern');
    
    // Intervalo más lento: 8 segundos (8000ms)
    const intervalTime = 8000;
    
    // Inicializar cada carrusel por separado
    carruseles.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const indicators = carousel.querySelectorAll('.indicator');
        
        if (!track || !slides.length) return;
        
        let currentIndex = 0;
        let slideInterval;
        let isTransitioning = false;
        
        // Función para actualizar la posición del carrusel
        function updateCarousel(index) {
            if (isTransitioning) return; // Evita múltiples clics durante la transición
            
            // Asegurar índice válido
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            isTransitioning = true;
            
            // Mover el track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, i) => {
                if (i === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // Resetear flag después de la transición
            setTimeout(() => {
                isTransitioning = false;
            }, 800); // Mismo tiempo que la transición CSS
        }
        
        // Función para iniciar el auto-slide
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                updateCarousel(currentIndex + 1);
            }, intervalTime);
        }
        
        // Función para reiniciar el intervalo
        function resetInterval() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        // Event listeners para botones
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isTransitioning) {
                    updateCarousel(currentIndex - 1);
                    resetInterval();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isTransitioning) {
                    updateCarousel(currentIndex + 1);
                    resetInterval();
                }
            });
        }
        
        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isTransitioning && index !== currentIndex) {
                    updateCarousel(index);
                    resetInterval();
                }
            });
        });
        
        // Pausar al hacer hover sobre el carrusel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Soporte para touch en móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe izquierda -> siguiente
                updateCarousel(currentIndex + 1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe derecha -> anterior
                updateCarousel(currentIndex - 1);
            }
        }
        
        // Inicializar
        updateCarousel(0);
        startAutoSlide();
    });
    
    // Añadir soporte para teclado (opcional)
    document.addEventListener('keydown', (e) => {
        // Solo si el mouse no está sobre un carrusel
        const activeCarousel = document.querySelector('.facilities-section .carousel-category:hover');
        if (!activeCarousel) return;
        
        const carousel = activeCarousel.querySelector('.carousel-modern');
        if (!carousel) return;
        
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevBtn?.click();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextBtn?.click();
        }
    });
});