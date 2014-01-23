var patientArray = [];

function getPatientDetails(entry){
		if(entry.content.name[0].given != null && entry.content.name[0].family != null)
		{
			var name = entry.content.name[0].given[0] + ' ' + entry.content.name[0].family[0];
		}
		
		if(entry.content.birthDate != null)
		{
			var dob = entry.content.birthDate;
		}
		if(entry.content.identifier != null)
		{
			var hosNumber = entry.content.identifier[0].value;
		}

		if(dob == undefined)
			dob = 'No data';
		
		var title = entry.title;
		
		// Gets the patient ID
		var patientID = title.match(/"([^"]+)"/)[1];

		var patientInfo = { 
			key: patientID,
			value: name,
			dob: dob,
			hosNumber: hosNumber};

		return patientInfo;
}

//populates results into table when data has been received from server
function populateListOfPatients(entries) {
	$('#patientRows').children('li').remove();

	for (var i = 0; i < entries.length; i++){

		var patient = getPatientDetails(entries[i]);

		patientID = patient.key;
		name = patient.value;
		dob = patient.dob;
		hosNumber = patient.hosNumber;

		if(name == undefined)
			continue;


		patientArray[i] = patient;

		// var status;
		// //var identifier = entries[i].content.Patient.identifier[0].label.value;
		// if(entries[i].summary != null)
		// {
		// 	var summary = entries[i].summary;
		// }

		$('#patientRows').append('<li id="patient'+i+'"><a href="#">'+
									'<h2>'+name+'</h2>' +
				        '<p><strong>Date of birth - '+dob+'</strong></p>'+
				        '<p>Click to view more details about '+name+'</p>'+
				        '<p class="ui-li-aside">Hospital # - <strong>'+hosNumber+'</strong></p></a>'+
				        '</li>'
			/*<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
				    <li><a href="index.html">
				        <h2>Stephen Weber</h2>
				        <p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
				        <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
				        <p class="ui-li-aside"><strong>6:24</strong>PM</p>
				    </a></li>
				    <li><a href="index.html">
				        <h2>jQuery Team</h2>
				        <p><strong>Boston Conference Planning</strong></p>
				        <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
				        <p class="ui-li-aside"><strong>9:18</strong>AM</p>
				    </a></li>
				    <li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>
				    <li><a href="index.html">
				        <h2>Avery Walker</h2>
				        <p><strong>Re: Dinner Tonight</strong></p>
				        <p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
				        <p class="ui-li-aside"><strong>4:48</strong>PM</p>
				    </a></li>
					*/
			);

		$("#patientRows").listview("refresh");
		
		if(isNaN(patientID))
		{
			console.log('Patient ID is not a number, its: ' + patientID);
			$('#patient'+i).remove();
		}
	}
}

function populateListOfPractitioners(entries) {
	$('#patientRows').children('li').remove();
	for (var i = 0; i < entries.length; i++) {
		
		var name = entries[i].content.name.given[0] + ' ' + entries[i].content.name.family[0];
		
		if(entries[i].content.gender != null)
		{
			var gender = entries[i].content.gender.coding[0].display;
			//if its the old way
			if(gender == undefined)
			{
				gender = entries[i].content.gender.coding[0].code;
			}
		}
		
		if(entries[i].content.identifier != null)
		{
			var hosNumber = entries[i].content.identifier[0].value;
		}
		
		var doctorName = '';
		
		$('#patientRows').append('<li>'+
									'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
										'<tr class="red">'+
											'<td class="statusRed"></td>'+
											'<td class="picture" ><img src="images/faces/faceImageTest.png"></td>'+
											'<td class="name"><h1>'+name+'<h1> <p>Gender: '+gender+'</p> <p>SSN: '+hosNumber+'</p></</td>'+
											'<td class="doctor">'+doctorName+'</td>'+
										'</tr>'+
									'</table>'+
								'</li>');
		}
}

// This function handles Search, PatientOverviews, Care Plans, Diagnostic Reports
function fetchResource(resource, searchFor, query, initialSearch) {
    $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/'+resource+'/_search?'+searchFor+'='+query+'&_format=json',
       success: function(msg, status) {   	
       		if(initialSearch) {
	            if (msg.title == 'Search results for resource type Patient') {
					$.mobile.changePage("index.html#PatientListPage");
					populateListOfPatients(msg.entry);
	            }
				else if (msg.title == 'Search results for resource type Practitioner'){
					$.mobile.changePage("index.html#PatientListPage");
					populateListOfPractitioners(msg.entry);
				}
	            else {
	                // Request failed
					alert('Oops, something went wrong');
				}
       		}
       		else {
	            if (msg.title == 'Search results for resource type CarePlan') {
	            	if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupCarePlan" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#CarePlanPage");
						populateCarePlanRows(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type DiagnosticReport') {
	            	if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupDiagnosticReport" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#DiagnosticReportPage");
						displayReports(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type Patient') {
					$.mobile.changePage("index.html#PatientOverviewPage");
					populatePatientOverview(msg.entry[0]);	
	            }
	            else if (msg.title == 'Search results for resource type Appointment') {
					if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupAppointment" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#AppointmentPage");
						displayAppointments(msg.entry, msg.totalResults);
					}
	            }
	            else {
	                // Request failed
					alert('Oops, something went wrong');
				}
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
			console.log('Server is Down');
			if(initialSearch){
				alert('Server is down, accessing local patient information instead');
			    $.getJSON('/JSON/allPatients.json', function(json) {
	                $.mobile.changePage("index.html#PatientListPage");
				    populateListOfPatients(json.entry);
	            });
			}
			else {
				console.log('Request to server failed');
			    $.getJSON('/JSON/patientOverview1.json', function(json) {
	                $.mobile.changePage("index.html#PatientOverviewPage");
				    populatePatientOverview(json.entry);	
	            });
			}
        }
    });
}

