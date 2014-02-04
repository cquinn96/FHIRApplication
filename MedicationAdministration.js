var medicationAdministrations = [];

function displayMedicationAdministrations(entries, totalAdministrations) {

	medicationAdministrations = [];

	$('#administrationListView').children('li').remove();
	$('#pageHeader').text(totalAdministrations + ' medication administration(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAdministration(entries[i].content, i, entries[i].title);
	}

	for(var i = 0; i < medicationAdministrations.length; i++)
	{
		var title = medicationAdministrations[i].startTime + ' - ' + medicationAdministrations[i].medicationName;
		$('#administrationListView').append('<li date="'+medicationAdministrations[i].startDate+'" id="administration'+medicationAdministrations[i].administrationID+'"><a href="#">'+title+'</a></li>');
	}

	$('#administrationListView').listview("refresh");

	$("#administrationListView").listview({
		    autodividers: true,
		    autodividersSelector: function (li) {
		        var out = li.attr('date');
		        return out;
		    }
		}).listview('refresh');
}

function displayIndividualAdministration(content, rowNumber, title) {
	var status = content.status;
	var administrationID = title.match(/"([^"]+)"/)[1];

	var startPeriod = content.whenGiven.start;
	var endPeriod = content.whenGiven.end;
	var startDate = startPeriod.substring(0,10);
	var endDate = endPeriod.substring(0,10);

	var realStartDate = createDate(startDate);

	var startTime = startPeriod.substring(11,16);
	var endTime = endPeriod.substring(11,16);

	var patientRef = content.patient.reference;
	var patientID = patientRef.replace( /^\D+/g, '');
	var patientName = content.patient.display;

	var practitionerRef = content.practitioner.reference;
	var practitionerID = practitionerRef.replace( /^\D+/g, '');
	var practitionerName = content.practitioner.display;

	var prescriptionRef = content.practitioner.reference;
	var prescriptionID = prescriptionRef.replace( /^\D+/g, '');

	var medicationRef = content.medication.reference;
	var medicationID = medicationRef.replace( /^\D+/g, '');
	var medicationName = content.medication.display;

	// Dose is the amount to take at a time
	var doseQuantity = content.dosage[0].quantity.value;
	var doseUnits = content.dosage[0].quantity.units;
	// Administration route
	var route = content.dosage[0].route.coding[0].display;



	// var title = startTime + ' - ' + medicationName;
	// //appendAppointmentTitle(title, rowNumber);
	// $('#administrationListView').append('<li id="administration'+administrationID+'"><a href="#">'+title+'</a></li>');

	medicationAdministrations[rowNumber] = {
		administrationID: administrationID,
		prescriptionID: prescriptionID,
		status: status,
		patientID: patientID,
		patientName: patientName,
		practitionerID: practitionerID,
		practitionerName: practitionerName,
		medicationID: medicationID,
		medicationName: medicationName,
		startDate: startDate,
		realDate: realStartDate,
		startTime: startTime,
		endDate: endDate,
		endTime: endTime,
		doseQuantity: doseQuantity,
		doseUnits: doseUnits,
		route: route
	};

	medicationAdministrations.sort(function(a,b){
  	a = new Date(a.realDate);
  	b = new Date(b.realDate);
  	return a<b?-1:a>b?1:0;
	});

}