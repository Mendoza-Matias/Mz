/**
 * Archivo JavaScript principal para la Agencia Digital Axios
 * Contiene funcionalidades interactivas para la página web
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // ========== VARIABLES (en español como solicitado) ==========
    const barraNavegacion = document.querySelector('.navbar');
    const menuNavegacion = document.querySelector('.menu');
    const botonAlternar = document.querySelector('.toggle-btn');
    const botonVolverArriba = document.getElementById('btn-volver-arriba');
    const enlacesNavegacion = document.querySelectorAll('.menu li a');
    const secciones = document.querySelectorAll('section');
    const elementosAnimados = document.querySelectorAll('[data-aos]');
    const formularioContacto = document.querySelector('.formulario-contacto');
    
    // ========== FUNCIONES ==========
    
    /**
     * Alterna el menú de navegación en dispositivos móviles
     */
    function alternarMenu() {
        // Agregar o quitar la clase 'active' para mostrar/ocultar el menú
        menuNavegacion.classList.toggle('active');
    }
    
    /**
     * Muestra u oculta el botón de volver arriba según la posición del scroll
     */
    function mostrarBotonVolverArriba() {
        // Si el usuario ha desplazado más de 300px, mostrar el botón
        if (window.scrollY > 300) {
            botonVolverArriba.classList.add('visible');
        } else {
            botonVolverArriba.classList.remove('visible');
        }
    }
    
    /**
     * Desplaza la página hasta la parte superior de forma suave
     */
    function volverArriba() {
        // Usar scrollTo con comportamiento suave para una mejor experiencia
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    /**
     * Actualiza la clase 'active' en los enlaces de navegación según la sección visible
     */
    function actualizarNavegacionActiva() {
        // Obtener la posición actual del scroll con un pequeño offset
        const posicionScroll = window.scrollY + 100;
        
        // Revisar cada sección para ver cuál está actualmente visible
        secciones.forEach(seccion => {
            const alturaSuperior = seccion.offsetTop;
            const alturaSeccion = seccion.offsetHeight;
            const idSeccion = seccion.getAttribute('id');
            
            // Si la posición actual está dentro de esta sección
            if (posicionScroll >= alturaSuperior && posicionScroll < alturaSuperior + alturaSeccion) {
                // Quitar la clase 'active' de todos los enlaces
                enlacesNavegacion.forEach(enlace => {
                    enlace.classList.remove('active');
                });
                
                // Agregar la clase 'active' al enlace correspondiente a esta sección
                const enlaceActivo = document.querySelector(`.menu li a[href="#${idSeccion}"]`);
                if (enlaceActivo) {
                    enlaceActivo.classList.add('active');
                }
            }
        });
    }
    
    /**
     * Anima los elementos cuando son visibles en el viewport
     */
    function animarElementosVisibles() {
        elementosAnimados.forEach(elemento => {
            // Calcular si el elemento está visible en la pantalla
            const posicionElemento = elemento.getBoundingClientRect();
            const estaVisible = 
                posicionElemento.top <= window.innerHeight * 0.85 && 
                posicionElemento.bottom >= 0;
            
            // Si el elemento es visible, añadir la clase para animarlo
            if (estaVisible) {
                elemento.classList.add('aos-animate');
            }
        });
    }
    
    /**
     * Maneja el envío del formulario de contacto
     * @param {Event} evento - El evento de envío del formulario
     */
    function manejarEnvioFormulario(evento) {
        // Prevenir el comportamiento por defecto del formulario
        evento.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar que los campos requeridos estén completos
        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa los campos obligatorios: Nombre, Email y Mensaje.');
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario a un servidor
        // Por ahora, solo mostraremos un mensaje de éxito
        alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
        
        // Resetear el formulario
        formularioContacto.reset();
    }
    
    // ========== EVENT LISTENERS ==========
    
    // Alternar la navegación lateral al hacer clic en el botón
    botonAlternar.addEventListener('click', alternarMenu);
    
    // Mostrar/ocultar el botón de volver arriba al hacer scroll
    window.addEventListener('scroll', mostrarBotonVolverArriba);
    
    // Volver arriba al hacer clic en el botón correspondiente
    botonVolverArriba.addEventListener('click', volverArriba);
    
    // Actualizar la navegación activa al hacer scroll
    window.addEventListener('scroll', actualizarNavegacionActiva);
    
    // Animar elementos al hacer scroll
    window.addEventListener('scroll', animarElementosVisibles);
    
    // Manejar el envío del formulario de contacto
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', manejarEnvioFormulario);
    }
    
    // ========== INICIALIZACIÓN ==========
    
    // Añadir smooth scroll a todos los enlaces internos
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Prevenir comportamiento predeterminado
            e.preventDefault();
            
            // Obtener el destino desde el atributo href
            const destino = document.querySelector(this.getAttribute('href'));
            
            // Si el menú está abierto en móviles, cerrarlo
            if (window.innerWidth <= 768 && menuNavegacion.classList.contains('active')) {
                alternarMenu();
            }
            
            // Calcular el offset para tener en cuenta la altura de la navbar fija
            const alturaNavbar = barraNavegacion.offsetHeight;
            
            // Desplazar suavemente a la sección de destino
            if (destino) {
                window.scrollTo({
                    top: destino.offsetTop - alturaNavbar,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar las animaciones para los elementos que ya son visibles al cargar
    animarElementosVisibles();
    
    // Inicializar la navegación activa
    actualizarNavegacionActiva();

    // ========== FUNCIONALIDADES ADICIONALES ==========
    
    /**
     * Animación de contador para secciones de estadísticas
     * Nota: Esta función está preparada pero no se usa en el HTML actual
     * Se puede agregar una sección de estadísticas si se desea usar
     */
    function iniciarContadores() {
        const contadores = document.querySelectorAll('.contador');
        
        contadores.forEach(contador => {
            const valorObjetivo = parseInt(contador.getAttribute('data-valor'));
            let valorActual = 0;
            const incremento = valorObjetivo / 100;
            const duracion = 2000; // 2 segundos
            const intervalo = duracion / 100;
            
            const actualizarContador = setInterval(() => {
                valorActual += incremento;
                if (valorActual >= valorObjetivo) {
                    contador.textContent = valorObjetivo;
                    clearInterval(actualizarContador);
                } else {
                    contador.textContent = Math.floor(valorActual);
                }
            }, intervalo);
        });
    }
    
    /**
     * Activar efectos de hover en tarjetas de servicios
     */
    const tarjetasServicio = document.querySelectorAll('.tarjeta-servicio');
    
    tarjetasServicio.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.transform = 'translateY(-10px)';
            tarjeta.style.borderBottom = '4px solid var(--primary-color)';
        });
        
        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = '';
            tarjeta.style.borderBottom = '4px solid transparent';
        });
    });
    
    /**
     * Efecto de escritura para el texto del héroe
     * Nota: Esta función está preparada pero no se usa en el HTML actual
     * Se puede modificar el HTML para usar este efecto si se desea
     */
    function iniciarEfectoEscritura() {
        const textoTipiado = document.querySelector('.texto-tipiado');
        if (!textoTipiado) return;
        
        const frases = JSON.parse(textoTipiado.getAttribute('data-frases'));
        let fraseActual = 0;
        let indiceLetra = 0;
        let estaBorrando = false;
        let textoActual = '';
        
        function tipiar() {
            if (fraseActual < frases.length) {
                const frase = frases[fraseActual];
                
                // Si estamos borrando, reducir el texto
                if (estaBorrando) {
                    textoActual = frase.substring(0, indiceLetra - 1);
                    indiceLetra--;
                } else {
                    // Si estamos escribiendo, aumentar el texto
                    textoActual = frase.substring(0, indiceLetra + 1);
                    indiceLetra++;
                }
                
                textoTipiado.textContent = textoActual;
                
                // Si completamos la escritura, comenzar a borrar después de un retraso
                if (!estaBorrando && indiceLetra === frase.length) {
                    estaBorrando = true;
                    // Esperar antes de comenzar a borrar
                    setTimeout(tipiar, 1500);
                    return;
                }
                
                // Si terminamos de borrar, pasar a la siguiente frase
                if (estaBorrando && indiceLetra === 0) {
                    estaBorrando = false;
                    fraseActual = (fraseActual + 1) % frases.length;
                }
                
                // Establecer la velocidad (más rápido al borrar)
                const velocidad = estaBorrando ? 50 : 100;
                setTimeout(tipiar, velocidad);
            }
        }
        
        // Iniciar el efecto
        setTimeout(tipiar, 1000);
    }
});