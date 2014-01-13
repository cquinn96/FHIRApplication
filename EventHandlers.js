
var nameArray = [];
var resultsHash = {};
var patientArray = [];
var checkReports = [];

//populates results into table when data has been received from server
function populateListOfPatients(entries) {
	$('#patientRows').children('li').remove();
	for (var i = 0; i < entries.length; i++){
		
		//var name = entries[i].content.Patient.name[0].given[0].value + ' ' + entries[i].content.Patient.name[0].family[0].value;
		if(entries[i].content.name[0].given != null && entries[i].content.name[0].family != null)
		{
			var name = entries[i].content.name[0].given[0] + ' ' + entries[i].content.name[0].family[0];
		}
		
		if(name == undefined)
			continue;
		
		if(entries[i].content.birthDate != null)
		{
			var dob = entries[i].content.birthDate;
		}
		if(entries[i].content.identifier != null)
		{
			var hosNumber = entries[i].content.identifier[0].value;
		}
		
		var title = entries[i].title;
		
		// Gets the patient ID
		var patientID = title.match(/"([^"]+)"/)[1];
		
		var status;
		//var identifier = entries[i].content.Patient.identifier[0].label.value;
		if(entries[i].summary != null)
		{
			var summary = entries[i].summary;
		}
		hasDiagnosticReport(patientID, i);
		hasCarePlan(patientID, i);

		$('#patientRows').append('<li id="patient'+i+'">'+
									'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
										'<tr class="red">'+
										'<td class="statusRed"></td>'+
										'<td class="picture"><img src="images/faces/faceImageTest.png">'+
										'</td> <td class="name"><h1>'+name+'<h1> <p>DOB: '+dob+'</p> <p>SSN: '+hosNumber+'</p></</td>'+
										'<td class="doctor">'+title+'</td>'+
										'</tr>'+
										'<tr><td colspan="4">'+
											'<table class="innerTable">'+
											'<tr><td class="detailStatusRed"></td>'+
											'<td class="detailArrowDown"><img src="images/arrows/redArrowDown.png"></td>'+
											// '<td class="innerTableCell"><h1>discharge</h1><img src="images/dischargeStatus/one.png"></td>'+
											'<td class="innerTableCell"><h1><a id="patientOverview'+i+'" href=javascript:void(0);>Patient Overview</a></h1><img src="images/alertStatus/clearStatus.png"></td>'+
											'<td class="innerTableCell"><h1><a id="diagnosticReport'+i+'" href=javascript:void(0);>Diagnostic Report</a></h1><img id="hasReportImage'+i+'" src="images/loading_gif_transparent.gif"></td>'+
											'<td class="innerTableCell"><h1><a id="carePlan'+i+'" href=javascript:void(0);>CarePlan</a></h1><img id="hasCarePlanImage'+i+'" src="images/loading_gif_transparent.gif"></td>'+
											'</tr>'+
											'</table>'+
										'</td>'+
										'</tr>'+
									'</table>'+
								'</li>');

		
		// nameArray[i] = name;
		// var patientHash = {};
		// patientHash[patientID] = name;
		
		patientArray[i] = { 
					key: patientID,
					value: name,
					dob: dob,
					hosNumber: hosNumber};

		// for (var a in patientHash) {
			// // use hasOwnProperty to filter out keys from the Object.prototype
			// if (patientHash.hasOwnProperty(a)) {
				// alert('key is: ' + a + ', value is: ' + patientHash[a]);
			// }
		// }
		
		$('#diagnosticReport'+i).click(function() {
		// Gets the last few digits of the Diagnostic Report ID link
			var pos = this.id.substring(16);
			diagnosticReport(patientArray[pos], entries.length);
		});
		
		$('#carePlan'+i).click(function() {
			var pos = this.id.substring(8);
			carePlan(patientArray[pos], entries.length);
		});
		
		$('#patientOverview'+i).click(function() {
			var pos = this.id.substring(15);
			patientOverview(patientArray[pos], entries.length);
		});
		
		if(isNaN(patientID))
		{
			console.log('Patient ID is not a number, its: ' + patientID);
			var toRemove = 'patient'+i;
			
			$('#patient'+i).remove();
		}
		
	}	
}

