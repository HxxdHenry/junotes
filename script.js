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

    // Only update relevant dropdowns
    if (currentStep === "year") {
      updateSectionOptions();
    } else if (currentStep === "section") {
      updateSubjectOptions();
    } else if (currentStep === "subject") {
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
    }

    // Update sections if there are years available
    if (yearSelect.children.length > 1) {
      updateSectionOptions();
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
    }

    // Update subjects if there are sections available
    if (sectionSelect.children.length > 1) {
      updateSubjectOptions();
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
    }

    // Update types if there are subjects available
    if (subjectSelect.children.length > 1) {
      updateTypeOptions();
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
  nextButton.addEventListener("click", () => {
    const steps = ["stream", "year", "section", "subject", "type"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      currentStep = steps[currentIndex + 1];
      updateMenu();
    } else {
      // Handle form submission
      console.log("Form submitted");
    }
  });

  previousButton.addEventListener("click", () => {
    const steps = ["stream", "year", "section", "subject", "type"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      currentStep = steps[currentIndex - 1];
      updateMenu();
    }
  });

  // Initialize menu
  updateMenu();
});
