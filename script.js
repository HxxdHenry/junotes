document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menuContent = document.getElementById("menu-content");
  const overlay = document.getElementById("overlay");
  const previousButton = document.querySelector(".nav-button.previous");
  const nextButton = document.querySelector(".nav-button.next");

  let currentStep = "stream";

  // Define options for each stream, year, and section
  const streamOptions = {
    "btech-cse": {
      1: {
        M: [
          "DEN001A Communication Skills",
          "DEN001B Communication Skills Lab",
          "DMA001A Engineering Mathematics-I",
          "DCO001A Computer Programming and Logical Thinking",
          "DCO014A Computer Programming and Logical Thinking Lab",
          "DCH002A Engineering Chemistry",
          "DCH003A Chemistry Lab",
          "JIC001A Entrepreneurship Development-I",
          "DCH004A Environmental Sciences",
          "DIN001A Cultural Education-I",
          "DCO006A Engineering Workshop CSE",
        ],
      },
    },
  };

  // Define types available for each subject
  const subjectOptions = {
    "DEN001A Communication Skills": ["notes", "assignments"],
    "DEN001B Communication Skills Lab": ["activities"],
    "DMA001A Engineering Mathematics-I": ["notes", "assignments"],
    "DCO001A Computer Programming and Logical Thinking": ["notes"],
    "DCO014A Computer Programming and Logical Thinking Lab": [],
    "DCH002A Engineering Chemistry": ["notes", "assignments", "books"],
    "DCH003A Chemistry Lab": ["lab manuals", "observations"],
    "JIC001A Entrepreneurship Development-I": [],
    "DCH004A Environmental Sciences": ["notes", "assignments"],
    "DIN001A Cultural Education-I": [],
    "DCO006A Engineering Workshop CSE": ["assignments"],
  };

  // Create and add popup to the document
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
      <p>For better PDFs, check 'PDF Tips' in the Contribute section.</p>
      <label>
          <input type="checkbox" id="do-not-show-again">
          Do not show again
      </label>
      <button id="popup-proceed">Proceed</button>
  `;
  document.body.appendChild(popup);

  // Function to show popup
  function showPopup() {
    document.getElementById("overlay").style.display = "block";
    popup.classList.add("popup-show");
  }

  // Function to hide popup
  function hidePopup() {
    document.getElementById("overlay").style.display = "none";
    popup.classList.remove("popup-show");
  }

  // Check if the user has opted not to show the popup again
  if (!localStorage.getItem("doNotShowAgain")) {
    document.getElementById("erp-button").addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action
      showPopup();
    });
  } else {
    document.getElementById("erp-button").addEventListener("click", () => {
      window.location.href = "https://jecrc.mastersofterp.in/";
    });
  }

  // Handle Proceed button in the popup
  document.getElementById("popup-proceed").addEventListener("click", () => {
    if (document.getElementById("do-not-show-again").checked) {
      localStorage.setItem("doNotShowAgain", "true");
    }
    hidePopup();
    window.location.href = "https://jecrc.mastersofterp.in/";
  });

  // Hide popup and overlay when clicking outside the popup
  document.getElementById("overlay").addEventListener("click", (event) => {
    if (!popup.contains(event.target)) {
      hidePopup();
    }
  });

  // Show or hide menu
  menuButton.addEventListener("click", () => {
    menuContent.style.display = "block";
    overlay.style.display = "block";
    updateMenu();
  });

  // Hide menu and overlay when clicking outside
  overlay.addEventListener("click", () => {
    menuContent.style.display = "none";
    overlay.style.display = "none";
  });

  // Update menu based on the current step
  function updateMenu() {
    const steps = ["stream", "year", "section", "subject", "type"];
    steps.forEach((step) => {
      document
        .getElementById(`menu-${step}`)
        .classList.toggle("show", step === currentStep);
    });

    previousButton.style.display =
      currentStep === "stream" ? "none" : "inline-block";
    nextButton.textContent = currentStep === "type" ? "Submit" : "Next";

    // Update dropdown options based on the current step
    if (currentStep === "year") {
      updateYearOptions();
    } else if (currentStep === "section") {
      updateSectionOptions();
    } else if (currentStep === "subject") {
      updateSubjectOptions();
    } else if (currentStep === "type") {
      updateTypeOptions();
    }
  }

  // Update year options based on selected stream
  function updateYearOptions() {
    const stream = document.getElementById("stream").value;
    const yearSelect = document.getElementById("year");

    // Clear existing options
    yearSelect.innerHTML = '<option value="">Select Year</option>';

    if (stream && streamOptions[stream]) {
      const years = Object.keys(streamOptions[stream]);
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `Year ${year}`;
        yearSelect.appendChild(option);
      });

      // Trigger update for sections if there are years available
      if (years.length > 0) {
        updateSectionOptions();
      }
    }
  }

  // Update section options based on selected stream and year
  function updateSectionOptions() {
    const stream = document.getElementById("stream").value;
    const year = document.getElementById("year").value;
    const sectionSelect = document.getElementById("section");

    // Clear existing options
    sectionSelect.innerHTML = '<option value="">Select Section</option>';

    if (stream && year && streamOptions[stream] && streamOptions[stream][year]) {
      const sections = Object.keys(streamOptions[stream][year]);
      sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section;
        option.textContent = section;
        sectionSelect.appendChild(option);
      });

      // Trigger update for subjects if there are sections available
      if (sections.length > 0) {
        updateSubjectOptions();
      }
    }
  }

  // Update subject options based on selected stream, year, and section
  function updateSubjectOptions() {
    const stream = document.getElementById("stream").value;
    const year = document.getElementById("year").value;
    const section = document.getElementById("section").value;
    const subjectSelect = document.getElementById("subject");

    // Clear existing options
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';

    if (stream && year && section && streamOptions[stream] && streamOptions[stream][year] && streamOptions[stream][year][section]) {
      const subjects = streamOptions[stream][year][section];
      subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
      });

      // Trigger update for types if there are subjects available
      if (subjects.length > 0) {
        updateTypeOptions();
      }
    }
  }

  // Update type options based on selected subject
  function updateTypeOptions() {
    const subject = document.getElementById("subject").value;
    const typeSelect = document.getElementById("type");

    // Clear existing options
    typeSelect.innerHTML = '<option value="">Select Type</option>';

    if (subject && subjectOptions[subject]) {
      const types = subjectOptions[subject];
      types.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
      });
    }
  }

  // Handle form submission
  function handleFormSubmission() {
    const stream = document.getElementById("stream").value;
    const year = document.getElementById("year").value;
    const section = document.getElementById("section").value;
    const subject = document.getElementById("subject").value;
    const type = document.getElementById("type").value;

    // Construct the URL with query parameters
    if (stream && year && section && subject && type) {
      const url = `Files/files.html?stream=${encodeURIComponent(stream)}&year=${encodeURIComponent(year)}&section=${encodeURIComponent(section)}&subject=${encodeURIComponent(subject)}&type=${encodeURIComponent(type)}`;
      window.location.href = url;
    } else {
      alert("Please complete all fields before submitting.");
    }
  }

  // Handle navigation buttons
  previousButton.addEventListener("click", () => {
    switch (currentStep) {
      case "year":
        currentStep = "stream";
        break;
      case "section":
        currentStep = "year";
        break;
      case "subject":
        currentStep = "section";
        break;
      case "type":
        currentStep = "subject";
        break;
    }
    updateMenu();
  });

  nextButton.addEventListener("click", () => {
    if (currentStep === "type") {
      handleFormSubmission();
    } else {
      switch (currentStep) {
        case "stream":
          currentStep = "year";
          break;
        case "year":
          currentStep = "section";
          break;
        case "section":
          currentStep = "subject";
          break;
        case "subject":
          currentStep = "type";
          break;
      }
      updateMenu();
    }
  });

  // Initialize menu
  updateMenu();
});
