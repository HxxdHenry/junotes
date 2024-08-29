document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const menuContent = document.getElementById('menu-content');
    const overlay = document.getElementById('overlay');
    const previousButton = document.querySelector('.nav-button.previous');
    const nextButton = document.querySelector('.nav-button.next');

    let currentStep = 'stream';

    // Define options for each stream and year
    const streamOptions = {
        'btech-cse': {
            '1': ['mathematics'],
        },
    };

    // Define types available for each subject
    const subjectOptions = {
        'mathematics': ['notes', 'assignments'],
    };

    // Show or hide menu
    menuButton.addEventListener('click', () => {
        menuContent.style.display = 'block';
        overlay.style.display = 'block';
        updateMenu();
    });

    // Hide menu and overlay when clicking outside
    overlay.addEventListener('click', () => {
        menuContent.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Update menu based on the current step
    function updateMenu() {
        const steps = ['stream', 'year', 'subject', 'type'];
        steps.forEach(step => {
            document.getElementById(`menu-${step}`).classList.toggle('show', step === currentStep);
        });

        previousButton.style.display = (currentStep === 'stream') ? 'none' : 'inline-block';
        nextButton.textContent = (currentStep === 'type') ? 'Submit' : 'Next';

        // Only update relevant dropdowns
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

        console.log(`Updating subjects for: {stream: '${stream}', year: '${year}'}`);

        // Clear existing options
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';

        if (stream && year && streamOptions[stream] && streamOptions[stream][year]) {
            const subjects = streamOptions[stream][year];
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
                subjectSelect.appendChild(option);
            });
        } else {
            console.log('No subjects available.');
        }

        // Call updateTypeOptions only if the subject dropdown has been populated
        if (subjectSelect.children.length > 1) {
            updateTypeOptions();
        }
    }

    // Update type options based on selected subject
    function updateTypeOptions() {
        const subject = document.getElementById('subject').value;
        const typeSelect = document.getElementById('type');

        console.log(`Updating types for subject: '${subject}'`);

        // Clear existing options
        typeSelect.innerHTML = '<option value="">Select Type</option>';

        if (subject && subjectOptions[subject]) {
            const types = subjectOptions[subject];
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                typeSelect.appendChild(option);
            });
        } else {
            console.log('No types available.');
        }
    }

    // Handle navigation between steps
    nextButton.addEventListener('click', () => {
        if (currentStep === 'type') {
            const stream = document.getElementById('stream').value;
            const year = document.getElementById('year').value;
            const subject = document.getElementById('subject').value;
            const type = document.getElementById('type').value;

            if (stream && year && subject && type) {
                const url = `/${stream}/${year}/${subject}/${type}.html`; // Adjust URL structure as needed
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

    // Event listeners for dropdown changes
    document.getElementById('stream').addEventListener('change', () => {
        if (currentStep === 'stream') {
            updateMenu();
        }
    });

    document.getElementById('year').addEventListener('change', () => {
        if (currentStep === 'year') {
            updateSubjectOptions();
        }
    });

    document.getElementById('subject').addEventListener('change', () => {
        if (currentStep === 'subject') {
            updateTypeOptions();
        }
    });

    // Initialize menu
    updateMenu();
});
