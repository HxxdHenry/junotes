document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const menuContent = document.getElementById('menu-content');
    const overlay = document.getElementById('overlay');
    const previousButton = document.querySelector('.nav-button.previous');
    const nextButton = document.querySelector('.nav-button.next');

    let currentStep = 'stream';

    // Define options for each stream, year, and section
    const streamOptions = {
        'btech-cse': {
            '1': {
                'M': [
                    'DEN001A Communication Skills + Lab', 
                    'DMA001A Engineering Mathematics-I', 
                    'DCO001A Computer Programming in C++', 
                    'DCO02A Computer Programming in C++ Lab', 
                    'DIN001A Cultural Education-I', 
                    'DCH001A Environmental Sciences', 
                    'DCH002A Engineering Chemistry', 
                    'DCH003A Chemistry Lab'
                ],
            },
        },
    };

    // Define types available for each subject
    const subjectOptions = {
        'DEN001A Communication Skills + Lab': ['notes', 'assignments'],
        'DMA001A Engineering Mathematics-I': ['notes', 'assignments'],
        'DCO001A Computer Programming in C++': ['notes', 'assignments'],
        'DCO02A Computer Programming in C++ Lab': ['notes', 'assignments'],
        'DIN001A Cultural Education-I': ['notes', 'assignments'],
        'DCH001A Environmental Sciences': ['notes', 'assignments'],
        'DCH002A Engineering Chemistry': ['notes', 'assignments', 'books'],
        'DCH003A Chemistry Lab': ['Lab Manual', 'Observations'],
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
        const steps = ['stream', 'year', 'section', 'subject', 'type'];
        steps.forEach(step => {
            document.getElementById(`menu-${step}`).classList.toggle('show', step === currentStep);
        });

        previousButton.style.display = (currentStep === 'stream') ? 'none' : 'inline-block';
        nextButton.textContent = (currentStep === 'type') ? 'Submit' : 'Next';

        // Only update relevant dropdowns
        if (currentStep === 'year') {
            updateSectionOptions();
        } else if (currentStep === 'section') {
            updateSubjectOptions();
        } else if (currentStep === 'subject') {
            updateTypeOptions();
        }
    }

    // Update section options based on selected stream and year
    function updateSectionOptions() {
        const stream = document.getElementById('stream').value;
        const year = document.getElementById('year').value;
        const sectionSelect = document.getElementById('section');

        console.log(`Updating sections for: {stream: '${stream}', year: '${year}'}`);

        // Clear existing options
        sectionSelect.innerHTML = '<option value="">Select Section</option>';

        if (stream && year && streamOptions[stream] && streamOptions[stream][year]) {
            const sections = Object.keys(streamOptions[stream][year]);
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section;
                option.textContent = section;
                sectionSelect.appendChild(option);
            });
        } else {
            console.log('No sections available.');
        }

        // Call updateSubjectOptions only if the section dropdown has been populated
        if (sectionSelect.children.length > 1) {
            updateSubjectOptions();
        }
    }

    // Update subject options based on selected stream, year, and section
    function updateSubjectOptions() {
        const stream = document.getElementById('stream').value;
        const year = document.getElementById('year').value;
        const section = document.getElementById('section').value;
        const subjectSelect = document.getElementById('subject');

        console.log(`Updating subjects for: {stream: '${stream}', year: '${year}', section: '${section}'}`);

        // Clear existing options
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';

        if (stream && year && section && streamOptions[stream] && streamOptions[stream][year] && streamOptions[stream][year][section]) {
            const subjects = streamOptions[stream][year][section];
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
            const section = document.getElementById('section').value;
            const subject = document.getElementById('subject').value;
            const type = document.getElementById('type').value;

            if (stream && year && section && subject && type) {
                // Construct the URL based on the selected options
                const url = `${stream}/${year}/${section}/${subject}/${type}/${type}.html`; // Ensure this matches your folder structure
                window.location.href = url;
            } else {
                alert('Please select all options.');
            }
        } else {
            const steps = ['stream', 'year', 'section', 'subject', 'type'];
            const currentIndex = steps.indexOf(currentStep);
            if (currentIndex >= 0 && currentIndex < steps.length - 1) {
                currentStep = steps[currentIndex + 1];
                updateMenu();
            }
        }
    });

    previousButton.addEventListener('click', () => {
        const steps = ['stream', 'year', 'section', 'subject', 'type'];
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
            updateSectionOptions();
        }
    });

    document.getElementById('section').addEventListener('change', () => {
        if (currentStep === 'section') {
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

    document.getElementById('request-button').addEventListener('click', function() {
        window.location.href = 'request.html';
    });
});