function populateListOfPractitioners(entries) {
	$('#patientRows').children('li').remove();
	for (var i = 0; i < entries.length; i++) {
		
		//var name = entries[i].content.name.given[0].value + ' ' + entries[i].content.name.family[0].value;
		
		//if(entries[i].content.name.text != null)
		//{
		//	var name = entries[i].content.name.text;
		//}
		
		//if it's the old way
		//if(name == undefined)
		//{
			var name = entries[i].content.name.given[0] + ' ' + entries[i].content.name.family[0];
		//}
		
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
		//<tr><td colspan="4"><table class="innerTable" ><tr><td class="detailStatusRed"></td><td class="detailArrowDown"><img src="images/arrows/redArrowDown.png"></td><td class="innerTableCell"><h1>discharge</h1><img src="images/dischargeStatus/one.png"></td><td class="innerTableCell"><h1>VTE</h1><img src="images/alertStatus/clearStatus.png"></td><td class="innerTableCell"><h1>Diabetic</h1><img src="images/alertStatus/clearStatus.png"></td><td class="innerTableCell"><h1>Visitors</h1><img src="images/alertStatus/dangerStatus.png"></td><td class="innerTableCell"><h1>Nil by month</h1><img src="images/alertStatus/clearStatus.png"></td></tr></table></td></tr></table></li>');
		}	
}

//fetch a list of patients from server
function fetchAllResources(type, searchBy, query) {
    $.ajax({
       type: "GET",
	   //data: {'_id' :'1'},
	   dataType: 'json',
	   beforeSend: function(xhr) {
	   		//xhr.setRequestHeader('Content-type', 'application/json');
			//xhr.setRequestHeader('Origin', 'fhir.beltech2014.com');
		},
       url: 'http://hl7connect.healthintersections.com.au/open/'+type+'/_search?'+searchBy+'='+query+'&_format=json',
       success: function(msg, status) {   		
			//console.log(JSON.stringify(msg));
            if (msg.title == 'Search results for resource type Patient') {
				//change page
				//$( "#serverResponseDialog" ).popup( "open" );
				$.mobile.changePage("index.html#PatientListPage");
				populateListOfPatients(msg.entry);
				//populateListOfPatients(msg.entry[0].content.Patient);
				//document.write(JSON.stringify(msg.entry[0].content.Patient));
            }
			else if (msg.title == 'Search results for resource type Practitioner'){
				$.mobile.changePage("index.html#PatientListPage");
				populateListOfPractitioners(msg.entry);
			}
            else {
                // Login request failed
				document.write('failed');
			}
        },
        error: function (msg) {
            // search request failed
			document.write(JSON.stringify(msg, 2));
        }
    });
}

var diagnosticReport = function fetchDiagnosticReport(patient, numEntries) {
	
	patientID = patient.key;
	name = patient.value;
	
	// Abort any remaining GET requests
	for(var i =0; i < numEntries; i++){
		if(checkReports[i].readyState != 4)
		{
			checkReports[i].abort();
		}
		if(checkCarePlans[i].readyState != 4)
		{
			checkCarePlans[i].abort();
		}
	}

	$( "#serverResponseLoading" ).popup( "open" );
    $.ajax({
       type: "GET",
	   //data: {'subject.name' : name},
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/Diagnosticreport/_search?subject._id='+patientID+'&_format=json',
       success: function(msg, status) {   		
			//console.log(JSON.stringify(msg));
            if (msg.title == 'Search results for resource type DiagnosticReport') {
				$.mobile.changePage("index.html#DiagnosticReportPage");
				displayReports(msg.entry, msg.totalResults, name);
            }
            else {
                // Request failed
				document.write('Something went wrong.');
			}
        },
        error: function (msg) {
            // search request failed
			document.write(JSON.stringify(msg, 2));
        }
    });
}


