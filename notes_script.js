document.addEventListener("DOMContentLoaded", () => {
  // Function to get query parameters from the URL
  function getQueryParams() {
    const queryParams = {};
    const queryString = window.location.search.substring(1);
    const urlParams = new URLSearchParams(queryString);

    urlParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  // Function to fetch JSON data
  function fetchJson(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
        alert('Failed to load data. Please check the URL or try again later.');
      });
  }

  // Function to populate the dropdown with notes
  function populateDropdown(files) {
    const notesDropdown = document.getElementById("notesDropdown");

    // Clear existing options
    notesDropdown.innerHTML = '<option value="">--Select a File--</option>';

    files.forEach(file => {
      const option = document.createElement("option");
      option.value = file.url;
      option.textContent = file.name;
      notesDropdown.appendChild(option);
    });
  }

  // Function to handle dropdown change event
  function handleDropdownChange() {
    const notesDropdown = document.getElementById("notesDropdown");
    const fileViewer = document.getElementById("fileViewer");

    notesDropdown.addEventListener("change", () => {
      const fileUrl = notesDropdown.value;

      if (fileUrl) {
        fileViewer.style.display = "block";
        fileViewer.src = fileUrl;
      } else {
        fileViewer.style.display = "none";
      }
    });
  }

  // Main function to initialize page
  function initializePage() {
    const queryParams = getQueryParams();
    const { stream, year, section, subject, type } = queryParams;

    if (stream && year && section && subject && type) {
      const jsonFileUrl = `stream/${year}/${section}/${subject}/${type}/${type}.json`; // Adjust path as needed

      fetchJson(jsonFileUrl).then(files => {
        if (files) {
          populateDropdown(files);
          handleDropdownChange();
        }
      });
    } else {
      console.error("Missing query parameters.");
    }
  }

  initializePage();
});
