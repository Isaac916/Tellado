// Filtro de permisos
document.addEventListener('DOMContentLoaded', function() {
    // Filtro de permisos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const licenseCards = document.querySelectorAll('.license-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar tarjetas
            licenseCards.forEach(card => {
                if (filterValue === 'todos') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
            
            // Ajustar la grilla después de filtrar
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.license-card:not(.hidden)');
                if (visibleCards.length === 1) {
                    document.querySelector('.licenses-grid').style.justifyContent = 'center';
                } else {
                    document.querySelector('.licenses-grid').style.justifyContent = 'flex-start';
                }
            }, 300);
        });
    });
    
    // Tabs de vehículos (mantén el código existente)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Ocultar todos los paneles
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Mostrar el panel correspondiente
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar año del copyright
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
});