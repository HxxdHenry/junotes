document.addEventListener("DOMContentLoaded", () => {
    const notesDropdown = document.getElementById('notesDropdown');
    const fileViewer = document.getElementById('fileViewer');
    const pageHeader = document.getElementById('pageHeader');

    // Function to get query parameters from the URL
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            stream: params.get('stream'),
            year: params.get('year'),
            section: params.get('section'),
            subject: params.get('subject'),
            type: params.get('type')
        };
    }

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        if (string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // Function to set the page title and header
    function updateTitleAndHeader() {
        const { type } = getQueryParams();
        if (type) {
            const formattedType = capitalizeFirstLetter(decodeURIComponent(type.replace(/-/g, ' ')));
            document.title = formattedType;
            pageHeader.textContent = `View and Download ${formattedType}`;
        }
    }

    // Function to fetch JSON data and populate the dropdown
    async function fetchAndPopulateDropdown() {
        const { stream, year, section, subject, type } = getQueryParams();
        const jsonUrl = `${stream}/${year}/${section}/${subject}/${type}/${type}.json`;

        console.log('Fetching JSON from:', jsonUrl);

        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            console.log('JSON Data:', data);

            // Clear existing options
            notesDropdown.innerHTML = '<option value="">--Select a File--</option>';
            data.forEach(file => {
                const option = document.createElement('option');
                option.value = file.url;
                option.textContent = file.name;
                notesDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }

    // Function to handle file selection and display
    function displaySelectedFile() {
        const selectedUrl = notesDropdown.value;
        console.log('Selected URL:', selectedUrl);

        if (selectedUrl) {
            fileViewer.src = encodeURI(selectedUrl);  // Ensure URL encoding
            fileViewer.style.display = 'block';
        } else {
            fileViewer.style.display = 'none';
        }
    }

    // Event listener for dropdown change
    notesDropdown.addEventListener('change', displaySelectedFile);

    // Initialize the page
    fetchAndPopulateDropdown();
    updateTitleAndHeader();
});
