function displayAppointments(entries, totalAppointments) {

	$('#appointmentCollabsibleSet').children('div').remove();
	$('#pageHeader').text(totalAppointments + ' appointment(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAppointment(entries[i].content, i);
	}
}

function displayIndividualAppointment(content, rowNumber) {

	var startPeriod = content.start;
	var endPeriod = content.end;

	var startDate = startPeriod.substring(0,10);
	var endDate = endPeriod.substring(0,10);

	var startTime = startPeriod.substring(11,16);
	var endTime = endPeriod.substring(11,16);

	var title = 'Date: ' + startDate + ' Time: ' + startTime + ' - ' + endTime;
	appendAppointmentTitle(title, rowNumber);

	$('#appointment'+rowNumber).append('<p>'+content.description+'</p>');
	$("#appointmentCollabsibleSet" ).collapsibleset( "refresh" );							
}

function appendAppointmentTitle(appointmentTitle, rowNumber){									
	$('#appointmentCollabsibleSet').append(
									'<div data-role="collapsible" id="appointment'+rowNumber+'">'+
										'<h2>' + appointmentTitle +'</h2>'+
									'</div>'
									);
}