// Navegación móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

// Variables para control del scroll
let scrollTimer;
let lastScrollTop = 0;

// Crear overlay para cerrar menú
let overlay;

if (menuToggle && navMenu) {
    // Crear overlay si no existe
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';
        
        // Cambiar icono
        menuToggle.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
    }
    
    // Función para cerrar menú
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
        
        // Restaurar icono de barras
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Abrir menú');
    }
    
    // Evento para el botón del menú
    menuToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en overlay
    overlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Cerrar menú al hacer scroll (solo en móvil)
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            // Cancelar timer anterior
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            // Cerrar inmediatamente si hay movimiento significativo
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
            
            if (scrollDiff > 10) {
                closeMenu();
            }
            
            lastScrollTop = currentScrollTop;
            
            // También cerrar después de un tiempo si el scroll ha parado
            scrollTimer = setTimeout(function() {
                closeMenu();
            }, 150);
        }
    });
    
    // Cerrar al cambiar orientación del dispositivo
    window.addEventListener('orientationchange', function() {
        if (window.innerWidth <= 768) {
            setTimeout(closeMenu, 100);
        }
    });
    
    // Cerrar al redimensionar (si se pasa de móvil a desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const privacy = document.getElementById('privacy').checked;
        
        if (!name || !email || !phone || !privacy) {
            alert('Por favor, completa todos los campos obligatorios y acepta la política de privacidad.');
            return;
        }
        
        // Simular envío
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular retardo de envío
        setTimeout(() => {
            alert('¡Gracias! Tu solicitud ha sido enviada. Te contactaremos en menos de 24 horas.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll suave al principio del formulario
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        header.style.padding = '1rem 0';
    }
});

// Animación de aparición al hacer scroll
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
document.querySelectorAll('.service-card, .course-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .service-card, .course-card, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Añadir año actual al footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Inicializar tooltips si existen
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
});
// ========== CÓDIGO PARA EL MAPA INTERACTIVO ==========

// Datos de las sedes de la autoescuela
// js/sedes.js - Código para el mapa interactivo

// Datos de las sedes de Autoescuela Tellado (coordenadas reales de Benidorm y Villajoyosa)
const locations = [
    {
        id: 0,
        name: "Tellado Finestrat",
        address: "Av. de Finestrat, 11, 13, 03509 Benidorm, Alicante",
        phone: "+34 634 79 28 63",
        schedule: "L-V: 10:00-14:00, 16:00-20:00",
        coordinates: [38.53238077387538, -0.16909589580226528], // Coordenadas aproximadas de Benidorm
        type: "principal",
        markerColor: "#e74c3c"
    },
    {
        id: 1,
        name: "Tellado Villajoyosa",
        address: "Carrer Cervantes, 49, 03570 La Vila Joiosa, Alicante",
        phone: "+34 682 29 00 92",
        schedule: "L-V: 10:00-14:00, 16:00-20:00",
        coordinates: [38.504823896354715, -0.2371126250695457], // Coordenadas aproximadas de Villajoyosa
        type: "secundaria",
        markerColor: "#3498db"
    },
];

// Variables globales para el mapa
let map = null;
let markers = [];

// Inicializar el mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Autoescuela Tellado - Sección de sedes cargada');
    
    // Inicializar el mapa si existe el elemento
    if (document.getElementById('autoescuelaMap')) {
        // Pequeño retraso para asegurar que el DOM esté completamente cargado
        setTimeout(() => {
            initMap();
            setupLocationSelection();
            setupMapControls();
        }, 500);
    }
});

// Función para inicializar el mapa de Leaflet
function initMap() {
    console.log('Inicializando mapa de Autoescuela Tellado...');
    
    // Verificar si el contenedor del mapa existe
    const mapContainer = document.getElementById('autoescuelaMap');
    if (!mapContainer) {
        console.error('No se encontró el contenedor del mapa');
        return;
    }
    
    // Centrar el mapa en la zona de Benidorm/Villajoyosa
    map = L.map('autoescuelaMap').setView([38.5250, -0.1850], 12);
    
    // Añadir capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Autoescuela Tellado',
        maxZoom: 18,
    }).addTo(map);
    
    // Añadir marcadores para cada sede
    locations.forEach(location => {
        // Crear icono personalizado
        const customIcon = L.divIcon({
            html: `<div style="background-color: ${location.markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${location.id + 1}</div>`,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });
        
        // Crear el marcador
        const marker = L.marker(location.coordinates, { icon: customIcon })
            .addTo(map)
            .bindPopup(createPopupContent(location));
        
        // Almacenar referencia al marcador
        markers.push(marker);
        
        // Evento al hacer clic en el marcador
        marker.on('click', () => {
            setActiveLocation(location.id);
        });
    });
    
    // Ajustar la vista para mostrar todos los marcadores
    setTimeout(() => {
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.2));
        }
    }, 100);
    
    console.log('Mapa inicializado correctamente');
}

