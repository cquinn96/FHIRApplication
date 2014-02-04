var prescriptions = [];

function displayPrescriptions(entries, totalPrescriptions) {

	prescriptions = [];

	$('#prescriptionListView').children('li').remove();
	$('#pageHeader').text(totalPrescriptions + ' prescription(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualPrescription(entries[i].content, i, entries[i].title);
	}

	// 	// If the prescription isnt active dont show it

	$('#prescriptionListView').listview("refresh");
}

function displayIndividualPrescription(content, rowNumber, title) {

	var status = content.status;
	var prescriptionID = title.match(/"([^"]+)"/)[1];

	var patientRef = content.patient.reference;
	var patientID = patientRef.replace( /^\D+/g, '');
	var patientName = content.patient.display;

	var prescriberRef = content.prescriber.reference;
	var prescriberID = prescriberRef.replace( /^\D+/g, '');
	var prescriberName = content.prescriber.display;

	var medicationRef = content.medication.reference;
	var medicationID = medicationRef.replace( /^\D+/g, '');
	var medicationName = content.medication.display;

	// Duration is the number you take at the time
	var amount = content.dosageInstruction[0].timingSchedule.repeat.duration;
	// Frequency is how often you take it in a certain timeframe
	var frequency = content.dosageInstruction[0].timingSchedule.repeat.frequency;
	// Timeframe is a certain time eg a day, week, month
	var timeframe = content.dosageInstruction[0].timingSchedule.repeat.units;
	// Dose is the amount to take at a time
	var doseQuantity = content.dosageInstruction[0].doseQuantity.value;
	var doseUnits = content.dosageInstruction[0].doseQuantity.units;
	// Administration route
	var route = content.dosageInstruction[0].route.coding[0].display;

	/// Size dispensed in total
	var dispenseQuantity = content.dispense.quantity.value;
	var dispenseUnits = content.dispense.quantity.units;

	console.log()

	var title = medicationName;
	//appendAppointmentTitle(title, rowNumber);
	$('#prescriptionListView').append('<li id="prescription'+prescriptionID+'"><a href="#">'+title+'</a></li>');

	prescriptions[rowNumber] = {
		prescriptionID: prescriptionID,
		status: status,
		patientID: patientID,
		patientName: patientName,
		prescriberID: prescriberID,
		prescriberName: prescriberName,
		medicationID: medicationID,
		medicationName: medicationName,
		amount: amount,
		frequency: frequency,
		timeframe: timeframe,
		doseQuantity: doseQuantity,
		doseUnits: doseUnits,
		route: route,
		dispenseQuantity: dispenseQuantity,
		dispenseUnits: dispenseUnits
	};

	//$('#appointmentListView').append('<li date="'+startDate+'" id="appointment'+appointmentID+'"><a href="#">'+title+'</a></li>');
}

// function appendAppointmentTitle(appointmentTitle, rowNumber){									
// 	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="index.html">'+appointmentTitle+'</a></li>');
// }