$(document).ready(function(){
	// Search button has a click/touch
	$('#loginButton').bind('vmousedown', function () {
		// Search for Patient or Practictior
		var searchForDropDown = document.getElementById('searchFor');
		var resourceToSearchFor = searchForDropDown.options[searchForDropDown.selectedIndex].value;
		
		// Search by ID or name
    	var searchByDropDown = document.getElementById('searchBy');
		var searchBy = searchByDropDown.options[searchByDropDown.selectedIndex].value;

		// Actual search value
		var query =  document.getElementById('query').value;

		$.mobile.loading('show');
		fetchResource(resourceToSearchFor, searchBy, query, true);	
	});

	// Bind to the submit event of our form
	$("#patientUploadForm").submit(function() {
		uploadPatient(event);
	});

	$("#carePlanUploadForm").submit(function() {
		uploadCarePlan(event);
	});

	$("#appointmentUploadForm").submit(function() {
		uploadAppointment(event);
	});

	// Function to handle the click of a cell in patient list.
	$('#patientRows').on('click', 'li', function () {
		$.mobile.loading('show');
		var selected_index = $(this).index();
		name = patientArray[selected_index].value;
		patientID = patientArray[selected_index].key

		//patientOverview(patientArray[selected_index]);
		//fetchResourceByPatientID(patientID, name,  'patient');
		// Fetching a patient overview
		fetchResource('patient', '_id', patientID, false);
	});

	// Function to handle the click of a cell in the appointment list.
	$('#appointmentListView').on('click', 'li', function () {
		$.mobile.loading('show');
		var selected_index = $(this).index();
		// console.log(name);
		// console.log(patientID);
		// console.log(selected_index);
		// var appointment = patientAppointments[selected_index];
		// console.log(appointment.comment);
		populateAppointmentOverview(patientAppointments[selected_index]);
		//fetchResource('appointment', '_id', patientID, false);
	});

	$('#addGoal').click(function() {
		var uploadCarePlanForm = document.getElementById('goalInputDiv');
		var goalInputDiv = document.createElement('div');
		goalInputDiv.className = 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-a';
		var goalInput = document.createElement('input');
		goalInput.id = 'goal2';             // No setAttribute required
		goalInput.type = 'text' // No setAttribute required, note it's "className" to avoid conflict with JavaScript reserved word
		goalInput.value = ''
		goalInput.className = 'ui-input-text ui-body-a';
		goalInputDiv.appendChild(goalInput);
		uploadCarePlanForm.appendChild(goalInputDiv);
	});
	
	$('#addActivity').click(function() {
		var addActivityDiv = document.getElementById('activityInputDiv');
		var activityInputDiv = document.createElement('div');
		activityInputDiv.className = 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-a';
		var activityInput = document.createElement('input');
		// TODO: MAKE A GLOBAL VARIALBE TO HOLD THE ID NUMBER
		activityInput.id = 'activity2';             // 
		activityInput.type = 'text' // No setAttribute required, note it's "className" to avoid conflict with JavaScript reserved word
		activityInput.value = ''
		activityInput.className = 'ui-input-text ui-body-a';
		activityInputDiv.appendChild(activityInput);
		addActivityDiv.appendChild(activityInputDiv);
	});
})

function goBack() {
  window.history.back()
}

//fetch diag report and change page
function diagnosticReportClick() {
	$.mobile.loading('show');
	fetchResource('Diagnosticreport', 'subject._id', patientID, false);
}

//fetch care plan
function carePlanClick() {
	$.mobile.loading('show');
	fetchResource('careplan', 'patient._id', patientID, false);
}

function viewAppointmentsClick() {
	$.mobile.loading('show');
	fetchResource('appointment', 'subject._id', patientID, false);
}

function addCarePlan() {
	$.mobile.changePage("index.html#UploadCarePlan");
}

function addAppointment() {
	$.mobile.changePage("index.html#UploadAppointment");
}

function cancelAppointmentClick() {
	//$.mobile.changePage("index.html#UploadAppointment");
}