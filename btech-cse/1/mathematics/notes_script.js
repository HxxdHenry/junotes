const notes = [
    { name: 'Presentation.pptx', url: 'https://docs.google.com/presentation/d/1aAa6quF99x-_9zUaC0LKEH5Z8FmDLAkM/edit?usp=sharing&ouid=103161207610316825981&rtpof=true&sd=true', type: 'pptx' },
    { name: 'Document.docx', url: 'https://docs.google.com/document/d/1s0-Gxo8lJBD66CutGhexkNOd7ZRezWWd/edit?usp=sharing&ouid=103161207610316825981&rtpof=true&sd=true', type: 'docx' },
    { name: 'Notes.pdf', url: '1.pdf', type: 'pdf' },
];

function populateNotesDropdown() {
    const dropdown = document.getElementById('notesDropdown');
    notes.forEach(note => {
        const option = document.createElement('option');
        option.value = note.url;
        option.textContent = note.name;
        dropdown.appendChild(option);
    });
}

function displaySelectedFile() {
    const dropdown = document.getElementById('notesDropdown');
    const viewer = document.getElementById('fileViewer');
    const selectedFile = dropdown.value;

    if (selectedFile) {
        const note = notes.find(note => note.url === selectedFile);
        const fileType = note.type;

        viewer.style.display = 'none';

        if (fileType === 'pdf') {
            viewer.src = selectedFile;
            viewer.style.display = 'block';
        } else if (fileType === 'pptx' || fileType === 'docx') {
            viewer.src = selectedFile;
            viewer.style.display = 'block';
        } else {
            alert('Unsupported file type');
        }
    } else {
        viewer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateNotesDropdown();
    document.getElementById('notesDropdown').addEventListener('change', displaySelectedFile);
});
