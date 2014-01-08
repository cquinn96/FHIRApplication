
var nameArray = [];
var resultsHash = {};
var patientArray = [];

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
		//if (entries[i].summary.length >= 1)
		if(entries[i].summary != null)
		{
			var summary = entries[i].summary;
		}
		//var carePlanURL = 'http://hl7connect.healthintersections.com.au/svc/fhir/careplan/search?patient.name='+name;
		//var diagnosticReportURL = 'http://hl7connect.healthintersections.com.au/open/diagnosticreport/_search?subject.name='+name;
		hasDiagnosticReport(patientID, i);
		hasCarePlan(patientID, i);

		$('#patientRows').append('<li>'+
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
		
		// loading2_crop_small.gif
		
		//var a = document.getElementById("diagnosticReport");
		//a.onclick = diagnosticReport;
		
		// nameArray[i] = name;
		
		// var patientHash = {};
		// patientHash[patientID] = name;
		
		// resultsHash[i] = {
			// patientID : name
		// }
		
		//resultsHash[i][patientID] = name;
		
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
		
		console.log(name);
		
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
	   //data: {'_id' : b},
	   //data: {'given' : 'Evelyn'},
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
	
	// console.log('Patient ID: ' + patient.key);
	// console.log('Patient name: ' + patient.value);
	
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
			console.log('request Sucess');
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

var checkReports = [];
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
				document.write('failed');
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
				document.write('Oops, somethings gone wrong.');
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
	// searchPatients.onkeyup = function () {
		// var input = document.getElementById('searchPatients');	
		// var filter = input.value.toUpperCase();
		// var lis = document.getElementsByTagName('li');
		// console.log(filter);
    
		// for (var i = 0; i < lis.length; i++) {
			// var name = lis[i].getElementsByClassName('name')[0].innerHTML;
			
			// if (name.toUpperCase().indexOf(filter) != -1) 
				// lis[i].style.display = 'block';
			// else
				// lis[i].style.display = 'none';
		// }
	// }
	
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
})

// variable to hold request
var request;

function uploadPatient(event){
    // abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
    // serialize the data in the form
    var serializedData = $form.serialize();
	
	var genderDropDown = document.getElementById('gender');
	var gender = genderDropDown.options[genderDropDown.selectedIndex].value;
	
	var genderDisplay = (gender == "M" ? "Male" : "Female");
	
	console.log("Gender is: " + gender + " Display is " + genderDisplay);
		
	var forename =  document.getElementById('forename').value;
	var surname =  document.getElementById('surname').value;
	var name = forename + ' ' + surname;
	
	var addressLine1 =  document.getElementById('address1').value;
	var city =  document.getElementById('city').value;
	var county =  document.getElementById('county').value;
	var postcode =  document.getElementById('postcode').value;
	
	var dob =  document.getElementById('dob').value;
	console.log(dob);
	var phoneNumber =  document.getElementById('phone').value;
	console.log(phoneNumber);
	
	var hosNumber = 12345678;
	
	myData = '<Patient xmlns="http://hl7.org/fhir">'+
	  '<text>'+
		'<status value="generated"/>'+
		'<div xmlns="http://www.w3.org/1999/xhtml">'+
		'</div>'+
	  '</text>'+
	  '<identifier>'+
		'<use value="usual"/>'+
		'<label value="MRN"/>'+
		'<system value="urn:oid:1.2.36.146.595.217.0.1"/>'+
		'<value value="'+hosNumber+'"/>'+
		'<period>'+
		  '<start value="2001-05-06"/>'+
		'</period>'+
		'<assigner>'+
		  '<display value="Acme Healthcare"/>'+
		'</assigner>'+
	  '</identifier>'+
	  '<name>'+
		'<use value="official"/>'+
		'<family value="'+surname+'"/>'+
		'<given value="'+forename+'"/>'+
	 '</name>'+
	  '<telecom>'+
		'<system value="phone"/>'+
		'<value value="'+phoneNumber+'"/>'+
		'<use value="work"/>'+
	  '</telecom>'+
	  '<gender>'+
		'<coding>'+
		  '<system value="http://hl7.org/fhir/v3/AdministrativeGender"/>'+
		  '<code value="'+gender+'"/>'+
		  '<display value="'+genderDisplay+'"/>'+
		'</coding>'+
	  '</gender>'+
	  '<birthDate value="'+dob+'"/>'+
	  '<deceasedBoolean value="false"/>'+
	  '<address>'+
		'<use value="home"/>'+
		'<line value="'+addressLine1+'"/>'+
		'<city value="'+city+'"/>'+
		'<state value="'+county+'"/>'+
		'<zip value="'+postcode+'"/>'+
	  '</address>'+
	  '<contact>'+
		'<relationship>'+
		  '<coding>'+
			'<system value="http://hl7.org/fhir/patient-contact-relationship"/>'+
			'<code value="partner"/>'+
		  '</coding>'+
		'</relationship>'+
		'<name>'+
		  '<family value="du">'+
			'<extension url="http://hl7.org/fhir/Profileiso-21090#qualifier">'+
			  '<valueCode value="VV"/>'+
			'</extension>'+
		  '</family>'+
		  '<family value="Marche"/>'+
		  '<given value="Benedicte"/>'+
		'</name>'+
		'<telecom>'+
		  '<system value="phone"/>'+
		  '<value value="+33 (237) 998327"/>'+
		'</telecom>'+
	  '</contact>'+
	  '<managingOrganization>'+
	   '<reference value="Organization/1"/>'+
	  '</managingOrganization>'+
	  '<active value="true"/>'+
	'</Patient>';	

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    request = $.ajax({
        url: "http://fhir.healthintersections.com.au/open/Patient",
        type: "post",
        data: myData
    });
	
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
		var	patient = { 
				key: 0,
				value: name,
				dob: dob,
				hosNumber: hosNumber};
		
		
        console.log("It worked!");
		console.log(response);
		console.log(textStatus);
		console.log(jqXHR.getResponseHeader('Content-Location'));
		console.log(jqXHR.getAllResponseHeaders());
		fetchPatientOverviewAfterUpload(patient);
		//console.log(jqXHR.getResponseHeader("Location"));
    });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // reenable the inputs
        $inputs.prop("disabled", false);
    });

    // prevent default posting of form
    event.preventDefault();
}

function fetchPatientOverviewAfterUpload(patient) {
	name = patient.value;
	//$( "#serverResponseLoading" ).popup( "open" );
    $.ajax({
       type: "GET",
	   //data: {'subject.name' : name},
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/patient/_search?name='+name+'&_format=json',
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
