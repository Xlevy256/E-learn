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
