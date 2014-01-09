function populatePatientOverview(entry, patientInfo) {

	var title = entry.title;
	var patientID = patientInfo.key;
	var name = patientInfo.value;
	var dob = patientInfo.dob;
	var hosNumber = patientInfo.hosNumber;
	
	
	if(entry.content.telecom != null) {
		console.log('theres a telephone number');
		var phoneNumber = entry.content.telecom[0].value;
		var phoneNumberUse = entry.content.telecom[0].use;
	}
	
	if(entry.summary != null) {
		var summary = entry.summary;
	}
	
	if(entry.content.gender != null) {
		var gender = entry.content.gender.coding[0].display;
		//if its the old way
		if(gender == undefined)
		{
			console.log('its the old gender way');
			gender = entry.content.gender.coding[0].code;
		}
	}
	
	//TODO: Multiple addresses
	if(entry.content.address != null) {
		var addressUse = entry.content.address[0].use;
		var address = "";
		
		for(var j = 0; j < entry.content.address[0].line.length; j++)
		{
			address += '<BR/>'+entry.content.address[0].line[j];
		}
		if(entry.content.address[0].city != null) {
			address += '<BR/>'+entry.content.address[0].city;
		}
		if(entry.content.address[0].state != null) {
			address += '<BR/>'+entry.content.address[0].state;
		}
		if(entry.content.address[0].zip != null) {
			address += '<BR/>'+entry.content.address[0].zip;
		}
		if(entry.content.address[0].use != null) {
			var addressUse = entry.content.address[0].use;
		}
	}
	
	$('#patientOverviewHeader').text('Patient overview for ' + name);
	
	
	$('#patientOverviewRow').children('li').remove();
	
	$('#patientOverviewRow').append('<li>'+
					'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
						'<tr class="red">'+
							'<td class="statusRed"></td>'+
							'<td class="picture" ><img src="images/faces/faceImageTest.png"></td>'+
							'<td class="name"><h1>'+name+'<h1></td>'+
							'<td class="doctor">'+title+'</td>'+
						'</tr>'+
						'<tr>'+
							'<td colspan="4">'+
								'<table class="innerTable2" >'+
								'<tr>'+
									'<td><b>Date of Birth: </b>'+dob+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td><b>Gender: </b>'+gender+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td><b>Hospital Number: </b>'+hosNumber+'</td>'+
								'</tr>'+
								'<tr id ="phoneRow">'+
									'<td><b>Phone Number: </b>'+phoneNumber+' ('+phoneNumberUse+')</td>'+
								'</tr>'+
								'<tr id="addressRow">'+
									'<td><b>Address ('+addressUse+'): </b>'+address+'</td>'+
								'</tr>'+
								'</table>'+
							'</td>'+
						'</tr>'+
					'</table>'+
				'</li>');
				
	if(phoneNumber == undefined)
		$('#phoneRow').remove();
		
	if(address == undefined)
		$('#addressRow').remove();
	
}