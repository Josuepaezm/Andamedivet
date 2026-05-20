/**
 * script.js - Ciberseguridad, UX, y Funcionalidad
 */

// Ciberseguridad: Forzar HTTPS si el usuario entra por HTTP
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Funcionalidad: Menú hamburguesa responsivo (UX)
    const menuToggle = document.getElementById("menu-toggle");
    const navContainer = document.getElementById("nav-container");

    if (menuToggle && navContainer) {
        menuToggle.addEventListener("click", () => {
            navContainer.classList.toggle("active");
            
            // Accesibilidad: Notificar a lectores de pantalla (SEO/UX)
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !expanded);
        });

        // Funcionalidad: Cerrar el menú al hacer clic en un enlace (Mobile UX)
        const navLinks = navContainer.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navContainer.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. UX: Animaciones Fade-In al hacer scroll (Intersection Observer)
    // Esto mejora la percepción de calidad del sitio web
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animamos solo una vez para mejor rendimiento
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Funcionalidad / Ciberseguridad menor: 
    // Año dinámico en el footer para evitar que el sitio parezca abandonado (Genera confianza)
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Funcionalidad: Actualizar clase "active" del menú según scroll (Scroll Spy)
    const sections = document.querySelectorAll("section[id]");
    const scrollSpy = () => {
        let current = "";
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset por el sticky header
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        const navLi = document.querySelectorAll(".nav-links li a");
        navLi.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollSpy);
});
