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

		$('#patientRows').append('<li><a href="#">'+
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
		
		// $('#patientOverview'+i).click(function() {
		// 	var pos = this.id.substring(15);
		// 	patientOverview(patientArray[pos], entries.length);
		// });
		
		// if(isNaN(patientID))
		// {
		// 	console.log('Patient ID is not a number, its: ' + patientID);
		// 	var toRemove = 'patient'+i;
		// 	$('#patient'+i).remove();
		// }
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

//fetch a list of patients from server
function fetchAllResourcesOLD(type, searchBy, query) {
    $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/'+type+'/_search?'+searchBy+'='+query+'&_format=json',
       success: function(msg, status) {   		
			//console.log(JSON.stringify(msg));
            if (msg.title == 'Search results for resource type Patient') {
				//change page
     //            $.getJSON('http://fhir.beltech2014.com/JSON/allPatients.json', function(json) {
					// console.log('Getting json 2');
     //                console.log(json);
     //            });

  				// var url = 'http://fhir.beltech2014.com/JSON/allPatients.json';

			   //  $.get(url, function (data) {
			   //    console.log('success');
			   //    console.log(data.entry);
			   //    $.mobile.changePage("index.html#PatientListPage");
				  // populateListOfPatients(data.entry);
			   //    //var obj = $.parseJSON(data);
			   //    //console.log(obj);
			   //  });


				$.mobile.changePage("index.html#PatientListPage");
				populateListOfPatients(msg.entry);
				//document.write(JSON.stringify(msg.entry[0].content.Patient));
            }
			else if (msg.title == 'Search results for resource type Practitioner'){
				$.mobile.changePage("index.html#PatientListPage");
				populateListOfPractitioners(msg.entry);
			}
            else {
                // Request failed
				alert('Oops, something went wrong');
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
			console.log('Server is Down');
			alert('Server is down, accessing local patient information instead');
		    $.getJSON('/JSON/allPatients.json', function(json) {
                $.mobile.changePage("index.html#PatientListPage");
			    populateListOfPatients(json.entry);
            });
        }
    });
}

function fetchResourceByPatientID(patientID, name, resource) {
	console.log('Fetching ' + resource);

	// Searching for a Care Plan
	var searchFor = 'patient._id'

	// Searching for a Diagnostic Report
	if(resource == 'Diagnosticreport')
		searchFor = 'subject._id';

	// Searching for patient overview
	if(resource == 'patient')
		searchFor = '_id';

    $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/'+resource+'/_search?'+searchFor+'='+patientID+'&_format=json',
       success: function(msg, status) {   		
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
            else {
                // Request failed
				alert('Oops, something went wrong');
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
			console.log('Request to server failed');
			//alert('Server is down, accessing local patient information instead');
		    $.getJSON('/JSON/patientOverview1.json', function(json) {
                $.mobile.changePage("index.html#PatientOverviewPage");
			    populateListOfPatients(json.entry);
            });
        }
    });
}

function fetchAllResources(resource, searchFor, query, initialSearch) {
	console.log('test');
	// Searching for a Care Plan
	//var searchFor = 'patient._id'

	// Searching for a Diagnostic Report
	//if(resource == 'Diagnosticreport')
		//searchFor = 'subject._id';

	// Searching for patient overview
	//if(resource == 'patient')
		//searchFor = '_id';

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
	//run after the page has loaded. 

	//search button has a click/touch
	$('#loginButton').bind('vmousedown', function () {
		var searchForDropDown = document.getElementById('searchFor');
		var searchFor = searchForDropDown.options[searchForDropDown.selectedIndex].value;
		
    	var searchByDropDown = document.getElementById('searchBy');
		var searchBy = searchByDropDown.options[searchByDropDown.selectedIndex].value;
		var query =  document.getElementById('query').value;
		//$( "#serverResponseDialog" ).popup( "open" );
		//var searchObject = { searchBy : query };	
		$.mobile.loading('show');
		fetchAllResources(searchFor, searchBy, query, true);	
	});

	// bind to the submit event of our form
	$("#patientUploadForm").submit(function() {
		uploadPatient(event)
	});

	$("#carePlanUploadForm").submit(function() {
		uploadCarePlan(event)
	});

	//function to handle the click of a cell in patient list.
	$('#patientRows').on('click', 'li', function () {
		$.mobile.loading('show');
		var selected_index = $(this).index();
		name = patientArray[selected_index].value;
		patientID = patientArray[selected_index].key

		//patientOverview(patientArray[selected_index]);
		fetchResourceByPatientID(patientID, name,  'patient');
	});
})

function goBack() {
  window.history.back()
}


