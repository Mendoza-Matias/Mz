// Manejo de navegación en barra lateral
document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const backToTop = document.querySelector('.back-to-top');

    // Toggle Sidebar en móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Cerrar sidebar al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Actualizar navegación activa en scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Mostrar/ocultar botón volver arriba
        if (scrollPosition > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Funcionalidad del botón volver arriba
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animaciones de elementos al hacer scroll
    function revealElements() {
        const windowHeight = window.innerHeight;
        const revealElements = document.querySelectorAll('.reveal');

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Manejo del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Aquí iría la lógica para enviar el formulario
            // Por ahora, simulamos el envío

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);

                alert('¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.');
            }, 1500);
        });
    }

    // Añadir clase reveal a elementos
    function addRevealClass() {
        const elements = document.querySelectorAll('.service-card, .skill-item, .stat-item, .pricing-card, .contact-card');
        elements.forEach(element => {
            element.classList.add('reveal');
        });
    }

    // Event Listeners
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', revealElements);
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('active');
        }
    });

    // Inicialización
    updateActiveNav();
    addRevealClass();
    revealElements();

    // Asegurar que la sección activa esté visible al cargar la página
    setTimeout(() => {
        const activeLink = document.querySelector('.sidebar nav ul li a.active');
        if (activeLink) {
            const href = activeLink.getAttribute('href');
            const section = document.querySelector(href);

            if (section) {
                window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }, 300);
});