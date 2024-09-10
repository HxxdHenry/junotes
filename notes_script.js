document.addEventListener("DOMContentLoaded", () => {
  const notesDropdown = document.getElementById('notesDropdown');
  const fileViewer = document.getElementById('fileViewer');

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

  // Function to fetch JSON data and populate the dropdown
  async function fetchAndPopulateDropdown() {
      const { stream, year, section, subject, type } = getQueryParams();
      const jsonUrl = `${stream}/${year}/${section}/${subject}/${type}/${type}.json`;

      try {
          const response = await fetch(jsonUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();

          // Populate dropdown
          notesDropdown.innerHTML = '<option value="">--Select a File--</option>'; // Clear previous options
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

  // Handle file selection and display
  notesDropdown.addEventListener('change', () => {
      const selectedUrl = notesDropdown.value;
      fileViewer.src = selectedUrl;
      fileViewer.style.display = selectedUrl ? 'block' : 'none';
  });

  // Fetch and populate dropdown on page load
  fetchAndPopulateDropdown();
});
