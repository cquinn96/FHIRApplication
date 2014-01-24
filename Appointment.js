var patientAppointments = [];

function displayAppointments(entries, totalAppointments) {

	$('#appointmentListView').children('li').remove();
	$('#pageHeader').text(totalAppointments + ' appointment(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAppointment(entries[i].content, i);
	}
	$('#appointmentListView').listview("refresh");
}

// function displayIndividualAppointment(content, rowNumber) {

// 	var startPeriod = content.start;
// 	var endPeriod = content.end;

// 	var startDate = startPeriod.substring(0,10);
// 	var endDate = endPeriod.substring(0,10);

// 	var startTime = startPeriod.substring(11,16);
// 	var endTime = endPeriod.substring(11,16);

// 	var title = 'Date: ' + startDate + ' Time: ' + startTime + ' - ' + endTime;
// 	appendAppointmentTitle(title, rowNumber);

// 	$('#appointment'+rowNumber).append('<p>'+content.description+'</p>');
// 	$("#appointmentCollabsibleSet" ).collapsibleset( "refresh" );							
// }

// function appendAppointmentTitle(appointmentTitle, rowNumber){									
// 	$('#appointmentCollabsibleSet').append(
// 									'<div data-role="collapsible" id="appointment'+rowNumber+'">'+
// 										'<h2>' + appointmentTitle +'</h2>'+
// 									'</div>'
// 									);
// }

function displayIndividualAppointment(content, rowNumber) {

	var startPeriod = content.start;
	var endPeriod = content.end;

	var startDate = startPeriod.substring(0,10);
	var endDate = endPeriod.substring(0,10);

	var startTime = startPeriod.substring(11,16);
	var endTime = endPeriod.substring(11,16);

	var patientRef = content.participant[0].individual[0].reference;
	var patientID = patientRef.replace( /^\D+/g, '');
	var patientName = content.participant[0].individual[0].display;

	var title = patientName + ' - ' + startDate + ' Time: ' + startTime + ' - ' + endTime;
	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="#">'+title+'</a></li>');
	//appendAppointmentTitle(title, rowNumber);



	console.log(patientID);
	console.log(patientName);
	
	patientAppointments[rowNumber] = {
		startDate: startDate,
		startTime: startTime,
		endDate: endDate,
		endTime: endTime,
		priority: content.priority,
		description: content.description, 
		comment: content.comment,
		patientID: patientID,
		patientName: patientName
	};
}

function appendAppointmentTitle(appointmentTitle, rowNumber){									
	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="index.html">'+appointmentTitle+'</a></li>');
}