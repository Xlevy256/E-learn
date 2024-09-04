document.addEventListener('DOMContentLoaded', function() {

    // Gestion du changement de niveau
    document.getElementById('levelSelect').addEventListener('change', function() {
        var selectedLevel = this.value;
        var classSelectionContainer = document.getElementById('classSelectionContainer');
        var courseSelectionContainer = document.getElementById('courseSelectionContainer');
        var accessCourseBtn = document.getElementById('accessCourseBtn');
        
        // Réinitialiser les sélections de classes et de cours
        classSelectionContainer.innerHTML = '';
        courseSelectionContainer.innerHTML = '';
        accessCourseBtn.disabled = true;

        var classes = [];
        var courses = ["Anglais", "Français", "Mathématiques", "Physique-Chimie", "Histoire-Géographie", "SVT"];

        // Définir les classes en fonction du niveau sélectionné
        if (selectedLevel === 'secondary') {
            classes = ["Sixième", "Cinquième", "Quatrième", "Troisième"];
        } else if (selectedLevel === 'tertiary') {
            classes = ["Seconde", "Première", "Terminale"];
        } else if (selectedLevel === 'higher') {
            classes = ["Facultés des Sciences"];
        }

        // Ajouter les options de classe
        var classSelect = document.createElement('select');
        classSelect.id = 'classSelect';
        classSelect.innerHTML = `<option value="" disabled selected>Choisissez une classe</option>`;
        classes.forEach(function(cl) {
            classSelect.innerHTML += `<option value="${cl.toLowerCase().replace(/\s+/g, '')}">${cl}</option>`;
        });

        // Gestion du changement de classe
        classSelect.addEventListener('change', function() {
            courseSelectionContainer.innerHTML = '';
            var selectedClass = this.value;

            // Ajouter les options de cours
            var courseSelect = document.createElement('select');
            courseSelect.id = 'courseSelect';
            courseSelect.innerHTML = `<option value="" disabled selected>Choisissez un cours</option>`;
            courses.forEach(function(course) {
                courseSelect.innerHTML += `<option value="${course.toLowerCase().replace(/\s+/g, '')}">${course}</option>`;
            });

            // Activer le bouton d'accès au cours
            courseSelect.addEventListener('change', function() {
                accessCourseBtn.disabled = false;
            });

            courseSelectionContainer.appendChild(courseSelect);
        });

        classSelectionContainer.appendChild(classSelect);
    });

    // Gestion du bouton d'accès au cours
    document.getElementById('accessCourseBtn').addEventListener('click', function() {
        var selectedClass = document.getElementById('classSelect').value;
        var selectedCourse = document.getElementById('courseSelect').value;
        var url = `documents_${selectedClass}_${selectedCourse}.html`;

        // Déboguer les valeurs capturées et l'URL
        console.log('Classe sélectionnée:', selectedClass);
        console.log('Cours sélectionné:', selectedCourse);
        console.log('URL générée:', url);

        // Ajouter un effet de fade-out
        document.querySelector('.container').style.animation = 'fadeOut 0.5s forwards';

        setTimeout(function() {
            // Redirection vers l'URL générée
            window.location.href = url;
        }, 500);
    });

    // Gestion de la position du pied de page
    const footer = document.querySelector('footer');
    const mainContent = document.querySelector('.main-content');

    function checkFooterPosition() {
        const contentHeight = mainContent.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        if (contentHeight < windowHeight) {
            footer.classList.add('footer-visible');
            mainContent.style.paddingBottom = `${footer.getBoundingClientRect().height}px`;
        } else {
            footer.classList.remove('footer-visible');
            mainContent.style.paddingBottom = '0';
        }
    }

    window.addEventListener('resize', checkFooterPosition);
    window.addEventListener('load', checkFooterPosition);

    // Vérifier la position du pied de page au chargement de la page
    checkFooterPosition();

    // Gestion de la modale pour le téléchargement
    const buttons = document.querySelectorAll('.btn-download');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const pdfCover = document.getElementById('pdf-cover');
    const confirmDownload = document.getElementById('confirm-download');
    let selectedFile;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            selectedFile = this.getAttribute('data-file');
            const coverImageUrl = `cover_images/${selectedFile.split('/').pop().replace('.pdf', '.jpg')}`; // assuming you have cover images in this path
            pdfCover.src = coverImageUrl;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    confirmDownload.addEventListener('click', () => {
        if (selectedFile) {
            const a = document.createElement('a');
            a.href = selectedFile;
            a.download = selectedFile.split('/').pop();
            a.click();
            modal.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

});