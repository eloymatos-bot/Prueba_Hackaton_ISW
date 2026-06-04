// Animación 1: Contador de clientes (0 → 500)
function animateCounter() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Usar IntersectionObserver para iniciar cuando el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });

        observer.observe(counter);
    });
}

// Animación 2: Aparición de tarjetas al hacer scroll con IntersectionObserver
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('[data-animate-card]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase de animación
                entry.target.classList.add('fade-in-up');
                // Dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Comienza la animación 50px antes
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Inicializar animaciones cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    animateCounter();
    animateCardsOnScroll();
});

