document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownContent = document.getElementById('dropdown-content');
    const submitButton = document.getElementById('submit-button');
    const aboutButton = document.getElementById('about-button');

    dropdownButton.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    submitButton.addEventListener('click', () => {
        const subject = document.getElementById('subject').value;
        const year = document.getElementById('year').value;
        const type = document.getElementById('type').value;

        if (subject && year && type) {
            const url = `/${year}/${subject}/${type}.html`; // Adjust URL structure as needed
            window.location.href = url;
        } else {
            alert('Please select all options.');
        }
    });

    aboutButton.addEventListener('click', () => {
        window.location.href = 'about.html'; // Link to your About Me page
    });
});
