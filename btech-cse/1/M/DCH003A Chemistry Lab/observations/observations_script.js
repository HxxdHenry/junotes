const observations = [
  { name: "Observations", url: "Observations.pdf", type: "pdf" },
];

function populateObservationsDropdown() {
  const dropdown = document.getElementById("observationsDropdown");
  observations.forEach((observation) => {
    const option = document.createElement("option");
    option.value = observation.url;
    option.textContent = observation.name;
    dropdown.appendChild(option);
  });
}

function displaySelectedFile() {
  const dropdown = document.getElementById("observationsDropdown");
  const viewer = document.getElementById("fileViewer");
  const selectedFile = dropdown.value;

  if (selectedFile) {
    const observation = observations.find(
      (observation) => observation.url === selectedFile
    );
    const fileType = observation.type;

    viewer.style.display = "none";

    if (fileType === "pdf") {
      viewer.src = selectedFile;
      viewer.style.display = "block";
    } else if (fileType === "pptx" || fileType === "docx") {
      viewer.src = selectedFile;
      viewer.style.display = "block";
    } else {
      alert("Unsupported file type");
    }
  } else {
    viewer.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateObservationsDropdown();
  document
    .getElementById("observationsDropdown")
    .addEventListener("change", displaySelectedFile);
});