// Crear contenido para el popup del marcador
function createPopupContent(location) {
    return `
        <div class="map-popup">
            <h3>${location.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
            <p><i class="fas fa-phone"></i> ${location.phone}</p>
            <p><i class="fas fa-clock"></i> ${location.schedule}</p>
            <p><i class="fas fa-car"></i> ${getLocationTypeText(location.type)}</p>
            <a href="#contacto" style="display: inline-block; margin-top: 10px; padding: 5px 10px; background-color: var(--primary-color); color: white; border-radius: 4px; text-decoration: none;">Contactar</a>
        </div>
    `;
}

// Obtener texto descriptivo para el tipo de sede
function getLocationTypeText(type) {
    switch(type) {
        case 'principal': return 'Sede principal';
        case 'secundaria': return 'Sede secundaria';
        case 'practicas': return 'Centro de prácticas';
        default: return 'Sede';
    }
}

// Configurar la selección de sedes en la barra lateral
function setupLocationSelection() {
    const locationItems = document.querySelectorAll('.location-item');
    
    locationItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Evitar que se active dos veces si se hace clic en el botón
            if (e.target.classList.contains('btn-location-select')) return;
            
            const locationId = parseInt(item.getAttribute('data-location'));
            setActiveLocation(locationId);
        });
        
        // También manejar clics en el botón
        const button = item.querySelector('.btn-location-select');
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que se active el evento del item
                const locationId = parseInt(item.getAttribute('data-location'));
                setActiveLocation(locationId);
            });
        }
    });
}

// Establecer una sede como activa
function setActiveLocation(locationId) {
    console.log('Activando ubicación:', locationId);
    
    // Actualizar elemento activo en la barra lateral
    document.querySelectorAll('.location-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const selectedItem = document.querySelector(`.location-item[data-location="${locationId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        
        // Hacer scroll suave al elemento seleccionado
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Centrar el mapa en la ubicación seleccionada
    const location = locations[locationId];
    if (location && map) {
        map.setView(location.coordinates, 15);
        
        // Abrir el popup del marcador correspondiente
        if (markers[locationId]) {
            markers[locationId].openPopup();
        }
    }
}

// Configurar controles del mapa
function setupMapControls() {
    // Botón "Mi ubicación"
    const btnLocateMe = document.getElementById('btn-locate-me');
    if (btnLocateMe) {
        btnLocateMe.addEventListener('click', () => {
            if (navigator.geolocation) {
                btnLocateMe.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Localizando...';
                btnLocateMe.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userCoords = [position.coords.latitude, position.coords.longitude];
                        map.setView(userCoords, 14);
                        
                        // Añadir marcador para la ubicación del usuario
                        L.marker(userCoords, {
                            icon: L.divIcon({
                                html: '<div style="background-color: #f39c12; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5);"></div>',
                                className: 'user-marker',
                                iconSize: [20, 20],
                                iconAnchor: [10, 20]
                            })
                        })
                        .addTo(map)
                        .bindPopup('<strong>Tu ubicación actual</strong>')
                        .openPopup();
                        
                        // Restaurar botón
                        setTimeout(() => {
                            btnLocateMe.innerHTML = '<i class="fas fa-location-arrow"></i> Mi ubicación';
                            btnLocateMe.disabled = false;
                        }, 1000);
                    },
                    (error) => {
                        alert('No se pudo obtener tu ubicación. Asegúrate de que los permisos de ubicación estén activados.');
                        console.error('Error obteniendo ubicación:', error);
                        
                        // Restaurar botón
                        btnLocateMe.innerHTML = '<i class="fas fa-location-arrow"></i> Mi ubicación';
                        btnLocateMe.disabled = false;
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else {
                alert('Tu navegador no soporta la geolocalización.');
            }
        });
    }
    
    // Botón "Vista general"
    const btnResetView = document.getElementById('btn-reset-view');
    if (btnResetView) {
        btnResetView.addEventListener('click', () => {
            // Ajustar la vista para mostrar todos los marcadores
            if (markers.length > 0) {
                const group = new L.featureGroup(markers);
                map.fitBounds(group.getBounds().pad(0.2));
            } else {
                // Vista por defecto
                map.setView([38.5250, -0.1850], 12);
            }
            
            // Cerrar todos los popups
            markers.forEach(marker => {
                marker.closePopup();
            });
            
            // Quitar la selección de sede activa
            document.querySelectorAll('.location-item').forEach(item => {
                item.classList.remove('active');
            });
        });
    }
}

// Redimensionar el mapa cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }
});

// Función para buscar dirección (opcional)
function searchAddress(address) {
    // Implementación básica - en un caso real usarías un servicio de geocodificación
    console.log('Buscando dirección:', address);
    alert('Función de búsqueda de dirección disponible en versión premium.');
}