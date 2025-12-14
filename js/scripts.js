document.addEventListener('DOMContentLoaded', function () {

    // --- Lógica del Menú Hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.navbar-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Lógica del Modal de Galería ---
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('modal-image');
    const galleryModalTitle = document.getElementById('modal-title');
    const galleryModalText = document.getElementById('modal-text');
    const closeGalleryModalBtn = document.querySelector('.gallery-close'); // Usa clase específica
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryModal && galleryModalImage && galleryModalTitle && galleryModalText && closeGalleryModalBtn && galleryItems) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const title = this.dataset.title;
                const imageSrc = this.dataset.imageSrc;
                const description = this.dataset.description;

                // Adjust path if needed, but since we moved images, the data-image-src might need "images/" prefix if it doesn't have it.
                // However, the HTML update will handle the data attributes.
                // Or we can handle it here. Let's handle it here to be safe if data attribute is just filename.
                let finalSrc = imageSrc;
                if (!imageSrc.startsWith('images/') && !imageSrc.startsWith('http')) {
                    finalSrc = 'images/' + imageSrc;
                }

                galleryModalImage.src = finalSrc;
                galleryModalTitle.textContent = title;
                galleryModalText.textContent = description;

                galleryModal.classList.add('active');
            });
        });

        closeGalleryModalBtn.addEventListener('click', () => {
            galleryModal.classList.remove('active');
        });

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
            }
        });
    }

    // --- Lógica del Modal de Servicios (NUEVO) ---
    const serviceModal = document.getElementById('service-modal');
    const serviceModalTitle = document.getElementById('service-modal-title');
    const processList = document.getElementById('service-modal-process-list');
    const benefitsList = document.getElementById('service-modal-benefits-list');
    const closeServiceModalBtn = document.querySelector('.service-close'); // Usa clase específica
    const serviceDetailBtns = document.querySelectorAll('.service-details-btn');

    if (serviceModal && serviceModalTitle && processList && benefitsList && closeServiceModalBtn && serviceDetailBtns) {

        serviceDetailBtns.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Previene comportamiento por defecto si es <a>

                const card = this.closest('.service-card'); // Encuentra la card padre
                const title = card.dataset.title;
                const processData = JSON.parse(card.dataset.process || '[]'); // Parsea JSON, default a array vacío
                const benefitsData = JSON.parse(card.dataset.benefits || '[]');

                serviceModalTitle.textContent = title;

                // Limpia listas anteriores
                processList.innerHTML = '';
                benefitsList.innerHTML = '';

                // Llena lista de procesos
                processData.forEach((step, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${index + 1}</span> <span>${step}</span>`;
                    processList.appendChild(li);
                });

                // Llena lista de beneficios
                benefitsData.forEach(benefit => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span>${benefit}</span>`;
                    benefitsList.appendChild(li);
                });

                serviceModal.classList.add('active');
            });
        });

        // Cierra modal de servicio
        closeServiceModalBtn.addEventListener('click', () => {
            serviceModal.classList.remove('active');
        });

        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
            }
        });
    }

    // --- Cierre de Modals con Tecla Escape (unificado) ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (galleryModal && galleryModal.classList.contains('active')) {
                galleryModal.classList.remove('active');
            }
            if (serviceModal && serviceModal.classList.contains('active')) {
                serviceModal.classList.remove('active');
            }
        }
    });

    // --- Lógica del Dropdown Tienda ---
    const btnTienda = document.getElementById('btn-tienda');
    const dropdownTienda = document.getElementById('dropdown-tienda');

    if (btnTienda && dropdownTienda) {
        btnTienda.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto del enlace #
            dropdownTienda.classList.toggle('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (!btnTienda.contains(e.target) && !dropdownTienda.contains(e.target)) {
                dropdownTienda.classList.remove('active');
            }
        });
    }

});
