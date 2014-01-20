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
		
		//console.log(response);
		//console.log(textStatus);
		console.log(jqXHR.getResponseHeader('Content-Location'));

		var patientUrl = jqXHR.getResponseHeader('Content-Location');

		var newID = patientUrl.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');

		var	patient = { 
		key: newID,
		value: name,
		dob: dob,
		hosNumber: hosNumber};

		//console.log(jqXHR.getAllResponseHeaders());
		fetchPatientOverviewAfterUpload(patient);
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
	patientID = patient.key;
    $.ajax({
       type: "GET",
	   dataType: 'json',
       url: 'http://hl7connect.healthintersections.com.au/open/patient/_search?_id='+patientID+'&_format=json',
       success: function(msg, status) {   		
            if (msg.title == 'Search results for resource type Patient') {
				$.mobile.changePage("index.html#PatientOverviewPage");
				populatePatientOverview(msg.entry[0], patient);	
            }
            else {
                // request failed
				document.write('failed');
			}
        },
        error: function (msg) {
            // search request failed
			document.write(JSON.stringify(msg, 2));
        }
    });
}