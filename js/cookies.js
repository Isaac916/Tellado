// cookies.js

(function() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) return; // Ya aceptado o rechazado

    // Crear banner
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.background = '#B22222'; // Rojo oscuro
    banner.style.color = '#ffffff';
    banner.style.padding = '1.5rem 5%';
    banner.style.display = 'flex';
    banner.style.alignItems = 'center';
    banner.style.justifyContent = 'space-between';
    banner.style.flexWrap = 'wrap';
    banner.style.zIndex = '1001';
    banner.style.fontFamily = "'Montserrat', sans-serif";
    banner.style.opacity = '0';
    banner.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    banner.style.transform = 'translateY(30px)';
    banner.style.borderTop = '4px solid #ffffff';
    banner.style.borderRadius = '10px 10px 0 0';
    
    // Texto del banner
    const textDiv = document.createElement('div');
    textDiv.style.flex = '1';
    textDiv.style.marginRight = '2rem';
    textDiv.innerHTML = `
        <p style="margin:0 0 0.5rem 0;"><strong>🍪 Utilizamos cookies</strong></p>
        <p style="margin:0;">Usamos cookies propias y de terceros para mejorar tu experiencia de navegación. <a href="#" style="color:#ffffff;text-decoration:underline;">Más información</a></p>
    `;

    // Botones
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '1rem';

    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Aceptar';
    Object.assign(acceptBtn.style, {
        padding: '0.8rem 2rem',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontWeight: '600',
        background: '#ffffff',
        color: '#B22222',
        transition: 'all 0.3s',
    });
    acceptBtn.onmouseover = () => acceptBtn.style.transform = 'scale(1.05)';
    acceptBtn.onmouseout = () => acceptBtn.style.transform = 'scale(1)';
    acceptBtn.onclick = acceptCookies;

    const declineBtn = document.createElement('button');
    declineBtn.textContent = 'Rechazar';
    Object.assign(declineBtn.style, {
        padding: '0.8rem 2rem',
        border: '2px solid #ffffff',
        borderRadius: '25px',
        cursor: 'pointer',
        fontWeight: '600',
        background: 'transparent',
        color: '#ffffff',
        transition: 'all 0.3s',
    });
    declineBtn.onmouseover = () => {
        declineBtn.style.background = '#ffffff';
        declineBtn.style.color = '#B22222';
        declineBtn.style.transform = 'scale(1.05)';
    };
    declineBtn.onmouseout = () => {
        declineBtn.style.background = 'transparent';
        declineBtn.style.color = '#ffffff';
        declineBtn.style.transform = 'scale(1)';
    };
    declineBtn.onclick = declineCookies;

    buttonsDiv.appendChild(acceptBtn);
    buttonsDiv.appendChild(declineBtn);

    banner.appendChild(textDiv);
    banner.appendChild(buttonsDiv);
    document.body.appendChild(banner);

    // Mostrar con animación suave
    setTimeout(() => {
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
    }, 500);
})();

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(30px)';
        setTimeout(() => banner.remove(), 600);
    }
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(30px)';
        setTimeout(() => banner.remove(), 600);
    }
}

// Opcional: resetear consentimiento para pruebas
function resetCookiesConsent() {
    localStorage.removeItem('cookieConsent');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'flex';
}
