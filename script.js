document.addEventListener('DOMContentLoaded', () => {
    // Validate critical elements first
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    // Early return if navigation elements are missing
    if (!hamburger || !nav) {
        console.warn('Critical navigation elements not found');
        return;
    }

    // Check if we're on the products page
    const isProductsPage = document.getElementById('productsGrid') !== null;

    // Proceed with initialization only if critical elements exist
    const initializeApp = () => {
        const body = document.body;

        const toggleMenu = (open = null) => {
            const isOpen = open === null ? !hamburger.classList.contains('active') : open;
            
            hamburger.classList.toggle('active', isOpen);
            nav.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            body.style.overflow = isOpen ? 'hidden' : '';
            
            if (isOpen) {
                nav.querySelector('a').focus();
            }
        };

        // Hamburger click event
        hamburger.addEventListener('click', () => toggleMenu());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggleMenu(false);
                hamburger.focus();
            }
        });

        // Close menu when clicking links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Handle focus trap
        nav.addEventListener('keydown', (e) => {
            if (!nav.classList.contains('active')) return;
            
            const focusableElements = nav.querySelectorAll('a, button');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });

        // Only initialize products functionality if we're on the products page
        if (isProductsPage) {
            // Sample products data - Replace with your actual products
            const products = [
                {
                    id: 1,
                    title: "Canva Pro - 1 Año",
                    price: "$5.990",
                    category: "software",
                    shortDescription: "Herramienta de diseño profesional premium",
                    image: "images/canvapro.jpg",
                    fullDescription: "Desbloquea todo el potencial creativo con Canva Pro por un año completo. Accede a más de 100 millones de fotos y elementos premium, más de 3000 fuentes exclusivas, y todas las herramientas profesionales.",
                    features: [
                        "Acceso a más de 100M de elementos premium",
                        "3000+ fuentes exclusivas",
                        "Herramientas de diseño avanzadas",
                        "Removedor de fondos profesional",
                        "100GB de almacenamiento en la nube"
                    ]
                },
                {
                    id: 2,
                    title: "McAfee AntiVirus (2024) - 1 Año",
                    price: "$5.500",
                    category: "software",
                    shortDescription: "Protección completa contra amenazas",
                    image: "images/Packshot_AntiVirusPlus.webp",
                    fullDescription: "Protección completa para tu dispositivo con McAfee AntiVirus Plus 2024. Incluye protección en tiempo real contra virus, malware, ransomware y amenazas zero-day.",
                    features: [
                        "Protección en tiempo real",
                        "Escudo contra ransomware",
                        "Firewall avanzado",
                        "Protección de identidad",
                        "Optimización del sistema"
                    ]
                },
                {
                    id: 3,
                    title: "Anti Recoil para Mouse",
                    price: "$4.990",
                    category: "gaming",
                    shortDescription: "Control preciso en juegos FPS",
                    image: "images/Antirecoil.jpg",
                    fullDescription: "Mejora tu precisión en juegos FPS con nuestro Anti Recoil para mouse. Software optimizado que ajusta automáticamente el control de retroceso.",
                    features: [
                        "Ajuste automático de retroceso",
                        "Compatible con juegos populares",
                        "Configuración personalizada",
                        "Actualizaciones regulares",
                        "Soporte técnico incluido"
                    ]
                },
                {
                    id: 4,
                    title: "Macro para Mouse",
                    price: "$1.990",
                    category: "gaming",
                    shortDescription: "Optimización de controles para gaming",
                    image: "images/macromouse.jpg",
                    fullDescription: "Optimiza tu gameplay con nuestra macro especializada para PC. Mejora significativamente tu precisión y tiempo de respuesta.",
                    features: [
                        "Configuración intuitiva",
                        "Compatible con todos los juegos",
                        "Respuesta instantánea",
                        "Perfiles personalizables",
                        "Fácil instalación"
                    ]
                },
                {
                    id: 5,
                    title: "Microsoft Office 365 Personal",
                    price: "$5.500",
                    category: "software",
                    shortDescription: "Suite completa de productividad",
                    image: "images/microsftOffice.png",
                    fullDescription: "Acceso completo a Word, Excel, PowerPoint, Outlook y OneNote. 1TB de almacenamiento en OneDrive, actualizaciones automáticas y más.",
                    features: [
                        "Apps de Office completas",
                        "1TB de almacenamiento en OneDrive",
                        "Actualizaciones automáticas",
                        "Uso en múltiples dispositivos",
                        "Soporte técnico premium"
                    ]
                },
                {
                    id: 6,
                    title: "Express VPN - 1 Mes",
                    price: "$3.990",
                    category: "software",
                    shortDescription: "VPN rápida y segura",
                    image: "images/expressvpn.jpg",
                    fullDescription: "Conexión ultra rápida con más de 160 ubicaciones en 94 países. Perfecto para streaming, gaming y navegación segura.",
                    features: [
                        "160+ ubicaciones en 94 países",
                        "Velocidad ultrarrápida",
                        "Ideal para streaming",
                        "Política de no logs",
                        "Soporte 24/7"
                    ]
                },
                {
                    id: 7,
                    title: "ChatGPT Plus - 1 Mes",
                    price: "$4.990",
                    category: "software",
                    shortDescription: "IA avanzada con GPT-o1",
                    image: "images/chatgpt.jpg",
                    fullDescription: "Acceso premium a GPT-4o, con funciones avanzadas como respuestas rápidas, plugins exclusivos y generación de imágenes.",
                    features: [
                        "Modelo GPT-4.0 (ideal para la mayoría de las tareas)",
                "Opciones optimizadas: GPT-4o mini (más rápido) y GPT-4 (modelo anterior para razonamiento avanzado)",
                "Respuestas prioritarias",
                "Plugins exclusivos",
                "Generación de imágenes con DALL-E 3",
                "Acceso en horas pico",
                "Navegación web en tiempo real",
                "Análisis de imágenes con GPT-4V (Visual)"
                    ]
                },
                {
                    id: 8,
                    title: "Amazon Prime Completo - 1 Mes",
                    price: "$3.990",
                    category: "software",
                    shortDescription: "Streaming y beneficios Prime",
                    image: "images/prime video.png",
                    fullDescription: "Incluye Prime Video, Amazon Music con 100 millones de canciones, envíos Prime gratis y acceso a Prime Gaming.",
                    features: [
                        "Prime Video en 4K",
                        "Amazon Music ilimitado",
                        "Prime Gaming",
                        "Envíos Prime gratis",
                        "Ofertas exclusivas"
                    ]
                },
                {
                    id: 9,
                    title: "1000 Seguidores TikTok",
                    price: "$9.990",
                    category: "social media",
                    shortDescription: "Impulsa tu presencia en TikTok",
                    image: "images/seguidores-tiktok.webp",
                    fullDescription: "1.000 seguidores reales y activos para TikTok. Entrega gradual y natural.",
                    features: [
                        "Seguidores reales",
                        "Entrega gradual",
                        "Sin contraseña requerida",
                        "Demora de entrega: 24-72 horas",
                        "Soporte post-venta"
                    ]
                },
                {
                    id: 10,
                    title: "Combo McAfee + Canva Pro",
                    price: "$7.500",
                    category: "software",
                    shortDescription: "Seguridad y creatividad en uno",
                    image: "images/Promo-canva+mcafee.png",
                    fullDescription: "Paquete especial con McAfee AntiVirus 2024 y Canva Pro por 1 año. Ahorra más del 30% comprando juntos.",
                    features: [
                        "Ahorro del 30%",
                        "McAfee AntiVirus 2024",
                        "Canva Pro por 1 año",
                        "Soporte premium",
                        "Activación inmediata"
                    ]
                },
                {
                    id: 11,
                    title: "YouTube Premium - 1 Mes",
                    price: "$3.990",
                    category: "software",
                    shortDescription: "YouTube sin interrupciones",
                    image: "images/youtubepremium.jpg",
                    fullDescription: "Experiencia completa sin anuncios, reproducción en segundo plano y descargas offline.",
                    features: [
                        "Sin anuncios",
                        "Reproducción en segundo plano",
                        "YouTube Music incluido",
                        "Descargas offline",
                        "Calidad 4K"
                    ]
                },
                {
                    id: 12,
                    title: "1000 Seguidores Twitch",
                    price: "$9.990",
                    category: "social media",
                    shortDescription: "Impulsa tu canal de streaming",
                    image: "images/seguidorestwitch.jpg",
                    fullDescription: "Potencia tu canal de Twitch con 1.000 seguidores orgánicos y alcanza el estatus de afiliado.",
                    features: [
                        "Seguidores orgánicos",
                        "Entrega gradual",
                        "Apoyo para afiliación",
                        "Garantía de permanencia",
                        "Soporte personalizado"
                    ]
                },
                {
                    id: 13,
                    title: "Spotify Premium - 3 Meses",
                    price: "$4.990",
                    category: "software",
                    shortDescription: "Música premium sin límites",
                    image: "images/spotify.png",
                    fullDescription: "Acceso premium a Spotify con más de 82 millones de canciones en alta calidad, sin anuncios y con modo offline.",
                    features: [
                        "Calidad de audio superior",
                        "Sin anuncios",
                        "Modo offline",
                        "Acceso multidispositivo",
                        "Playlists ilimitadas"
                    ]
                },
                {
                    id: 14,
                    title: "1000 Seguidores Instagram",
                    price: "$9.990",
                    category: "social media",
                    shortDescription: "Impulsa tu presencia en Instagram",
                    image: "images/seguidores instagram.png",
                    fullDescription: "1.000 seguidores reales y activos para Instagram. Entrega gradual y natural para mantener la seguridad de tu cuenta.",
                    features: [
                        "Seguidores reales",
                        "Entrega gradual",
                        "Sin contraseña requerida",
                        "Demora de entrega: 24-72 horas",
                        "Soporte post-venta"
                    ]
                }
            ];

            // Initialize products view
            const productsGrid = document.getElementById('productsGrid');
            const productDetail = document.getElementById('productDetail');
            const backButton = document.getElementById('backButton');

            // Create and display product cards
            function displayProducts(productsToShow = products) {
                productsGrid.innerHTML = productsToShow.map(product => `
                    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-info">
                            <h3>${product.title}</h3>
                            <p class="price" data-price="${product.price.replace('$', '').replace('.', '')}">${product.price}</p>
                            <p class="description">${product.shortDescription}</p>
                        </div>
                    </div>
                `).join('');

                // Add click listeners to all product cards
                document.querySelectorAll('.product-card').forEach(card => {
                    card.addEventListener('click', () => showProductDetail(card.dataset.id));
                });
            }

            // Show product detail view
            function showProductDetail(productId) {
                const product = products.find(p => p.id === parseInt(productId));
                const detailContent = document.querySelector('.detail-content');
                
                // Define products with direct purchase links
                const directPurchaseLinks = {
                    'Canva Pro - 1 Año': 'https://mpago.la/1VS4XpK',
                    'Macro para Mouse': 'https://mpago.la/1LHjhuN',
                    'Anti Recoil para Mouse': 'https://mpago.la/21qbKiA',
                    'McAfee AntiVirus (2024) - 1 Año': 'https://mpago.la/2WnW5zR',
                    '1000 Seguidores TikTok': 'https://mpago.la/1A6X2dP',
                    '1000 Seguidores Instagram': 'https://mpago.la/1zWWhUv'
                };

                // Check if product is a follower product
                const isFollowerProduct = product.title.includes('Seguidores');

                // Create the important notes
                const standardNote = directPurchaseLinks[product.title] 
                    ? `<div class="important-note">
                         <p>IMPORTANTE: Antes de comprar, lea preguntas frecuentes, sección 
                            <a href="FQ.html#comprar-ahora">¿Cómo funciona el botón "Comprar Ahora"?</a>
                         </p>
                       </div>`
                    : '';

                const followerNote = isFollowerProduct
                    ? `<div class="important-note">
                         <p>IMPORTANTE: Para productos seguidores, revisa preguntas frecuentes, sección 
                            <a href="FQ.html#compra-seguidores">¿Cómo funciona la compra de seguidores?</a>
                         </p>
                       </div>`
                    : '';

                // Determine which button to show
                const purchaseButton = directPurchaseLinks[product.title] 
                    ? `<a href="${directPurchaseLinks[product.title]}" class="buy-button" target="_blank" rel="noopener">Comprar Ahora</a>`
                    : `<a href="https://wa.me/56982195919?text=${encodeURIComponent(`Hola, estoy interesado en ${product.title}`)}" 
                        class="whatsapp-button" target="_blank" rel="noopener">
                        Comprar por WhatsApp
                       </a>`;

                detailContent.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="detail-info">
                        <h2>${product.title}</h2>
                        <p class="price">${product.price}</p>
                        ${standardNote}
                        ${followerNote}
                        <p class="description">${product.fullDescription}</p>
                        <ul class="features">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        ${purchaseButton}
                    </div>
                `;

                productsGrid.style.display = 'none';
                productDetail.style.display = 'block';
                window.scrollTo(0, 0);
            }

            // Handle back button
            backButton.addEventListener('click', () => {
                productDetail.style.display = 'none';
                productsGrid.style.display = 'grid';
            });

            // Initial display of products
            displayProducts();

            // Search and Filter Elements - Add validation
            const searchInput = document.getElementById('searchInput');
            const suggestionsContainer = document.getElementById('searchSuggestions');
            const categoryFilter = document.getElementById('categoryFilter');
            const minPriceInput = document.getElementById('minPrice');
            const maxPriceInput = document.getElementById('maxPrice');
            const sortBySelect = document.getElementById('sortBy');
            const clearFiltersBtn = document.getElementById('clearFilters');

            // Validate search functionality
            if (searchInput && suggestionsContainer) {
                let searchTimeout;
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchTimeout);
                    const searchTerm = e.target.value.toLowerCase();

                    searchTimeout = setTimeout(() => {
                        if (searchTerm.length >= 2) {
                            const suggestions = products.filter(product => 
                                product.title.toLowerCase().includes(searchTerm) ||
                                product.shortDescription.toLowerCase().includes(searchTerm)
                            );
                            showSuggestions(suggestions);
                        } else {
                            suggestionsContainer.style.display = 'none';
                        }
                    }, 300);
                });
            } else {
                console.warn('Search elements not found in the DOM');
            }

            function showSuggestions(suggestions) {
                if (suggestions.length === 0) {
                    suggestionsContainer.style.display = 'none';
                    return;
                }

                suggestionsContainer.innerHTML = suggestions
                    .slice(0, 5)
                    .map(product => `
                        <div class="suggestion-item" data-id="${product.id}">
                            <img src="${product.image}" alt="${product.title}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
                            <div class="suggestion-info">
                                <div class="suggestion-title">${product.title}</div>
                                <div class="suggestion-price">${product.price}</div>
                            </div>
                        </div>
                    `).join('');

                suggestionsContainer.style.display = 'block';

                // Add click handlers to suggestions
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const productId = item.dataset.id;
                        showProductDetail(productId);
                        suggestionsContainer.style.display = 'none';
                        searchInput.value = item.querySelector('.suggestion-title').textContent;
                    });
                });
            }

            // Add styles for suggestions
            const style = document.createElement('style');
            style.textContent = `
                .suggestion-item {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    border-bottom: 1px solid #eee;
                }

                .suggestion-item:last-child {
                    border-bottom: none;
                }

                .suggestion-item:hover {
                    background-color: #f3f4f6;
                }

                .suggestion-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .suggestion-title {
                    font-weight: 500;
                    color: #1a202c;
                }

                .suggestion-price {
                    color: #2563eb;
                    font-size: 0.9rem;
                }

                .suggestions-container {
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    margin-top: 0.5rem;
                    max-height: 300px;
                    overflow-y: auto;
                    background: white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
            `;
            document.head.appendChild(style);

            // Update the click outside handler
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    suggestionsContainer.style.display = 'none';
                }
            });

            // Filter functionality with validation
            function filterProducts() {
                if (!productsGrid) {
                    console.warn('Products grid element not found');
                    return;
                }

                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                const selectedCategory = categoryFilter ? categoryFilter.value : '';
                const minPrice = minPriceInput && minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
                const maxPrice = maxPriceInput && maxPriceInput.value ? parseFloat(maxPriceInput.value) : Infinity;
                const sortBy = sortBySelect ? sortBySelect.value : 'relevance';

                let filteredProducts = products.filter(product => {
                    const price = parseFloat(product.price.replace('$', '').replace('.', ''));
                    const matchesSearch = searchTerm === '' || 
                        product.title.toLowerCase().includes(searchTerm) ||
                        product.shortDescription.toLowerCase().includes(searchTerm);
                    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
                    const matchesPrice = price >= minPrice && price <= maxPrice;

                    return matchesSearch && matchesCategory && matchesPrice;
                });

                // Sort products
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace('$', '').replace('.', ''));
                    const priceB = parseFloat(b.price.replace('$', '').replace('.', ''));

                    switch (sortBy) {
                        case 'price-low':
                            return priceA - priceB;
                        case 'price-high':
                            return priceB - priceA;
                        case 'name':
                            return a.title.localeCompare(b.title);
                        default:
                            return 0;
                    }
                });

                // Update products display
                displayFilteredProducts(filteredProducts);

                // Update filter count
                updateFilterCount(filteredProducts.length);
            }

            // Add function to update filter count
            function updateFilterCount(count) {
                const countElement = document.getElementById('filterCount');
                if (countElement) {
                    countElement.textContent = `${count} producto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
                }
            }

            // Update clear filters functionality
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', () => {
                    if (searchInput) searchInput.value = '';
                    if (categoryFilter) categoryFilter.value = '';
                    if (minPriceInput) minPriceInput.value = '';
                    if (maxPriceInput) maxPriceInput.value = '';
                    if (sortBySelect) sortBySelect.value = 'relevance';
                    filterProducts();
                });
            }

            // Add animation for filtered products
            function displayFilteredProducts(filteredProducts) {
                productsGrid.style.opacity = '0';
                
                setTimeout(() => {
                    productsGrid.innerHTML = filteredProducts.length > 0 
                        ? filteredProducts.map(product => `
                            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                                <img src="${product.image}" alt="${product.title}">
                                <div class="product-info">
                                    <h3>${product.title}</h3>
                                    <p class="price" data-price="${product.price.replace('$', '').replace('.', '')}">${product.price}</p>
                                    <p class="description">${product.shortDescription}</p>
                                </div>
                            </div>
                        `).join('')
                        : '<div class="no-results">No se encontraron productos que coincidan con los criterios de búsqueda.</div>';

                    // Reattach click listeners
                    document.querySelectorAll('.product-card').forEach(card => {
                        card.addEventListener('click', () => showProductDetail(card.dataset.id));
                    });

                    // Fade in the products
                    productsGrid.style.opacity = '1';
                }, 300);
            }

            // Event listeners for filters with validation
            const filterElements = [
                { element: categoryFilter, name: 'category filter' },
                { element: minPriceInput, name: 'minimum price input' },
                { element: maxPriceInput, name: 'maximum price input' },
                { element: sortBySelect, name: 'sort select' }
            ];

            filterElements.forEach(({element, name}) => {
                if (element) {
                    element.addEventListener('change', filterProducts);
                } else {
                    console.warn(`${name} element not found`);
                }
            });

            // Clear filters with validation
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', () => {
                    if (searchInput) searchInput.value = '';
                    if (categoryFilter) categoryFilter.value = '';
                    if (minPriceInput) minPriceInput.value = '';
                    if (maxPriceInput) maxPriceInput.value = '';
                    if (sortBySelect) sortBySelect.value = 'relevance';
                    filterProducts();
                });
            } else {
                console.warn('Clear filters button not found');
            }

            // Initial display with validation
            if (productsGrid) {
                displayProducts();
            } else {
                console.warn('Products grid element not found for initial display');
            }
        }
    };

    // Start the application
    initializeApp();
});

// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactOptions = document.getElementById('contactOptions');
    const supportForm = document.getElementById('supportForm');
    const salesForm = document.getElementById('salesForm');
    
    if (contactOptions) {
        // Add click handlers for option cards
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                contactOptions.style.display = 'none';
                if (type === 'support') {
                    supportForm.style.display = 'block';
                    salesForm.style.display = 'none';
                } else {
                    salesForm.style.display = 'block';
                    supportForm.style.display = 'none';
                }
            });
        });

        // Back button functionality
        document.querySelectorAll('.back-to-options').forEach(button => {
            button.addEventListener('click', () => {
                contactOptions.style.display = 'grid';
                supportForm.style.display = 'none';
                salesForm.style.display = 'none';
            });
        });
    }
});

// WhatsApp link generator
function generateWhatsAppLink() {
    const name = document.getElementById('salesName').value;
    const product = document.getElementById('productSelect').value;
    const message = document.getElementById('salesMessage').value;

    if (!name || !product || !message) {
        alert('Por favor completa todos los campos');
        return;
    }

    const whatsappNumber = '56982195919'; // Updated phone number
    const text = `Hola, soy ${name}, tengo una consulta sobre ${product}. Mensaje: ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });

    return isValid;
}

// Enhanced Lazy Loading Implementation
function initializeLazyLoading() {
    const imageOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    };

    const loadImage = (img) => {
        try {
            const src = img.dataset.src;
            if (!src) {
                console.warn('No data-src found for image:', img);
                return;
            }

            // Create a new image to preload
            const tempImage = new Image();
            
            tempImage.onload = () => {
                img.src = src;
                img.classList.add('loaded');
                img.style.opacity = '1';
            };

            tempImage.onerror = () => {
                console.error('Error loading image:', src);
                // Add fallback image or placeholder
                img.src = 'path/to/fallback-image.jpg';
            };

            tempImage.src = src;
            
        } catch (error) {
            console.error('Error in loadImage:', error);
        }
    };

    // Feature Detection
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, imageOptions);
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
            // Add initial placeholder styling
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in';
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        document.querySelectorAll('img[data-src]').forEach(img => {
            loadImage(img);
        });
    }
}

// Initialize on DOM load and after dynamic content updates
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Re-run lazy loading when new content is added
function refreshLazyLoading() {
    initializeLazyLoading();
}

// Error handling for images
function handleImageError(img) {
    console.warn('Image failed to load:', img.dataset.src);
    img.src = 'path/to/fallback-image.jpg';
    img.classList.add('image-error');
}

// Initialize lazy loading after DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Popup functionality
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    if (!popup) return;

    // Function to show popup
    const showPopup = () => {
        popup.classList.add('show');
    };

    // Function to hide popup
    const hidePopup = () => {
        popup.classList.add('hiding');
        setTimeout(() => {
            popup.classList.remove('show', 'hiding');
        }, 300);
    };

    // Show popup after a small delay
    setTimeout(showPopup, 500);

    // Auto-hide popup after 3 seconds
    setTimeout(hidePopup, 3500);

    // Close button functionality
    const closeButton = popup.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    }

    // Close on background click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });

    // Prevent closing when clicking popup content
    const popupContent = popup.querySelector('.popup-content');
    if (popupContent) {
        popupContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            hidePopup();
        }
    });
});
