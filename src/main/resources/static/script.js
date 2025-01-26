let map;
let service;
let infowindow;

function initMap() {
    const location = new google.maps.LatLng(-33.867, 151.195); // Example coordinates (Sydney)
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
    });

    const request = {
        location: location,
        radius: '500',
        type: ['store'], // You can change this to other types like 'restaurant', 'cafe', etc.
    };

    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();

    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('search-input').value;
        searchShops(query);
    });
}

function searchShops(query) {const request = {
    location: map.getCenter(),
    radius: '500',
    keyword: query,
};

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers(); // Clear previous markers
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
    });
}

function clearMarkers() {
    // Logic to clear existing markers from the map
    if (markers) {
        markers.forEach(marker => marker.setMap(null));
    }
    markers = [];
}

// Initialize the map
window.addEventListener('load', initMap);
