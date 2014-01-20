function populatePatientOverview(entry) {

	// calls getPatientDetials in EventHandlers.js
	var patient = getPatientDetails(entry);
	
	var patientID = patient.key;
	var name = patient.value;
	var dob = patient.dob;
	var hosNumber = patient.hosNumber;

	// var title = entry.title;
	// var patientID = patient.key;
	// var name = patient.value;
	// var dob = patient.dob;
	// var hosNumber = patient.hosNumber;
	
	
	if(entry.content.telecom != null) {
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

	if(address == undefined)
			address = 'No data';

	if(phoneNumber == undefined)
		phoneNumber = 'No data';

	if(dob == undefined)
		dob = 'No data';

	
	$('#patientOverviewHeader').text(name);
	//remove all items in list
	$('#patientOverviewRow').children('li').remove();
	//populate new items for list
	$('#patientOverviewRow').append('<li> <i>Patient ID</i> - ' + patientID +'</li>'+
									'<li> <i>Hospital Number</i> - '+hosNumber+'</li>'+
									'<li> <i>Patient Name</i> - ' + name +'</li>'+
									'<li> <i>Date of Birth</i> - '+dob+'</li>'+
									'<li> <i>Phone Number</i> - ' + phoneNumber +'</li>'+
									'<li> <i>Address</i> - ' + address +'</li>');

	//refresh list view, must be done in order to style
	$("#patientOverviewRow").listview("refresh");
				
	$('#uploadCarePlan').click(function() {
		gotoCarePlanUploadPage(patientInfo);
	});
				
	if(phoneNumber == undefined)
		$('#phoneRow').remove();
		
	if(address == undefined)
		$('#addressRow').remove();
	
}

function diagnosticReportClick(){
	$.mobile.loading('show');
	//fetch diag report and change page 
	//fetchDiagnosticReport(patientID, name);
	fetchResourceByPatientID(patientID, name, 'Diagnosticreport');
}

function carePlanClick(){
	$.mobile.loading('show');
	//fetch care plan
    //fetchCarePlan(patientID, name);
	fetchResourceByPatientID(patientID, name, 'careplan');

	//fetchResourceByPatientID(patient, 'careplan');
}

function addCarePlan(){
	//fetch care plan
	gotoCarePlanUploadPage();
}

function gotoCarePlanUploadPage() {
	$.mobile.changePage("index.html#UploadCarePlan");
}
