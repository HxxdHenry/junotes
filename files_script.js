document.addEventListener("DOMContentLoaded", () => {
    const notesDropdown = document.getElementById('notesDropdown');
    const fileViewer = document.getElementById('fileViewer');
    const pageHeader = document.getElementById('pageHeader');
  
    // Function to get query parameters
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
            // Set the page title to only the type with the first letter capitalized
            document.title = formattedType;
            // Set the page header to "View and Download [Type]"
            pageHeader.textContent = `View and Download ${formattedType}`;
        }
    }
  
    // Function to fetch JSON data and populate the dropdown
    async function fetchAndPopulateDropdown() {
        const { stream, year, section, subject, type } = getQueryParams();
        const jsonUrl = `${stream}/${year}/${section}/${subject}/${type}/${type}.json`;

        console.log('Fetching JSON from:', jsonUrl);  // Debugging line
        
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            console.log('JSON Data:', data);  // Debugging line

            // Populate dropdown
            notesDropdown.innerHTML = '<option value="">--Select a File--</option>'; // Clear previous options
            data.forEach(file => {
                console.log('File URL:', file.url);  // Debugging line
                const option = document.createElement('option');
                option.value = file.url;
                option.textContent = file.name;
                notesDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }
  
    // Handle file selection and display
    notesDropdown.addEventListener('change', () => {
        const selectedUrl = notesDropdown.value;
        console.log('Selected URL:', selectedUrl);  // Debugging line
        fileViewer.src = selectedUrl;
        fileViewer.style.display = selectedUrl ? 'block' : 'none';
    });
  
    // Fetch and populate dropdown on page load
    fetchAndPopulateDropdown();
    
    // Update the title and header based on query parameters
    updateTitleAndHeader();
});
