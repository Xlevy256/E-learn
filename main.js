function toggleCourses(classId, courseId) {
    const courseItems = document.getElementById(courseId);
    const isVisible = courseItems.style.display === 'block';

    // Hide all course items in the same class section
    const allCourseItems = document.querySelectorAll(`#${classId} .course-items`);
    allCourseItems.forEach(item => {
        if (item.id !== courseId) {
            item.style.display = 'none';
        }
    });

    // Toggle visibility of the selected course items
    courseItems.style.display = isVisible ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const documents = document.querySelectorAll('.document');

    documents.forEach((document, index) => {
        document.style.animationDelay = `${index * 0.2}s`;
    });
});

document.getElementById('logoutButton').addEventListener('click', function() {
    // Masquer le bouton et montrer le loader
    this.style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    // Redirection après 3 secondes
    setTimeout(function() {
        window.location.href = "connexion.html"; // Remplacez "login.html" par l'URL de votre page de connexion
    }, 3000);
});
// Insérer l'année courante dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();
document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    courseCards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', () => {
    const courseBtn = document.querySelector('.course-btn');

    // Animation de clic sur le bouton
    courseBtn.addEventListener('click', () => {
        courseBtn.classList.add('clicked');
        setTimeout(() => {
            courseBtn.classList.remove('clicked');
            alert('Vous allez être redirigé vers le cours.');
            window.location.href = 'physique-chimiepdf6.html';
        }, 300);
    });

    // Effets d'animation sur le bouton au survol
    courseBtn.addEventListener('mouseover', () => {
        courseBtn.style.boxShadow = '0px 15px 20px rgba(0, 91, 187, 0.3)';
    });

    courseBtn.addEventListener('mouseout', () => {
        courseBtn.style.boxShadow = 'none';
    });
});