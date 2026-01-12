document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("formFileMultiple");
    const fileNames = document.getElementById("fileNames");

    // Only attach event if elements exist
    if (fileInput && fileNames) {
        fileInput.addEventListener("change", function () {
            const names = Array.from(this.files).map(f => f.name).join(", ");
            fileNames.textContent = names || "No files selected";
        });
    }

    const forms = document.querySelectorAll('.validated-form');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});
