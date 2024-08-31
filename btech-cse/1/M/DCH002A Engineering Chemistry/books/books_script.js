const books = [
    { name: 'Engineering Chemistry Jain n Jain', url: 'Engineering Chemistry Jain n Jain.pdf', type: 'pdf' },
];

function populatebooksDropdown() {
    const dropdown = document.getElementById('booksDropdown');
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.url;
        option.textContent = book.name;
        dropdown.appendChild(option);
    });
}

function displaySelectedFile() {
    const dropdown = document.getElementById('booksDropdown');
    const viewer = document.getElementById('fileViewer');
    const selectedFile = dropdown.value;

    if (selectedFile) {
        const book = books.find(book => book.url === selectedFile);
        const fileType = book.type;

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
    populatebooksDropdown();
    document.getElementById('booksDropdown').addEventListener('change', displaySelectedFile);
});
