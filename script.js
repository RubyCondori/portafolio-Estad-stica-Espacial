/* ==================== FUNCIONALIDADES PRINCIPALES ==================== */

/**
 * Abrir PDF en nueva pestaña
 * @param {string} ruta - Ruta relativa al PDF
 */
function abrirPDF(ruta) {
    window.open(ruta, '_blank');
}

/**
 * Descargar PDF
 * @param {string} ruta - Ruta relativa al PDF
 * @param {string} nombre - Nombre del archivo a descargar
 */
function descargarPDF(ruta, nombre) {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* ==================== NAVBAR Y MENÚ HAMBURGUESA ==================== */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll smooth y actualizar nav activa
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

/* ==================== INTERSECTION OBSERVER PARA ANIMACIONES ==================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos con clase fade-in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

/* ==================== EFECTO PARALLAX EN HERO ==================== */

document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const background = document.querySelector('.hero-background');
    
    if (hero && background) {
        const scrollPosition = window.scrollY;
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        
        if (scrollPosition < heroBottom) {
            background.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

/* ==================== HOVER EFFECTS ==================== */

document.addEventListener('DOMContentLoaded', () => {
    // Efecto hover en trabajo cards
    const trabajoCards = document.querySelectorAll('.trabajo-card');
    
    trabajoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efecto hover en perfil cards
    const perfilCards = document.querySelectorAll('.perfil-card');
    
    perfilCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/* ==================== SCROLL SUAVE ==================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== ANIMACIÓN DE NÚMEROS ==================== */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ==================== GESTIÓN DE RUTAS RELATIVAS ==================== */

/**
 * Resolver ruta relativa considerando la ubicación actual
 * @param {string} ruta - Ruta relativa
 * @returns {string} - Ruta resuelta
 */
function resolverRuta(ruta) {
    // Si estamos en raíz (portafolio-est334)
    const currentPath = window.location.pathname;
    
    // En GitHub Pages, la ruta será /portafolio-est334/
    // Mantener rutas relativas simples
    return ruta;
}

/* ==================== DETECCIÓN DE DISPOSITIVO ==================== */

function esDispositivoMovil() {
    return window.innerWidth <= 768;
}

// Escuchar cambios de tamaño
window.addEventListener('resize', () => {
    const esMovil = esDispositivoMovil();
    document.body.classList.toggle('mobile', esMovil);
});

// Inicializar en carga
document.addEventListener('DOMContentLoaded', () => {
    if (esDispositivoMovil()) {
        document.body.classList.add('mobile');
    }
});

/* ==================== COPIAR AL PORTAPAPELES ==================== */

function copiarAlPortapapeles(texto, elemento) {
    navigator.clipboard.writeText(texto).then(() => {
        const textoOriginal = elemento.textContent;
        elemento.textContent = '✓ Copiado!';
        
        setTimeout(() => {
            elemento.textContent = textoOriginal;
        }, 2000);
    });
}

/* ==================== VALIDACIÓN DE FORMULARIOS ==================== */

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* ==================== MODO OSCURO (OPCIONAL) ==================== */

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Restaurar preferencia guardada
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

/* ==================== PRECARGAR IMÁGENES ==================== */

function precargarImagenes(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

/* ==================== LOGGING Y DEBUG ==================== */

// Información de depuración
console.log('%c🎓 Portafolio EST334 Cargado', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cEstudiante: Ruby Aymara Condori Espinoza', 'font-size: 14px; color: #666;');
console.log('%cCódigo: 214419', 'font-size: 14px; color: #ec4899; font-weight: bold;');
console.log('%cCarrera: Ingeniería Estadística e Informática', 'font-size: 14px; color: #666;');

/* ==================== PERFORMANCE ==================== */

// Medir tiempo de carga
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Tiempo de carga: ${pageLoadTime}ms`);
});

/* ==================== ACCESIBILIDAD ==================== */

// Mejorar accesibilidad con teclado
document.addEventListener('keydown', (e) => {
    // ESC para cerrar menú móvil
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

/* ==================== UTILIDADES ==================== */

/**
 * Obtener parámetro de URL
 * @param {string} nombre - Nombre del parámetro
 * @returns {string|null} - Valor del parámetro
 */
function obtenerParametroURL(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

/**
 * Formatear fecha
 * @param {Date} fecha - Objeto Date
 * @returns {string} - Fecha formateada
 */
function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

/**
 * Truncar texto
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} - Texto truncado
 */
function truncarTexto(texto, longitud = 100) {
    return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
}

/* ==================== MANEJO DE ERRORES ==================== */

window.addEventListener('error', (event) => {
    console.error('Error detectado:', event.error);
});

/* ==================== NOTIFICACIONES ==================== */

function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
    const div = document.createElement('div');
    div.className = `notificacion notificacion-${tipo}`;
    div.textContent = mensaje;
    div.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${tipo === 'error' ? '#ef4444' : tipo === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        animation: slideInUp 0.3s ease;
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => div.remove(), 300);
    }, duracion);
}

/* ==================== LAZY LOADING ==================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

/* ==================== INICIALIZACIÓN FINAL ==================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Todas las funcionalidades inicializadas');
});
