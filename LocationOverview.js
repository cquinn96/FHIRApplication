var latitude;
var longitude;
var name;

function populateLocationOverview(entry) {

	var title = entry.title;
	var locationID = title.match(/"([^"]+)"/)[1];

	var content = entry.content;

	var identifier = content.identifier.value;
	name = content.name;
	var description = content.description;
	var phoneNumber = content.telecom.value;
	var physicalType = content.physicalType.coding[0].display;

	// actual position
	latitude = content.position.latitude;
	longitude = content.position.longitude;
	var altitude = content.position.altitude;

	var status = content.status;

	var fullOrg = content.managingOrganization.reference;
	var lastPart = fullOrg.split("/").pop();
	//console.log('managingOrganization: ' + lastPart);

	if(entry.content.address != null) {
		var addressUse = content.address.use;
		var address = "";
		
		for(var j = 0; j < content.address.line.length; j++)
		{
			address += '<BR/>'+content.address.line[j];
		}
		if(entry.content.address.city != null) {
			address += '<BR/>'+content.address.city;
		}
		if(entry.content.address.state != null) {
			address += '<BR/>'+content.address.state;
		}
		if(entry.content.address.zip != null) {
			address += '<BR/>'+content.address.zip;
		}
		if(entry.content.address.country != null) {
			address += '<BR/>'+content.address.country;
		}
		if(entry.content.address.use != null) {
			var addressUse = content.address.use;
		}
	}

	$('#locationOverviewHeader').text(name);
	//remove all items in list
	$('#locationOverviewRow').children('li').remove();
	//populate new items for list
	$('#locationOverviewRow').append('<li> <i>Name</i> - '+ name +'</li>'+
		'<li> <i>Identifier</i> - '+ identifier +'</li>'+
		'<li> <i>Type</i> - '+ physicalType +'</li>'+
		'<li> <i>Phone</i> - ' + phoneNumber +'</li>'+
		'<li> <i>Description</i> - ' + description +'</li>'+
		'<li> <i>Address</i> - ' + address +'</li>');

	//if the listview exsists, refresh it, otherwise create it
	if ( $('#locationOverviewRow').hasClass('ui-listview')) {
		$('#locationOverviewRow').listview('refresh');
	} 
	else {
		$('#locationOverviewRow').trigger('create');
	}
}

//NORMAL MAP
// function initialize() {
// var mapOptions = {
//   center: new google.maps.LatLng(54.59488, -5.9266324),
//   zoom: 12
// };
// var map = new google.maps.Map(document.getElementById("map-canvas"),
//     mapOptions);
// }


//MAP WITH MARKER
// function initialize() {
//   var myLatlng = new google.maps.LatLng(54.59488, -5.9266324);
//   var mapOptions = {
//     zoom: 12,
//     center: myLatlng
//   }
//   var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//   var marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       title: 'Hello World!'
//   });
// }

//GEOLOCATION
// var map;
// var pos;
// var directionsService;
// var directionsDisplay;

// function initialize() {
// 	directionsService = new google.maps.DirectionsService();
// 	directionsDisplay = new google.maps.DirectionsRenderer();
//   var mapOptions = {
//     zoom: 12
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   // Try HTML5 geolocation
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);

//       var infowindow = new google.maps.InfoWindow({
//         map: map,
//         position: pos,
//         content: 'You are here.'
//       });

//       map.setCenter(pos);
//       //calcRoute();
//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }

//   var start = new google.maps.LatLng(54.5871171, -5.9338856);
//   var end = new google.maps.LatLng(54.5873447, -5.9404864);
//   var request = {
//       origin:start,
//       destination:end,
//       travelMode: google.maps.TravelMode.DRIVING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     }
//   });
// }

// function handleNoGeolocation(errorFlag) {
//   if (errorFlag) {
//     var content = 'Error: The Geolocation service failed.';
//   } else {
//     var content = 'Error: Your browser doesn\'t support geolocation.';
//   }

//     pos = new google.maps.LatLng(54.5871171, -5.9338856);
//    console.log('Pos in handleNoGeolocation: ' + pos);
//   var options = {
//     map: map,
//     position: pos,
//     content: content
//   };

//   var infowindow = new google.maps.InfoWindow(options);
//   map.setCenter(options.position);
//   map.setCenter(pos);
//   calcRoute();
// }

var directionsDisplay;
var directionsService;
var map;
var pos;
var kainos;
var mapOptions;

function initialize() {
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	belfast = new google.maps.LatLng(54.59488, -5.9266324);
	kainos = new google.maps.LatLng(54.5871171, -5.9338856);

  // HTML5 geolocation
  if(navigator.geolocation) { //Checks if browser supports geolocation
  	navigator.geolocation.getCurrentPosition(function(position) {
  		pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // var infowindow = new google.maps.InfoWindow({
      //   map: map,
      //   position: pos,
      //   content: 'You are here.'
      // });

		mapOptions = {
			zoom: 16,
			center: pos
		}

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		directionsDisplay.setMap(map);
		calcRoute();

	}, function() {
	      //handleNoGeolocation(true);
	      	// Kainos
	      	pos = new google.maps.LatLng(54.5871171, -5.9338856);
	      	mapOptions = {
	      		zoom: 16,
	      		center: pos
	      	}
	      	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  		//directionsDisplay.setMap(map);
	  		//calcRoute();

			handleNoGeolocation(true);
	  	});
	}
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

	var options = {
		map: map,
		position: pos,
		zoom: 16,
		content: content
	};
	var infowindow = new google.maps.InfoWindow(options);

	var end = new google.maps.LatLng(latitude, longitude);
	if (longitude == '54.5873447' || longitude == undefined){
		end = new google.maps.LatLng(54.5873447, -5.9404864);
	}

	var marker = new google.maps.Marker({
		position: end,
		map: map,
		zoom: 16,
		animation: google.maps.Animation.DROP
	});

	//var marker = new google.maps.Marker({map: map, position: point, clickable: true});

	marker.info = new google.maps.InfoWindow({
	  content: name
	});

	google.maps.event.addListener(marker, 'click', function() {
	  marker.info.open(map, marker);
	});

}


function calcRoute() {
	var start = pos;
	var end = new google.maps.LatLng(latitude, longitude);
  	if (longitude == '54.5873447' || longitude == undefined) {
  		end = new google.maps.LatLng(54.5873447, -5.9404864);
  	}

  	var request = {
  		origin:start,
  		destination:end,
  		travelMode: google.maps.TravelMode.DRIVING
  	};
  	directionsService.route(request, function(response, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
  			directionsDisplay.setDirections(response);
  		}
	});
}

//DIRECTIONS
// var directionsDisplay;
// var directionsService;
// var map;
// var belfast;
// var kainos;

// function initialize() {
// 	directionsService = new google.maps.DirectionsService();
//   	directionsDisplay = new google.maps.DirectionsRenderer();
//   	belfast = new google.maps.LatLng(54.59488, -5.9266324);
//   	kainos = new google.maps.LatLng(54.5871171, -5.9338856);
//   //var belfast = new google.maps.LatLng(54.59488, -5.9266324);
//   var mapOptions = {
//     zoom: 12,
//     center: belfast
//   }
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   directionsDisplay.setMap(map);
//   calcRoute();
// }

// function calcRoute() {
//   var start = kainos;
//   var end = new google.maps.LatLng(54.5873447, -5.9404864);
//   var request = {
//       origin:start,
//       destination:end,
//       travelMode: google.maps.TravelMode.DRIVING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     }
//   });
// }