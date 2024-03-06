document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize the first section as visible
    document.querySelector('.section').classList.add('active');

    // Function to move to the next section
    window.nextSection = (nextSectionId) => {
        const currentSection = document.querySelector('.section.active');
        const nextSection = document.getElementById(nextSectionId);

        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('done');
        }
        if (nextSection) {
            nextSection.classList.add('active');
        }
    };
    window.previousSection = (previousSectionId) => {
        const currentSection = document.querySelector('.section.active');
        const previousSection = document.getElementById(previousSectionId);

        if (currentSection) {
            currentSection.classList.remove('active');
        }
        if (previousSection) {
            previousSection.classList.remove('done');
            previousSection.classList.add('active');
        }
    };

    // Optional: Function to handle form submission (simplified)
    window.submitForm = (event) => {
        // Prevent the default form submission
        event.preventDefault();
    
        // Collect all form responses
        const formData = new FormData(document.getElementById('quadChartForm'));
        let data = [];
        
        // Convert FormData to a simple object for easier processing
        let formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Create CSV string
        let csvContent = "data:text/csv;charset=utf-8," + Object.keys(formObject).map(e => `"${e}"`).join(",") + "\n" + 
                 Object.values(formObject).map(e => `"${e.replace(/"/g, '""')}"`).join(",") + "\n";

    
        // Create a link to download the CSV file
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "form_data_new.csv");
        document.body.appendChild(link); // Required for FF
    
        link.click(); // This will download the file

       // Generate and download PDF
        generateAndDownloadPDF(); // (Your existing PDF generation logic here)

        // Hide current section/form and show the confirmation section
        document.querySelectorAll('.section').forEach(function(section) {
            section.style.display = 'none'; // Hide all sections
        });
        document.getElementById('complete').style.display = 'block'; // Show confirmation section

        return false; // To ensure no traditional form submission occurs
    };

    // create pdf 
    // Function to generate and download PDF
    function generateAndDownloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
    
        // Dimensions for A4 in landscape (297mm x 210mm), divide by 2 for quadrants
        const midX = 297 / 2; // Middle of the width
        const midY = 210 / 2; // Middle of the height
    
        // Draw lines to divide the page into quadrants
        doc.line(midX, 0, midX, 210); // Vertical line
        doc.line(0, midY, 297, midY); // Horizontal line
    
        // Add content to each quadrant
        doc.text("Quadrant 1 content", 20, 20); // Top-Left
        doc.text("Quadrant 2 content", midX + 10, 20); // Top-Right
        doc.text("Quadrant 3 content", 20, midY + 10); // Bottom-Left
        doc.text("Quadrant 4 content", midX + 10, midY + 10); // Bottom-Right
    
        doc.save('quadrants.pdf');
    }
    
    
    
});
