document.addEventListener('DOMContentLoaded', function() {
    // Espera a que el DOM esté listo y que el modal exista
    setTimeout(function() {
        const modal = document.getElementById('fileModal');
        const viewer = document.getElementById('fileViewer');
        const closeBtn = document.getElementById('closeModal');

        // Close modal functionality
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
                viewer.innerHTML = '';
            };
        }

        if (modal) {
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    viewer.innerHTML = '';
                }
            };
        }
    }, 100);
});

// Function to open files when clicking on file cards
function openFile(fileUrl) {
    const fileType = fileUrl.split('.').pop().toLowerCase();

    if (fileType === 'pdf') {
        // Open PDF in new tab for better compatibility
        window.open(fileUrl, '_blank');
    } else if (["jpg","jpeg","png","gif","webp"].includes(fileType)) {
        // Show images in modal
        const modal = document.getElementById('fileModal');
        const viewer = document.getElementById('fileViewer');
        viewer.innerHTML = `<img src="${fileUrl}" style="max-width:100%;max-height:600px;border-radius:8px;" />`;
        modal.style.display = 'flex';
    } else {
        // For other file types, show download message in modal
        const modal = document.getElementById('fileModal');
        const viewer = document.getElementById('fileViewer');
        viewer.innerHTML = `<p>No se puede visualizar este tipo de archivo aquí. <a href="${fileUrl}" target="_blank">Descargar</a></p>`;
        modal.style.display = 'flex';
    }
}
