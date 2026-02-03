// pages.js - Funcionalidades específicas para páginas individuales

// Funcionalidad para todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Navegación activa basada en la página actual
    highlightCurrentPage();
    
    // Inicializar tooltips si existen
    initTooltips();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Manejar formularios específicos de páginas
    initPageForms();
    
    // Pre-llenar campos de formulario si hay datos en sessionStorage
    prefillFormData();
});

// Resaltar la página actual en la navegación
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === '../index.html') ||
            (currentPage.includes('.html') && linkHref.includes(currentPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Inicializar tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    tooltip.style.top = (rect.top + scrollTop - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + scrollLeft + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    
    this._tooltip = tooltip;
    
    // Añadir estilos si no existen
    if (!document.querySelector('#tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            .custom-tooltip {
                position: absolute;
                background-color: var(--dark-color);
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: var(--border-radius);
                font-size: 0.85rem;
                z-index: 10000;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                animation: fadeIn 0.2s ease forwards;
                box-shadow: var(--shadow-md);
            }
            
            .custom-tooltip::before {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border-width: 5px;
                border-style: solid;
                border-color: var(--dark-color) transparent transparent transparent;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideTooltip() {
    if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
    }
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.course-list-card, .permiso-card, .team-member, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar formularios específicos de páginas
function initPageForms() {
    // Formulario de contacto extendido
    const extendedContactForm = document.getElementById('extendedContactForm');
    if (extendedContactForm) {
        extendedContactForm.addEventListener('submit', handleExtendedContactForm);
    }
    
    // Formulario de reserva
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingForm);
    }
    
    // Formulario de presupuesto
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
}

function handleExtendedContactForm(e) {
    e.preventDefault();
    
    // Validación básica
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--danger-color)';
            
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        showNotification('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }
    
    // Simular envío
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Gracias! Tu mensaje ha sido enviado. Te responderemos en menos de 24 horas.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleBookingForm(e) {
    e.preventDefault();
    
    // Validar fecha futura
    const dateInput = this.querySelector('input[type="date"]');
    if (dateInput) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            showNotification('Por favor, selecciona una fecha futura para tu clase.', 'warning');
            dateInput.focus();
            return;
        }
    }
    
    // Simular reserva
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reservando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Reserva confirmada! Te hemos enviado los detalles por email.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleQuoteForm(e) {
    e.preventDefault();
    
    // Simular cálculo de presupuesto
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Mostrar modal con presupuesto simulado
        showQuoteModal();
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showQuoteModal() {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tu Presupuesto Personalizado</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quote-summary">
                    <h4>Resumen del Presupuesto</h4>
                    <div class="quote-details">
                        <div class="quote-item">
                            <span>Curso Intensivo Permiso B</span>
                            <span>€699</span>
                        </div>
                        <div class="quote-item">
                            <span>Clases extra de práctica (5h)</span>
                            <span>€175</span>
                        </div>
                        <div class="quote-item">
                            <span>Material didáctico premium</span>
                            <span>€49</span>
                        </div>
                        <div class="quote-item quote-total">
                            <span>Total</span>
                            <span>€923</span>
                        </div>
                    </div>
                </div>
                <div class="quote-offer">
                    <h4>¡Oferta Especial!</h4>
                    <p>Por contratar hoy, obtienes un <strong>10% de descuento</strong>:</p>
                    <div class="quote-final">
                        <span>Precio final</span>
                        <span class="final-price">€831</span>
                    </div>
                    <p class="offer-note">Esta oferta es válida por 48 horas.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="closeQuote">Cerrar</button>
                <a href="contacto.html" class="btn btn-primary">Contratar ahora</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Añadir estilos si no existen
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .quote-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background-color: white;
                border-radius: var(--border-radius-lg);
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                padding: var(--spacing-lg);
                border-bottom: 1px solid var(--gray-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-family: var(--font-heading);
                font-size: 1.5rem;
                color: var(--dark-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--gray-color);
                line-height: 1;
            }
            
            .modal-body {
                padding: var(--spacing-lg);
            }
            
            .quote-details {
                margin: var(--spacing-md) 0;
            }
            
            .quote-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--gray-light);
            }
            
            .quote-total {
                font-weight: 600;
                border-top: 2px solid var(--dark-color);
                border-bottom: none;
                margin-top: 0.5rem;
                padding-top: 1rem;
            }
            
            .quote-final {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: var(--spacing-md) 0;
                padding: var(--spacing-md);
                background-color: var(--light-color);
                border-radius: var(--border-radius);
            }
            
            .final-price {
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .offer-note {
                font-size: 0.9rem;
                color: var(--gray-color);
                text-align: center;
            }
            
            .modal-footer {
                padding: var(--spacing-lg);
                border-top: 1px solid var(--gray-light);
                display: flex;
                gap: var(--spacing-md);
                justify-content: flex-end;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cerrar modal
    modal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-close') || e.target.id === 'closeQuote') {
            this.remove();
        }
    });
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: white;
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                box-shadow: var(--shadow-xl);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--spacing-md);
                z-index: 10001;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid;
            }
            
            .notification-success {
                border-left-color: var(--success-color);
            }
            
            .notification-error {
                border-left-color: var(--danger-color);
            }
            
            .notification-warning {
                border-left-color: var(--accent-color);
            }
            
            .notification-info {
                border-left-color: var(--primary-color);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                flex-grow: 1;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-success i {
                color: var(--success-color);
            }
            
            .notification-error i {
                color: var(--danger-color);
            }
            
            .notification-warning i {
                color: var(--accent-color);
            }
            
            .notification-info i {
                color: var(--primary-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--gray-color);
                line-height: 1;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Cerrar manualmente
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Pre-llenar datos del formulario
function prefillFormData() {
    const cursoInteres = sessionStorage.getItem('cursoInteres');
    if (cursoInteres) {
        const courseSelect = document.getElementById('course');
        if (courseSelect) {
            const option = courseSelect.querySelector(`option[value="${cursoInteres}"]`);
            if (option) {
                option.selected = true;
            }
        }
        
        // Limpiar storage después de usar
        setTimeout(() => {
            sessionStorage.removeItem('cursoInteres');
        }, 1000);
    }
    
    // Pre-llenar desde URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        const field = document.getElementById(key);
        if (field) {
            field.value = value;
        }
    });
}

// Exportar funciones para uso global
window.PageUtils = {
    showNotification,
    highlightCurrentPage,
    initScrollAnimations
};