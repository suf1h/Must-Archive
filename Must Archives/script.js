// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // Modal Functionality
    const reportLostBtn = document.getElementById('report-lost-btn');
    const reportFoundBtn = document.getElementById('report-found-btn');
    const reportModal = document.getElementById('report-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open modal for reporting lost item
    if (reportLostBtn && reportModal) {
        reportLostBtn.addEventListener('click', function() {
            reportModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Open modal for reporting found item
    if (reportFoundBtn && reportModal) {
        reportFoundBtn.addEventListener('click', function() {
            reportModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close modals
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });

    // View Details Button Functionality
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const detailsModal = document.getElementById('details-modal');
    const itemDetailsContent = document.getElementById('item-details-content');
    
    if (viewDetailsBtns.length > 0 && detailsModal && itemDetailsContent) {
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const itemCard = this.closest('.item-card');
                const itemName = itemCard.querySelector('h3').textContent;
                const itemDescription = itemCard.querySelector('.item-description')?.textContent || 'No description available';
                const itemLocation = itemCard.querySelector('.item-details p:nth-of-type(1)')?.textContent || '';
                const itemDate = itemCard.querySelector('.item-details p:nth-of-type(2)')?.textContent || '';
                const itemContact = itemCard.querySelector('.item-details p:nth-of-type(3)')?.textContent || '';
                const itemImage = itemCard.querySelector('.item-image img').src;
                
                // Create details content
                let detailsHTML = `
                    <div class="item-details-modal">
                        <div class="item-details-image">
                            <img src="${itemImage}" alt="${itemName}">
                        </div>
                        <div class="item-details-info">
                            <h3>${itemName}</h3>
                            <p><strong>Description:</strong> ${itemDescription}</p>
                            <p>${itemLocation}</p>
                            <p>${itemDate}</p>
                            <p>${itemContact}</p>
                            <div class="item-details-actions">
                                <a href="claim-item.html" class="btn primary-btn">Claim This Item</a>
                            </div>
                        </div>
                    </div>
                `;
                
                itemDetailsContent.innerHTML = detailsHTML;
                detailsModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }

    // Form Validation
    const reportLostForm = document.getElementById('report-lost-form');
    const reportFoundForm = document.getElementById('report-found-form');
    const claimForm = document.getElementById('claim-form');
    const contactForm = document.getElementById('contact-form');
    
    // Report Lost Form Submission
    if (reportLostForm) {
        reportLostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your lost item report has been submitted successfully!');
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
            this.reset();
        });
    }
    
    // Report Found Form Submission
    if (reportFoundForm) {
        reportFoundForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your found item report has been submitted successfully!');
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
            this.reset();
        });
    }
    
    // Claim Form Submission
    if (claimForm) {
        claimForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your claim has been submitted successfully! We will review your claim and contact you soon.');
            this.reset();
        });
        
        // Show/hide "Other Relationship" field based on selection
        const relationshipSelect = document.getElementById('relationship');
        const otherRelationshipGroup = document.getElementById('other-relationship-group');
        
        if (relationshipSelect && otherRelationshipGroup) {
            relationshipSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherRelationshipGroup.style.display = 'block';
                } else {
                    otherRelationshipGroup.style.display = 'none';
                }
            });
        }
    }
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent successfully! We will get back to you soon.');
            this.reset();
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const itemCards = document.querySelectorAll('.item-card');
    
    if (searchInput && searchBtn && itemCards.length > 0) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            itemCards.forEach(card => {
                const itemName = card.querySelector('h3').textContent.toLowerCase();
                const itemDescription = card.querySelector('.item-description')?.textContent.toLowerCase() || '';
                
                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Reset search when input is cleared
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                itemCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    }

    // Filter Functionality
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const dateFilter = document.getElementById('date-filter');
    
    function applyFilters() {
        if (!itemCards.length) return;
        
        const categoryValue = categoryFilter ? categoryFilter.value.toLowerCase() : '';
        const locationValue = locationFilter ? locationFilter.value.toLowerCase() : '';
        const dateValue = dateFilter ? dateFilter.value.toLowerCase() : '';
        
        itemCards.forEach(card => {
            const itemCategory = card.dataset.category || '';
            const itemLocation = card.querySelector('.item-details p:nth-of-type(1)')?.textContent.toLowerCase() || '';
            const itemDate = card.querySelector('.item-details p:nth-of-type(2)')?.textContent.toLowerCase() || '';
            
            let showCard = true;
            
            if (categoryValue && !itemCategory.includes(categoryValue)) {
                showCard = false;
            }
            
            if (locationValue && !itemLocation.includes(locationValue)) {
                showCard = false;
            }
            
            if (dateValue) {
                // Simple date filtering logic - can be enhanced for real implementation
                if (dateValue === 'today' && !itemDate.includes('today')) {
                    showCard = false;
                } else if (dateValue === 'this-week' && !itemDate.includes('week')) {
                    showCard = false;
                } else if (dateValue === 'this-month' && !itemDate.includes('month')) {
                    showCard = false;
                }
            }
            
            card.style.display = showCard ? 'block' : 'none';
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }

    // Initialize Google Map
    initMap();
});

// Google Maps Initialization
function initMap() {
    // Check if map container exists
    const mapElement = document.getElementById('map');
    const campusMapElement = document.getElementById('campus-map');
    
    if (mapElement || campusMapElement) {
        // Mbarara University coordinates (approximate)
        const mustCoordinates = { lat: -0.6166, lng: 30.6549 };
        
        // Create map options
        const mapOptions = {
            zoom: 15,
            center: mustCoordinates,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    featureType: 'poi.school',
                    elementType: 'geometry',
                    stylers: [{ color: '#006400' }]
                }
            ]
        };
        
        // Create map in homepage
        if (mapElement) {
            const map = new google.maps.Map(mapElement, mapOptions);
            
            // Add marker for MUST
            const marker = new google.maps.Marker({
                position: mustCoordinates,
                map: map,
                title: 'Mbarara University of Science and Technology',
                animation: google.maps.Animation.DROP
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: '<div><h3>Mbarara University of Science and Technology</h3><p>Lost & Found Office: Admin Block, Ground Floor, Room 12</p></div>'
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
            
            // Add sample lost/found item markers
            const lostItems = [
                { position: { lat: -0.6170, lng: 30.6545 }, title: 'Lost Laptop', type: 'lost' },
                { position: { lat: -0.6160, lng: 30.6540 }, title: 'Lost ID Card', type: 'lost' },
                { position: { lat: -0.6155, lng: 30.6560 }, title: 'Lost Textbook', type: 'lost' }
            ];
            
            const foundItems = [
                { position: { lat: -0.6175, lng: 30.6550 }, title: 'Found Wallet', type: 'found' },
                { position: { lat: -0.6165, lng: 30.6555 }, title: 'Found Keys', type: 'found' },
                { position: { lat: -0.6180, lng: 30.6545 }, title: 'Found Umbrella', type: 'found' }
            ];
            
            // Create markers for lost items
            lostItems.forEach(item => {
                const marker = new google.maps.Marker({
                    position: item.position,
                    map: map,
                    title: item.title,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#dc3545',
                        fillOpacity: 1,
                        strokeWeight: 0,
                        scale: 8
                    }
                });
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><h3>${item.title}</h3><p>Status: Lost</p><a href="lost-items.html">View Details</a></div>`
                });
                
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
            });
            
            // Create markers for found items
            foundItems.forEach(item => {
                const marker = new google.maps.Marker({
                    position: item.position,
                    map: map,
                    title: item.title,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#28a745',
                        fillOpacity: 1,
                        strokeWeight: 0,
                        scale: 8
                    }
                });
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><h3>${item.title}</h3><p>Status: Found</p><a href="found-items.html">View Details</a></div>`
                });
                
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
            });
        }
        
        // Create map in contact page
        if (campusMapElement) {
            const campusMap = new google.maps.Map(campusMapElement, mapOptions);
            
            // Add marker for MUST
            const marker = new google.maps.Marker({
                position: mustCoordinates,
                map: campusMap,
                title: 'Mbarara University of Science and Technology',
                animation: google.maps.Animation.DROP
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: '<div><h3>Mbarara University of Science and Technology</h3><p>Lost & Found Office: Admin Block, Ground Floor, Room 12</p></div>'
            });
            
            marker.addListener('click', function() {
                infoWindow.open(campusMap, marker);
            });
            
            // Add marker for Lost & Found Office
            const officeMarker = new google.maps.Marker({
                position: { lat: -0.6168, lng: 30.6552 },
                map: campusMap,
                title: 'Lost & Found Office',
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#ffc107',
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 8
                }
            });
            
            const officeInfoWindow = new google.maps.InfoWindow({
                content: '<div><h3>Lost & Found Office</h3><p>Admin Block, Ground Floor, Room 12</p><p>Open: Monday-Friday, 9:00 AM - 4:00 PM</p></div>'
            });
            
            officeMarker.addListener('click', function() {
                officeInfoWindow.open(campusMap, officeMarker);
            });
        }
    }
}

// Fallback for Google Maps API failure
function handleMapError() {
    const mapElement = document.getElementById('map');
    const campusMapElement = document.getElementById('campus-map');
    
    if (mapElement) {
        mapElement.innerHTML = '<div class="map-error"><p>Unable to load map. Please check your internet connection.</p></div>';
        mapElement.style.display = 'flex';
        mapElement.style.justifyContent = 'center';
        mapElement.style.alignItems = 'center';
        mapElement.style.backgroundColor = '#f8f9fa';
    }
    
    if (campusMapElement) {
        campusMapElement.innerHTML = '<div class="map-error"><p>Unable to load map. Please check your internet connection.</p></div>';
        campusMapElement.style.display = 'flex';
        campusMapElement.style.justifyContent = 'center';
        campusMapElement.style.alignItems = 'center';
        campusMapElement.style.backgroundColor = '#f8f9fa';
    }
}

// If Google Maps API fails to load
window.gm_authFailure = handleMapError;