const startDate = new Date('2025-01-01');
        
function updateCounter() {
    const currentDate = new Date();
    const difference = currentDate - startDate;
    
    // Calcular meses, días y horas
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 29)) / (1000 * 60 * 60));
    
    // Actualizar el DOM
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
}

// Actualizar el contador inmediatamente
updateCounter();

// Actualizar el contador cada hora
setInterval(updateCounter, 3600000);