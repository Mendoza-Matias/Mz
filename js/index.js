document.addEventListener('DOMContentLoaded', () => {
    // ========== VARIABLES ==========
    const barraNavegacion = document.querySelector('.navbar');
    const menuNavegacion = document.querySelector('.menu');
    const botonAlternar = document.querySelector('.toggle-btn');
    const botonVolverArriba = document.getElementById('btn-volver-arriba');
    const enlacesNavegacion = document.querySelectorAll('.menu li a');
    const secciones = document.querySelectorAll('section');
    const elementosAnimados = document.querySelectorAll('[data-aos]');
    const formularioContacto = document.querySelector('.formulario-contacto');

    // ========== FUNCIONES ==========

    const alternarMenu = (menu) => menu.classList.toggle('active');

    const mostrarBotonVolverArriba = () => {
        botonVolverArriba.classList.toggle('visible', window.scrollY > 300);
    };

    const volverArriba = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const actualizarNavegacionActiva = () => {
        const posicionScroll = window.scrollY + 100;

        secciones.forEach(seccion => {
            const { offsetTop, offsetHeight, id } = seccion;

            if (posicionScroll >= offsetTop && posicionScroll < offsetTop + offsetHeight) {
                enlacesNavegacion.forEach(e => e.classList.remove('active'));
                const enlaceActivo = document.querySelector(`.menu li a[href="#${id}"]`);
                if (enlaceActivo) enlaceActivo.classList.add('active');
            }
        });
    };

    const manejarEnvioFormulario = (evento) => {
        evento.preventDefault();
        const datos = new FormData(formularioContacto);

        if (!datos.get('nombre') || !datos.get('email') || !datos.get('mensaje')) {
            alert('Por favor, completa los campos obligatorios: Nombre, Email y Mensaje.');
            return;
        }

        alert('¡Gracias por contactarnos!');
        formularioContacto.reset();
    };

    const iniciarEfectoEscritura = () => {
        const textoTipiado = document.querySelector('.texto-tipiado');
        if (!textoTipiado) return;

        const frases = JSON.parse(textoTipiado.getAttribute('data-frases'));
        let fraseActual = 0, indiceLetra = 0, estaBorrando = false, textoActual = '';

        const tipiar = () => {
            const frase = frases[fraseActual];
            textoActual = estaBorrando
                ? frase.substring(0, indiceLetra--)
                : frase.substring(0, ++indiceLetra);

            textoTipiado.textContent = textoActual;

            if (!estaBorrando && indiceLetra === frase.length) {
                estaBorrando = true;
                setTimeout(tipiar, 1500);
                return;
            }

            if (estaBorrando && indiceLetra === 0) {
                estaBorrando = false;
                fraseActual = (fraseActual + 1) % frases.length;
            }

            setTimeout(tipiar, estaBorrando ? 50 : 100);
        };

        setTimeout(tipiar, 1000);
    };

    // ========== OBSERVER PARA ANIMACIONES ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.15 });

    elementosAnimados.forEach(el => observer.observe(el));

    // ========== EVENT LISTENERS ==========

    botonAlternar.addEventListener('click', () => alternarMenu(menuNavegacion));
    botonVolverArriba.addEventListener('click', volverArriba);
    if (formularioContacto) formularioContacto.addEventListener('submit', manejarEnvioFormulario);

    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            const destino = document.querySelector(enlace.getAttribute('href'));
            if (window.innerWidth <= 768 && menuNavegacion.classList.contains('active')) alternarMenu(menuNavegacion);
            if (destino) {
                window.scrollTo({
                    top: destino.offsetTop - barraNavegacion.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        mostrarBotonVolverArriba();
        actualizarNavegacionActiva();
    });

    // ========== EFECTOS INICIALES ==========
    actualizarNavegacionActiva();
    iniciarEfectoEscritura();
});
