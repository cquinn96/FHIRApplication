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

	if(resource == 'appointment' && searchFor == 'name')
	{
		// $( "#popupAppointmentSearchWrong" ).popup( "open" );
		// $.mobile.loading('hide');
		// return;
		initialSearch = false;
		searchFor = 'subject.name'
	}

    $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/'+resource+'/_search?'+searchFor+'='+query+'&_format=json',
       success: function(msg, status) {   	
       		if(initialSearch) {
	            if (msg.title == 'Search results for resource type Patient') {
					$.mobile.changePage("#PatientListPage", { transition: "slide", changeHash: true });
					populateListOfPatients(msg.entry);
	            }
				else if (msg.title == 'Search results for resource type Practitioner'){
					$.mobile.changePage("#PatientListPage", { transition: "slide", changeHash: true });
					populateListOfPractitioners(msg.entry);
				}
				else if (msg.title == 'Search results for resource type Appointment') {
					if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupAppointmentSearch" ).popup( "open" );
					}
					else
					{
						//$.mobile.changePage("index.html#AppointmentListPage");
						// Searching for an appointment by its ID
						patientAppointments = [];
						displayIndividualAppointment(msg.entry[0].content, 0, msg.entry[0].title);
						populateAppointmentOverview(patientAppointments[0]);
					}
	            }
	            else {
	                // Request failed
	                $.mobile.loading('hide');
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
						$.mobile.changePage("index.html#CarePlanPage", { transition: "slide", changeHash: true });
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
						$.mobile.changePage("index.html#DiagnosticReportPage", { transition: "slide", changeHash: true });
						displayReports(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type Patient') {
					$.mobile.changePage("#PatientOverviewPage", { transition: "slide", changeHash: true });
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
						$.mobile.changePage("index.html#AppointmentListPage", { transition: "slide", changeHash: true });
						displayAppointments(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type MedicationPrescription') {
					if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupPrescription" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#PrescriptionListPage", { transition: "slide", changeHash: true });
						displayPrescriptions(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type MedicationAdministration') {
					if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupAdministration" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#AdministrationListPage", { transition: "slide", changeHash: true });
						displayMedicationAdministrations(msg.entry, msg.totalResults);
					}
	            }
	            else if (msg.title == 'Search results for resource type Location') {
					if(msg.entry.length == 0)
					{
						$.mobile.loading('hide');
						$( "#popupGetDirections" ).popup( "open" );
					}
					else
					{
						$.mobile.changePage("index.html#LocationOverviewPage", { transition: "slide", changeHash: true });
						populateLocationOverview(msg.entry[0]);
					}
	            }
	            else {
	                // Request failed
	                $.mobile.loading('hide');
					alert('Oops, something went wrong');
				}
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
			console.log('Request to server failed.');
			$.mobile.loading('hide');
			if(initialSearch){
				alert('Server is down, accessing local patient information instead');
			    $.getJSON('/JSON/allPatients.json', function(json) {
	                $.mobile.changePage("#PatientListPage", { transition: "slide", changeHash: true });
				    populateListOfPatients(json.entry);
	            });
			}
			else if(resource == 'patient') {
			    $.getJSON('/JSON/patientOverview1.json', function(json) {
	                $.mobile.changePage("PatientOverviewPage", { transition: "slide", changeHash: true });
				    populatePatientOverview(json.entry);	
	            });
			}
			else if(resource == 'appointment') {
				$( "#popupAppointmentError" ).popup( "open" );
			}
        }
    });
}

// $(document).keypress(
//     function(event){
//      if (event.which == '13') {
//      	console.log('preventing enter keypress');
//         event.preventDefault();
//       }
// });

$(document).ready(function(){

	$('#searchButton').click(function () {
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

	//make enter button click the searchButton
	$('#query').keypress(function(e) {
	  //return e.which !== 13  
	  if ( e.which == 13 ) $('#searchButton').click();
	});

	$("#patientUploadButton").click(function() {
		$.mobile.loading('show');
		uploadPatient(event);
	});

	$("#carePlanUploadButton").click(function() {
		$.mobile.loading('show');
		uploadCarePlan(event);
	});

	$("#appointmentUploadButton").click(function() {
		$.mobile.loading('show');
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
		var appointmentRowID = $(this).attr('id');
		// Find the number in the row ID
		//var appointmentID = appointmentRowID.replace( /^\D+/g, '');
		var appointmentID = appointmentRowID.substring(11);
		for(var i = 0; i < patientAppointments.length; i++)
		{
			if(patientAppointments[i].appointmentID == appointmentID){
				populateAppointmentOverview(patientAppointments[i]);
			}
				
		}

		//populateAppointmentOverview(patientAppointments[selected_index]);
		//fetchResource('appointment', '_id', patientID, false);
	});

	// Function to handle the click of a cell in the prescription list.
	$('#prescriptionListView').on('click', 'li', function () {
		$.mobile.loading('show');
		var selected_index = $(this).index();
		var prescriptionRowID = $(this).attr('id');
		// Find the number in the row ID
		//var appointmentID = appointmentRowID.replace( /^\D+/g, '');
		// Removes the first 12 characters (ie prescription) and leaves the ID
		var prescriptionID = prescriptionRowID.substring(12);
		for(var i = 0; i < prescriptions.length; i++)
		{
			if(prescriptions[i].prescriptionID == prescriptionID){
				populatePrescriptionOverview(prescriptions[i]);
			}
				
		}

		//populateAppointmentOverview(patientAppointments[selected_index]);
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

	$('#viewAllAppointmentsButton').bind('vmousedown', function () {
		$.mobile.loading('show');
		fetchResource('appointment', '_id', '', false);	
	});

})

function goBack() {
  window.history.back()
}

//fetch diag report and change page
function diagnosticReportClick() {
	$.mobile.loading('show');
	fetchResource('diagnosticreport', 'subject._id', patientID, false);
}

//fetch care plan
function carePlanClick() {
	$.mobile.loading('show');
	fetchResource('careplan', 'patient._id', patientID, false);
}

// View all of a particular patients appointmnets
function viewAppointmentsClick() {
	$.mobile.loading('show');
	fetchResource('appointment', 'subject._id', patientID, false);
}

function viewPrescriptionsClick() {
	$.mobile.loading('show');
	fetchResource('medicationprescription', 'patient._id', patientID, false);
}

function viewAdministrationsClick() {
	$.mobile.loading('show');
	fetchResource('MedicationAdministration', 'patient._id', patientID, false);
}

function addCarePlan() {
	$.mobile.changePage("index.html#UploadCarePlan", { transition: "slide", changeHash: true });
}

function addAppointment() {
	$.mobile.changePage("index.html#UploadAppointment", { transition: "slide", changeHash: true });
}

function cancelAppointmentClick() {
	//$.mobile.changePage("index.html#UploadAppointment");
	deleteAppointment();
}