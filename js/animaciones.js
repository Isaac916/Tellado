// animaciones.js - Gestión de animaciones al hacer scroll

document.addEventListener('DOMContentLoaded', function() {
    // Configurar el observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Si es un elemento de timeline, añadir delay basado en su posición
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(document.querySelectorAll('.timeline-item')).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                // Si es un elemento de transporte, añadir delay
                if (entry.target.classList.contains('transport-option')) {
                    const index = Array.from(document.querySelectorAll('.transport-option')).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animar en Sobre Nosotros
    const sobreNosotrosElements = document.querySelectorAll(
        '.timeline-item, .value-card, .team-member, .facility-card, .stat-item'
    );
    
    // Observar elementos para animar en Contacto
    const contactoElements = document.querySelectorAll(
        '.contact-method-card, .location-card, .map-placeholder, .map-info, ' +
        '.transport-option, .sidebar-card, .faq-item'
    );

    // Aplicar animaciones a todos los elementos
    [...sobreNosotrosElements, ...contactoElements].forEach(el => {
        if (el) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        }
    });

    // Inicializar FAQ si existe
    initFAQ();
});

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Cerrar otros items abiertos
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.querySelector('.faq-answer').style.maxHeight = null;
                        item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Alternar item actual
                faqItem.classList.toggle('active');
                
                if (faqItem.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }
}

// Exportar para uso global
window.Animaciones = {
    initFAQ: initFAQ
};