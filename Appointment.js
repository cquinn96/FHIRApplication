function displayAppointments(entries, totalAppointments) {

	$('#appointmentCollabsibleSet').children('div').remove();
	$('#pageHeader').text(totalAppointments + ' appointment(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAppointment(entries[i].content, entries[i].content.start, i);
	}
}

function displayIndividualAppointment(content, appointmentTitle, rowNumber) {
	appendAppointmentTitle(appointmentTitle, rowNumber);

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