//notes - 6
//note - 7
//Notes - 2

const assignments = [
  { name: "", url: "", type: "pptx" },
  { name: "", url: "", type: "docx" },
  { name: "", url: "", type: "pdf" },
];

function populateNotesDropdown() {
  const dropdown = document.getElementById("assignmentsDropdown");
  assignments.forEach((assignment) => {
    const option = document.createElement("option");
    option.value = assignment.url;
    option.textContent = assignment.name;
    dropdown.appendChild(option);
  });
}

function displaySelectedFile() {
  const dropdown = document.getElementById("assignmentsDropdown");
  const viewer = document.getElementById("fileViewer");
  const selectedFile = dropdown.value;

  if (selectedFile) {
    const assignment = assignments.find(
      (assignment) => assignment.url === selectedFile
    );
    const fileType = assignment.type;

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
  populateNotesDropdown();
  document
    .getElementById("assignmentsDropdown")
    .addEventListener("change", displaySelectedFile);
});
