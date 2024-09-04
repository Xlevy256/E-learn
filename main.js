document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour la sélection des classes et des cours
    function updateSelections() {
        const level = document.getElementById('levelSelect').value;
        const classSelectionContainer = document.getElementById('classSelectionContainer');
        const courseSelectionContainer = document.getElementById('courseSelectionContainer');
        const accessCourseBtn = document.getElementById('accessCourseBtn');

        classSelectionContainer.innerHTML = '';
        courseSelectionContainer.innerHTML = '';
        accessCourseBtn.disabled = true;

        let classes = [];
        let courses = ["Anglais", "Français", "Mathématiques", "Physique-Chimie", "Histoire-Géographie", "SVT"];

        if (level === 'secondary') {
            classes = ["Sixième", "Cinquième", "Quatrième", "Troisième"];
        } else if (level === 'tertiary') {
            classes = ["Seconde", "Première", "Terminale"];
        } else if (level === 'higher') {
            classes = ["Facultés des Sciences"];
        }

        const classSelect = document.createElement('select');
        classSelect.id = 'classSelect';
        classSelect.innerHTML = '<option value="" disabled selected>Choisissez une classe</option>';
        classes.forEach(cl => {
            classSelect.innerHTML += `<option value="${cl.toLowerCase().replace(/\s+/g, '')}">${cl}</option>`;
        });

        classSelect.addEventListener('change', function() {
            const selectedClass = this.value;
            courseSelectionContainer.innerHTML = '';

            const courseSelect = document.createElement('select');
            courseSelect.id = 'courseSelect';
            courseSelect.innerHTML = '<option value="" disabled selected>Choisissez un cours</option>';
            courses.forEach(course => {
                courseSelect.innerHTML += `<option value="${course.toLowerCase().replace(/\s+/g, '')}">${course}</option>`;
            });

            courseSelect.addEventListener('change', function() {
                accessCourseBtn.disabled = false;
            });

            courseSelectionContainer.appendChild(courseSelect);
        });

        classSelectionContainer.appendChild(classSelect);
    }

    document.getElementById('levelSelect').addEventListener('change', updateSelections);

    document.getElementById('accessCourseBtn').addEventListener('click', function() {
        const selectedClass = document.getElementById('classSelect').value;
        const selectedCourse = document.getElementById('courseSelect').value;
        const url = `documents_${selectedClass}_${selectedCourse}.html`;

        console.log('Classe sélectionnée:', selectedClass);
        console.log('Cours sélectionné:', selectedCourse);
        console.log('URL générée:', url);

        document.querySelector('.container').style.animation = 'fadeOut 0.5s forwards';

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    });

    function adjustFooterPosition() {
        const footer = document.querySelector('footer');
        const mainContent = document.querySelector('.main-content');
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

    window.addEventListener('resize', adjustFooterPosition);
    window.addEventListener('load', adjustFooterPosition);

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
            const coverImageUrl = `cover_images/${selectedFile.split('/').pop().replace('.pdf', '.jpg')}`;
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

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});