var map;
var infoWindow;
var service;
var searchLocation;
var lat;
var lng;
function initialize(searchLocation) {
    var geocoder = new google.maps.Geocoder();
    var address = searchLocation.toString().toLowerCase() + ', us';
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            lat = results[0].geometry.location.lat();

            lng = results[0].geometry.location.lng();
        }


        map = new google.maps.Map(document.getElementById('map'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(lat, lng),
            zoom: 9,
            styles: [
              {
                  stylers: [
                    { visibility: 'simplified' }
                  ]
              },
              {
                  elementType: 'labels',
                  stylers: [
                    { visibility: 'on' }
                  ]
              }
            ]
        });

        infoWindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
    });
}

function performSearch() {
   
    var request = {
        location: new google.maps.LatLng(lat, lng),
        radius: 30000,
        //keyword: 'social+security',
        keyword:'Infosys+Technologies+Ltd',
        //types:['local_government_office']
        types:['establishment']

    };
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        createMarker(result);
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png',
        reference: place.reference
    });

    //var placesList = document.getElementById('results');

    //placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.name + '</p>';

    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(place, function (result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            
            infoWindow.setContent(result.name + "\n"+ result.formatted_address);
            infoWindow.open(map, marker);
        });
    });

}


