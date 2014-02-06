function populateLocationOverview(entry) {

	var title = entry.title;
	var locationID = title.match(/"([^"]+)"/)[1];

	var content = entry.content;

	var identifier = content.identifier.value;
	var name = content.name;
	var description = content.description;
	var phoneNumber = content.telecom.value;
	var physicalType = content.physicalType.coding[0].display;

	// actual position
	var longitude = content.position.longitude;
	var latitude = content.position.latitude;
	var altitude = content.position.altitude;

	var status = content.status;

	var fullOrg = content.managingOrganization.reference;
	var lastPart = fullOrg.split("/").pop();
	console.log('managingOrganization: ' + lastPart);

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
	$('#locationOverviewRow').append('<li> <i>Location ID</i> - ' + locationID +'</li>'+
									'<li> <i>Name</i> - '+ name +'</li>'+
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

    // google.maps.event.addDomListener(window, 'load', setUpMap);
    // setUpMap();

    google.maps.event.addDomListener(window, 'load', initialize);
}

function initialize() {
	console.log('initialising');
var mapOptions = {
  center: new google.maps.LatLng(-34.397, 150.644),
  zoom: 8
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
	console.log('finished initialize');
}




// function setUpMap() {
// 	console.log('Setting up map...');
//         var mapOptions = {

	//Latitude, Longitude
//           center: new google.maps.LatLng(4.844614000123024, 52.37799399970903),
//           zoom: 8
//         };
//         var map = new google.maps.Map(document.getElementById("map-canvas"),
//             mapOptions);
//       }
