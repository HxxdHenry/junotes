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

  // Handle navigation between steps
  nextButton.addEventListener("click", () => {
      if (currentStep === "type") {
          const stream = document.getElementById("stream").value;
          const year = document.getElementById("year").value;
          const section = document.getElementById("section").value;
          const subject = document.getElementById("subject").value;
          const type = document.getElementById("type").value;

          if (stream && year && section && subject && type) {
              // Construct the URL based on the selected options
              const url = `files.html?stream=${stream}&year=${year}&section=${section}&subject=${encodeURIComponent(subject)}&type=${encodeURIComponent(type)}`;
              window.location.href = url;
          } else {
              alert("Please select all options.");
          }
      } else {
          const steps = ["stream", "year", "section", "subject", "type"];
          const currentIndex = steps.indexOf(currentStep);
          if (currentIndex >= 0 && currentIndex < steps.length - 1) {
              currentStep = steps[currentIndex + 1];
              updateMenu();
          }
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

  // Event listeners for dropdown changes
  document.getElementById("stream").addEventListener("change", () => {
      if (currentStep === "stream") {
          updateYearOptions();
      }
  });

  document.getElementById("year").addEventListener("change", () => {
      if (currentStep === "year") {
          updateSectionOptions();
      }
  });

  document.getElementById("section").addEventListener("change", () => {
      if (currentStep === "section") {
          updateSubjectOptions();
      }
  });

  document.getElementById("subject").addEventListener("change", () => {
      if (currentStep === "subject") {
          updateTypeOptions();
      }
  });

  // Initialize menu
  updateMenu();
});
