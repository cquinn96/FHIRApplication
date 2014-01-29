var patientAppointments = [];

function displayAppointments(entries, totalAppointments) {

	patientAppointments = [];

	$('#appointmentListView').children('li').remove();
	$('#pageHeader').text(totalAppointments + ' appointment(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		displayIndividualAppointment(entries[i].content, i, entries[i].title);
	}
	
	for(var i = 0; i < patientAppointments.length; i++)
	{
		var title = patientAppointments[i].patientName + ': ' + patientAppointments[i].startTime + ' - ' + patientAppointments[i].endTime;
		var today = new Date();
		// If the date of the appointment is before today, don't show it
		if(patientAppointments[i].realDate<today) {
			//console.log('The date ' + patientAppointments[i].realStartDate + 'is before today, so we will remove this appointment: ' + patientAppointments[i].appointmentID + patientAppointments[i].patientName);
			//return;
			continue;
		}

		$('#appointmentListView').append('<li date="'+patientAppointments[i].startDate+'" id="appointment'+patientAppointments[i].appointmentID+'"><a href="#">'+title+'</a></li>');
	}

	$('#appointmentListView').listview("refresh");

	$("#appointmentListView").listview({
		    autodividers: true,
		    autodividersSelector: function (li) {
		        var out = li.attr('date');
		        return out;
		    }
		}).listview('refresh');
}

function createDate(date) {
	var newDate = new Date();
	// Month is -1 because javascript stores months as 0-11
	newDate.setFullYear(date.substring(0,4), date.substring(5,7)-1, date.substring(8,10));
	return newDate;
}

function displayIndividualAppointment(content, rowNumber, title) {

	var startPeriod = content.start;
	var endPeriod = content.end;

	var startDate = startPeriod.substring(0,10);
	var endDate = endPeriod.substring(0,10);

	var startTime = startPeriod.substring(11,16);
	var endTime = endPeriod.substring(11,16);

	var appointmentID = title.match(/"([^"]+)"/)[1];

	var patientRef = content.participant[0].individual[0].reference;
	var patientID = patientRef.replace( /^\D+/g, '');
	var patientName = content.participant[0].individual[0].display;
	var title = patientName + ': ' + startTime + ' - ' + endTime;
	//appendAppointmentTitle(title, rowNumber);

	var realStartDate = createDate(startDate);

	patientAppointments[rowNumber] = {
		appointmentID: appointmentID,
		startDate: startDate,
		realDate: realStartDate,
		startTime: startTime,
		endDate: endDate,
		endTime: endTime,
		priority: content.priority,
		description: content.description, 
		comment: content.comment,
		patientID: patientID,
		patientName: patientName
	};

	// // If the date of the appointment is before today, don't show it
	// if(realStartDate<today) {
	// 	//console.log('The date ' + realStartDate + 'is before today, so we will remove this appointment: ' + appointmentID + patientName);
	// 	//return;
	// }

	patientAppointments.sort(function(a,b){
  	a = new Date(a.realDate);
  	b = new Date(b.realDate);
  	return a<b?-1:a>b?1:0;
	});


	//$('#appointmentListView').append('<li date="'+startDate+'" id="appointment'+appointmentID+'"><a href="#">'+title+'</a></li>');
}

// function appendAppointmentTitle(appointmentTitle, rowNumber){									
// 	$('#appointmentListView').append('<li id="appointment'+rowNumber+'"><a href="index.html">'+appointmentTitle+'</a></li>');
// }