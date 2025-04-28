const services = [
    {
        id: 1,
        icon: 'fas fa-desktop',
        title: 'Diseño y Desarrollo Web',
        items: [
            { id: 1, description: 'Desarrollo de Sitios Web' },
            { id: 2, description: 'Desarrollo APIS' }
        ]
    },
    {
        id: 2,
        icon: 'fas fa-bullhorn',
        title: 'Marketing Digital',
        items: [
            { id: 3, description: 'Social Media Marketing' },
            { id: 4, description: 'Email Marketing' },
            { id: 5, description: 'SEO y Posicionamiento Web' }
        ]
    },
    {
        id: 3,
        icon: 'fas fa-search',
        title: 'Optimización para Buscadores',
        items: [
            { id: 6, description: 'Contenido Optimizado' },
            { id: 7, description: 'Análisis de Competencia' }
        ]
    }
];

const prices = [
    {
        id: 1,
        title: 'Plan Básico',
        items: [
            { id: 1, description: 'Sitio Web Responsive', icon: 'fas fa-check' },
            { id: 2, description: '5 Páginas', icon: 'fas fa-check' },
            { id: 3, description: 'SEO Básico', icon: 'fas fa-check' },
            { id: 4, description: 'Soporte Mensual', icon: 'fas fa-check' },
            { id: 5, description: 'Desarrollo a Medida', icon: 'fas fa-check' }
        ]
    },
    {
        id: 2,
        title: 'Plan Profesional',
        items: [
            { id: 6, description: 'Sitio Web Avanzado', icon: 'fas fa-check' },
            { id: 7, description: '10 Páginas', icon: 'fas fa-check' },
            { id: 8, description: 'SEO Completo', icon: 'fas fa-check' },
            { id: 9, description: 'Soporte Semanal', icon: 'fas fa-check' },
            { id: 10, description: 'Desarrollo a Medida', icon: 'fas fa-check' }
        ]
    },
    {
        id: 3,
        title: 'Plan Empresarial',
        items: [
            { id: 11, description: 'Sitio Web Premium', icon: 'fas fa-check' },
            { id: 12, description: 'Páginas Ilimitadas', icon: 'fas fa-check' },
            { id: 13, description: 'SEO Avanzado', icon: 'fas fa-check' },
            { id: 14, description: 'Soporte 24/7', icon: 'fas fa-check' },
            { id: 15, description: 'Desarrollo a Medida', icon: 'fas fa-check' }
        ]
    }
];

const tecnologies = [
    {
        id: 1,
        icon: 'fab fa-java',
        name: 'Java'
    },
    {
        id: 2,
        icon: 'fab fa-angular',
        name: 'Angular'
    },
    {
        id: 3,
        icon: 'fab fa-html5',
        name: 'Html'
    },
    {
        id: 4,
        icon: 'fab fa-node',
        name: 'Node'
    },
    {
        id: 5,
        icon: 'fab fa-react',
        name: 'React'
    },
    {
        id: 6,
        icon: 'fab fa-python',
        name: 'Python'
    },
    {
        id: 7,
        icon: 'fa-brands fa-golang',
        name: 'Golang'
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const serviciosContainer = document.getElementById('servicios-container');
    const preciosContainer = document.getElementById('precios-container');
    const tecnologiasContainer = document.getElementById('tecnologias-container')

    const crearElementoConHTML = (tag, className, innerHTML = '') => {
        const el = document.createElement(tag);
        el.className = className;
        el.innerHTML = innerHTML;
        return el;
    };

    const cargarServicios = () => {
        services.forEach(servicio => {
            const tarjeta = crearElementoConHTML('div', 'tarjeta-servicio');

            const icono = `<div class="icono-servicio"><i class="${servicio.icon}"></i></div>`;
            const titulo = `<h4>${servicio.title}</h4>`;
            const listaItems = `
                    <ul>
                        ${servicio.items.map(item => `<li><i class="fas fa-check"></i> ${item.description}</li>`).join('')}
                    </ul>
                `;

            tarjeta.innerHTML = `${icono}${titulo}${listaItems}`;
            serviciosContainer.append(tarjeta);
        });
    };

    const cargarPrecios = () => {
        prices.forEach(price => {
            const tarjeta = crearElementoConHTML('div', 'tarjeta-precio');

            const cabecera = `
                    <div class="cabecera-precio">
                        <h3>${price.title}</h3>
                        <!-- <div class="precio">$999<span>/mes</span></div> -->
                    </div>
                `;

            const listaCaracteristicas = `
                    <ul class="caracteristicas">
                        ${price.items.map(item => `<li><i class="${item.icon}"></i> ${item.description}</li>`).join('')}
                    </ul>
                `;

            const boton = `<button class="btn-precio">Elegir Plan</button>`;

            tarjeta.innerHTML = `${cabecera}${listaCaracteristicas}${boton}`;
            preciosContainer.append(tarjeta);
        });
    };
    const cargarTecnologias = () => {
        tecnologies.forEach(tec => {
            const tarjeta = crearElementoConHTML('div', 'tecnologia-item')

            const contenido = `
                        <i class="${tec.icon}"></i>
                        <h4>${tec.name}</h4>`

            tarjeta.innerHTML = `${contenido}`
            tecnologiasContainer.append(tarjeta);
        })
    }
    cargarServicios();
    cargarPrecios();
    cargarTecnologias();
});

