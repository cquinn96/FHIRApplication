var patientAppointments = [];

function displayAppointments(entries, totalAppointments) {

	$('#appointmentListView').children('li').remove();
	$('#pageHeader').text(totalAppointments + ' appointment(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAppointment(entries[i].content, i, entries[i].title);
	}
	$('#appointmentListView').listview("refresh");

	// $("#appointmentListView").listview({
	// 	    autodividers: true,
	// 	    autodividersSelector: function (li) {
	// 	        var out = li.attr('date');
	// 	        return out;
	// 	    }
	// 	}).listview('refresh');
}

// function displayIndividualAppointment(content, rowNumber) {

// 	var startPeriod = content.start;
// 	var endPeriod = content.end;

// 	var startDate = startPeriod.substring(0,10);
// 	var endDate = endPeriod.substring(0,10);

// 	var startTime = startPeriod.substring(11,16);
// 	var endTime = endPeriod.substring(11,16);

// 	var patientRef = content.participant[0].individual[0].reference;
// 	var patientID = patientRef.replace( /^\D+/g, '');
// 	var patientName = content.participant[0].individual[0].display;

// 	var title = patientName + ' - ' + startDate + ' Time: ' + startTime + ' - ' + endTime;
// 	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="#">'+title+'</a></li>');
// 	//appendAppointmentTitle(title, rowNumber);
	
// 	patientAppointments[rowNumber] = {
// 		startDate: startDate,
// 		startTime: startTime,
// 		endDate: endDate,
// 		endTime: endTime,
// 		priority: content.priority,
// 		description: content.description, 
// 		comment: content.comment,
// 		patientID: patientID,
// 		patientName: patientName
// 	};
// }

// function appendAppointmentTitle(appointmentTitle, rowNumber){									
// 	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="index.html">'+appointmentTitle+'</a></li>');
// }

function createDate(date) {
	var newDate = new Date();
	newDate.setFullYear(date.substring(0,4), date.substring(5,7), date.substring(8,10));
	return newDate;
}

function displayIndividualAppointment(content, rowNumber, title) {

	var startPeriod = content.start;
	var endPeriod = content.end;

	var startDate = startPeriod.substring(0,10);
	var endDate = endPeriod.substring(0,10);

	var startTime = startPeriod.substring(11,16);
	var endTime = endPeriod.substring(11,16);

	var newStartDate = createDate(startDate);
	var today = new Date();

	// if(newStartDate<today) {
	// 	console.log('The date' + newStartDate + 'is before today');
	// 	//return;
	// }

	var appointmentID = title.match(/"([^"]+)"/)[1];

	var patientRef = content.participant[0].individual[0].reference;
	var patientID = patientRef.replace( /^\D+/g, '');
	var patientName = content.participant[0].individual[0].display;
	var title = patientName + ': ' + startTime + ' - ' + endTime;
	$('#appointmentListView').append('<li date="'+startDate+'" id="appointment'+rowNumber+'"><a href="#">'+title+'</a></li>');
	//appendAppointmentTitle(title, rowNumber);

	patientAppointments[rowNumber] = {
		appointmentID: appointmentID,
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

// function appendAppointmentTitle(appointmentTitle, rowNumber){									
// 	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="index.html">'+appointmentTitle+'</a></li>');
// }