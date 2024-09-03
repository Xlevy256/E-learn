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