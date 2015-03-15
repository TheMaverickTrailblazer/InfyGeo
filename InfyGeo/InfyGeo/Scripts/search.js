var map;
var infoWindow;
var service;
var searchLocation;
var lat;
var lng;
var searchkeyword;
var searchtypes;
var searchRadius;

function initialize(searchLocation, keyword, types, radius, placesList, fromPlaces) {
    searchkeyword = keyword;
    searchtypes = types;
    searchRadius = radius;
    if (!fromPlaces) {
        if (!placesList) {
            var placesList = document.getElementById('results');
        }

        placesList.innerHTML = "";
    }

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
            zoom: searchtypes == '' ? 12 : 9,
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
        if (!fromPlaces) {
            google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
        }
        else {
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(lat, lng),
                icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png'
            });
        }
    });
}

function performSearch() {
    if (searchtypes != '') {
        var request = {
            location: new google.maps.LatLng(lat, lng),
            radius: 30000,
            //keyword: 'social+security',
            keyword: searchkeyword,
            //types:['local_government_office']
            types: searchtypes
        };
    }
    else {
        var request = {
            location: new google.maps.LatLng(lat, lng),
            radius: searchRadius,
            keyword: searchkeyword
        };

    }
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

    var placesList = document.getElementById('results');

    if (place.vicinity.toString().toLowerCase().indexOf('hunters') != -1) {
        placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.name + '<br/>' + place.vicinity + '<br/>' + '<strong>10 Infoscians working with same client as you stay here.</strong> </p>';
    }
    else if (place.vicinity.toString().toLowerCase().indexOf('fox run drive') != -1) {
        placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.name + '<br/>' + place.vicinity + '<br/>' + '<strong>30 Infoscians working with same client as you stay here.</strong> </p>';
    }
    else {
        placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.name + '<br/>' + place.vicinity + '</p>';
    }

    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(place, function (result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                return;
            }

            infoWindow.setContent(result.name + "\n" + result.formatted_address);
            infoWindow.open(map, marker);
        });
    });
}

function initializeMapLocation(placesArr) {
    for (var i = 0; i < placesArr.length; i++) {
        var geocoder = new google.maps.Geocoder();
        var address = placesArr[i].toString().toLowerCase() + ', us';
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                lat = results[0].geometry.location.lat();

                lng = results[0].geometry.location.lng();
            }

            if (!map) {
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

            }
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(lat, lng),
                icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png'
            });
        });
    }
}


