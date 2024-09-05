document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.btn-telechargement');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            window.location.href = targetUrl;
        });
    });
});

// Effets lors du scroll
window.addEventListener('scroll', function() {
    const niveaux = document.querySelectorAll('.niveau');
    
    niveaux.forEach(niveau => {
        const niveauPosition = niveau.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (niveauPosition < screenPosition) {
            niveau.classList.add('niveau-visible');
        } else {
            niveau.classList.remove('niveau-visible');
        }
    });
});