document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const menuContent = document.getElementById('menu-content');
    const overlay = document.getElementById('overlay');
    const submitButton = document.getElementById('submit-button');
    const previousButton = document.querySelector('.nav-button.previous');
    const nextButton = document.querySelector('.nav-button.next');

    let currentStep = 'stream';

    // Define the options for each stream and year
    const streamOptions = {
        'btech-cse': {
            '1': ['mathematics', 'physics', 'chemistry'],
            '2': ['mathematics', 'physics', 'computer-science']
        },
        'bba': {
            '1': ['marketing', 'management'],
            '2': ['finance', 'entrepreneurship']
        }
    };

    // Define types available for each subject
    const subjectOptions = {
        'mathematics': ['notes', 'assignments', 'activities'],
        'physics': ['notes', 'assignments', 'activities'],
        'chemistry': ['notes', 'assignments', 'activities'],
        'computer-science': ['notes', 'assignments', 'activities'],
        'marketing': ['notes', 'assignments', 'activities'],
        'management': ['notes', 'assignments', 'activities'],
        'finance': ['notes', 'assignments', 'activities'],
        'entrepreneurship': ['notes', 'assignments', 'activities']
    };

    // Show or hide menu
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menuContent.style.display = 'block';
        overlay.style.display = 'block';
        updateMenu();
    });

    // Hide menu and overlay when clicking outside
    overlay.addEventListener('click', () => {
        menuContent.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Update menu based on current step
    function updateMenu() {
        const steps = ['stream', 'year', 'subject', 'type'];
        steps.forEach(step => {
            document.getElementById(`menu-${step}`).classList.toggle('show', step === currentStep);
        });

        previousButton.style.display = (currentStep === 'stream') ? 'none' : 'inline-block';
        nextButton.textContent = (currentStep === 'type') ? 'Submit' : 'Next';

        if (currentStep === 'year') {
            updateSubjectOptions();
        } else if (currentStep === 'subject') {
            updateTypeOptions();
        }
    }

    // Update subject options based on selected stream and year
    function updateSubjectOptions() {
        const stream = document.getElementById('stream').value;
        const year = document.getElementById('year').value;
        const subjectSelect = document.getElementById('subject');

        while (subjectSelect.firstChild) {
            subjectSelect.removeChild(subjectSelect.firstChild);
        }

        if (stream && year && streamOptions[stream] && streamOptions[stream][year]) {
            const subjects = streamOptions[stream][year];
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
                subjectSelect.appendChild(option);
            });
        }
        updateMenu();
    }

    // Update type options based on selected subject
    function updateTypeOptions() {
        const subject = document.getElementById('subject').value;
        const typeSelect = document.getElementById('type');

        while (typeSelect.firstChild) {
            typeSelect.removeChild(typeSelect.firstChild);
        }

        if (subject && subjectOptions[subject]) {
            const types = subjectOptions[subject];
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                typeSelect.appendChild(option);
            });
        }
        updateMenu();
    }

    // Handle navigation between steps
    nextButton.addEventListener('click', () => {
        if (currentStep === 'type') {
            const stream = document.getElementById('stream').value;
            const year = document.getElementById('year').value;
            const subject = document.getElementById('subject').value;
            const type = document.getElementById('type').value;

            if (stream && year && subject && type) {
                const url = `/${year}/${subject}/${type}.html`; // Adjust URL structure as needed
                window.location.href = url;
            } else {
                alert('Please select all options.');
            }
        } else {
            const steps = ['stream', 'year', 'subject', 'type'];
            const currentIndex = steps.indexOf(currentStep);
            if (currentIndex >= 0 && currentIndex < steps.length - 1) {
                currentStep = steps[currentIndex + 1];
                updateMenu();
            }
        }
    });

    previousButton.addEventListener('click', () => {
        const steps = ['stream', 'year', 'subject', 'type'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            currentStep = steps[currentIndex - 1];
            updateMenu();
        }
    });

    // Initialize menu
    updateMenu();
});
