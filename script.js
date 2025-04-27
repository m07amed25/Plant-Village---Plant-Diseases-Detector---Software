document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const resultDisplay = document.getElementById('result');
    const fileInput = document.getElementById('upload-box');
    const fileNameDisplay = document.getElementById('file-name-display');

    // Display file name when a file is selected
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        fileNameDisplay.textContent = file ? file.name : '';
    });

    // Handle form submission with fetch
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                // Display prediction result
                resultDisplay.innerHTML = `
                    <p>Predicted Class: <strong>${data.class}</strong></p>
                    <p>Confidence: <strong>${data.confidence.toFixed(2)}</strong></p>
                `;
            } else {
                resultDisplay.textContent = 'Error processing the image. Please try again.';
            }
        } catch (error) {
            resultDisplay.textContent = error.data;
        }
    });
});
