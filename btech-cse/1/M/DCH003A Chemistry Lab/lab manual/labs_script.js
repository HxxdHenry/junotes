const labs = [{ name: "Lab Manual", url: "Lab Manual.pdf", type: "pdf" }];

function populateLabsDropdown() {
  const dropdown = document.getElementById("labsDropdown");
  labs.forEach((lab) => {
    const option = document.createElement("option");
    option.value = lab.url;
    option.textContent = lab.name;
    dropdown.appendChild(option);
  });
}

function displaySelectedFile() {
  const dropdown = document.getElementById("labsDropdown");
  const viewer = document.getElementById("fileViewer");
  const selectedFile = dropdown.value;

  if (selectedFile) {
    const lab = labs.find((lab) => lab.url === selectedFile);
    const fileType = lab.type;

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
  populateLabsDropdown();
  document
    .getElementById("labsDropdown")
    .addEventListener("change", displaySelectedFile);
});
