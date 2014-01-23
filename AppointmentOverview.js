function populateAppointmentOverview(appointment) {
	$.mobile.changePage("index.html#AppointmentOverviewPage");
	var startDate = appointment.startDate;
	var startTime = appointment.startTime;
	var endDate = appointment.endDate;
	var endTime = appointment.endTime;
	var priority = appointment.priority;
	var description = appointment.description;
	var comment = appointment.comment;

	$('#appointmentOverviewHeader').text(name);
	//remove all items in list
	$('#appointmentOverviewRow').children('li').remove();
	//populate new items for list
	$('#appointmentOverviewRow').append('<li> <i>Patient ID</i> - ' + patientID +'</li>'+
									'<li> <i>Patient Name</i> - '+ name+'</li>'+
									'<li> <i>Appointment Time</i> - ' + startTime +' - ' + endTime +'</li>'+
									'<li> <i>Appointment Date</i> - '+ startDate +'</li>'+
									'<li> <i>Priority</i> - ' + priority +'</li>'+
									'<li> <i>Description</i> - ' + description +'</li>'+
									'<li> <i>Comment</i> - ' + comment +'</li>');

	//if the listview exsists, refresh it, otherwise create it
	if ( $('#appointmentOverviewRow').hasClass('ui-listview')) {
		console.log('Refereshing the listview');
    	$('#appointmentOverviewRow').listview('refresh');
     } 
	else {
    	$('#appointmentOverviewRow').trigger('create');
     }
}