document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
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
});