var carePlan = function fetchCarePlan(patient, numEntries) {

	patientID = patient.key;
	name = patient.value;

	// Abort any remaining GET requests
	for(var i =0; i < numEntries; i++){
		if(checkReports[i].readyState != 4)
		{
			checkReports[i].abort();
		}
		if(checkCarePlans[i].readyState != 4)
		{
			checkCarePlans[i].abort();
		}
	}
	
	$( "#serverResponseLoading" ).popup( "open" );
    $.ajax({
       type: "GET",
	   //data: {'subject.name' : name},
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/careplan/_search?patient._id='+patientID+'&_format=json',
       success: function(msg, status) {   		
            if (msg.title == 'Search results for resource type CarePlan') {
				$.mobile.changePage("index.html#CarePlanPage");
				populateCarePlanRows(msg.entry, msg.totalResults, name);	
            }
            else {
                // Login request failed
				document.write('failed');
			}
        },
        error: function (msg) {
            // search request failed
			document.write(JSON.stringify(msg, 2));
        }
    });
}


var patientOverview = function fetchPatientOverview(patient, numEntries) {

	patientID = patient.key;
	name = patient.value;

	// Abort any remaining GET requests
	for(var i =0; i < numEntries; i++){
		if(checkReports[i].readyState != 4)
		{
			checkReports[i].abort();
		}
		if(checkCarePlans[i].readyState != 4)
		{
			checkCarePlans[i].abort();
		}
	}
	
	$( "#serverResponseLoading" ).popup( "open" );
    $.ajax({
       type: "GET",
	   //data: {'subject.name' : name},
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/patient/_search?_id='+patientID+'&_format=json',
       success: function(msg, status) {   		
            if (msg.title == 'Search results for resource type Patient') {
				$.mobile.changePage("index.html#PatientOverviewPage");
				populatePatientOverview(msg.entry[0], patient);	
            }
            else {
                // Login request failed
				document.write('failed');
			}
        },
        error: function (msg) {
            // search request failed
			document.write(JSON.stringify(msg, 2));
        }
    });
}

//Will check if the patient has a diagnostic report
function hasDiagnosticReport(patientID, position) {
	//console.log("in function: hasDiagnosticReport" + name);
    checkReports[position] = $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/Diagnosticreport/_search?subject._id='+patientID+'&_format=json',
       success: function(msg, status) {   		
			//console.log(JSON.stringify(msg));
            if (msg.title == 'Search results for resource type DiagnosticReport') {
				if(msg.entry.length>=1){
					$('#hasReportImage'+position).attr('src','images/alertStatus/clearStatus.png');
					return;
					}
				else {
					$('#hasReportImage'+position).attr('src','images/alertStatus/dangerStatus.png');
					return;
				}
            }
            else {
                // Request failed
				//document.write('failed');
				console.log('failed');
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
        }
    });
}

var checkCarePlans = [];
//Will check if the patient has a diagnostic report
function hasCarePlan(patientID, position) {
	//console.log("in function: hasDiagnosticReport" + name);
    checkCarePlans[position] = $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/careplan/_search?patient._id='+patientID+'&_format=json',
       success: function(msg, status) {   		
            if (msg.title == 'Search results for resource type CarePlan') {
				if(msg.entry.length>=1){
					$('#hasCarePlanImage'+position).attr('src','images/alertStatus/clearStatus.png');
					return;
					}
				else {
					$('#hasCarePlanImage'+position).attr('src','images/alertStatus/dangerStatus.png');
					return;
				}
            }
            else {
                // Request failed
				//document.write('Oops, somethings gone wrong.');
				console.log('failed');
			}
        },
        error: function (msg) {
            // search request failed
			//document.write(JSON.stringify(msg, 2));
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
		$( "#serverResponseDialog" ).popup( "open" );
		//var searchObject = { searchBy : query };	
		fetchAllResources(searchFor, searchBy, query);
		
	});
	
	// $('#patientUploadButton').bind('vmousedown', function () {
    	// var genderDropDown = document.getElementById('gender');
		// var gender = genderDropDown.options[genderDropDown.selectedIndex].value;
		
		// var name =  document.getElementById('name').value;
		
		// $( "#serverResponseDialog" ).popup( "open" );

		// uploadPatient(name, gender);	
	// });

// bind to the submit event of our form
$("#patientUploadForm").submit(function() {
	uploadPatient(event)
});

$("#carePlanUploadForm").submit(function() {
	uploadCarePlan(event)
});
})
