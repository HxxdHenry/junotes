// Example script for handling dropdown functionality, if needed
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('change', (event) => {
        const subject = document.getElementById('subject').value;
        const year = document.getElementById('year').value;
        const type = document.getElementById('type').value;
        
        // Logic to filter or display content based on selection
        console.log(`Subject: ${subject}, Year: ${year}, Type: ${type}`);
    });
});

