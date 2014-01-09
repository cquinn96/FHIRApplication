// variable to hold request
var request;

function uploadCarePlan(event){

	console.log('>>> uploadCarePlan()');
	console.log(patientID);
	console.log(name);

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
	
	// var forename =  document.getElementById('forename').value;
	// var surname =  document.getElementById('surname').value;
	// var addressLine1 =  document.getElementById('address1').value;
	// var city =  document.getElementById('city').value;
	// var county =  document.getElementById('county').value;
	// var postcode =  document.getElementById('postcode').value;
	// var dob =  document.getElementById('dob').value;
	// var phoneNumber =  document.getElementById('phone').value;
	
	//var reference = patientID;
	var condition = "Obesity";
	var concern = "Obesity";
	
	var hosNumber = 12345678;
	
	// myDatav = '<CarePlan xmlns="http://hl7.org/fhir">'+
    // '<text>'+
        // '<status value="additional"/>'+
        // '<div xmlns="http://www.w3.org/1999/xhtml">'+
           // '<p> A simple care plan to indicate a patient taking their weight once a day because of obesity.'+
            // 'Some Notes: </p>'+
            // '<ul>'+
           // 'is</li>'+
            // '<li>It would be good to have some way of specifying/coding a goal. eg what the target weight'+
            // '<li>In the codeable concepts I\'ve been lazy and just put the text. There should, of course,'+
           // 'be a code behind these</li>'+
        // '</ul>'+
        // '</div>'+
    // '</text>'+
    // '<contained>'+
      // '<Condition id="p1">'+
        // '<subject>'+
          // '<reference value="Patient/'+reference+'"/>'+
          // '<display value="'+name+'"/>'+
        // '</subject>'+
        // '<code>'+
          // '<text value="'+condition+'"/>'+
        // '</code>'+
        // '<status value="confirmed"/>'+
      // '</Condition>'+
    // '</contained>'+
    // '<contained>'+
      // '<Practitioner id="pr1">'+
          // '<name>'+
            // '<family value="Dietician"/>'+
            // '<given value="Dorothy"/>'+
          // '</name>'+
        // '<specialty>'+
          // '<text value="Dietician"/>'+
        // '</specialty>'+
      // '</Practitioner>'+
    // '</contained>'+
    // '<patient>'+
        // '<reference value="Patient/'+reference+'"/>'+
        // '<display value="Cormac Tester"/>'+
    // '</patient>'+
    // '<status value="active"/>'+
    // '<period>'+
      // '<end value="2013-01-01"/>'+
    // '</period>'+
    // '<concern>'+
        // '<reference value="#p1"/>'+
        // '<display value="'+concern+'"/>'+
    // '</concern>'+
    // '<goal id="g1">'+
        // '<description value="He will lose weight by improving his diet"/>'+
        // '<status value="in progress"/>'+
    // '</goal>'+
	// '<goal id="g2">'+
        // '<description value="will increase her energy by being more active"/>'+
        // '<status value="in progress"/>'+
    // '</goal>'+
	// '<goal>'+
      // '<description value="Target weight is 80 kg."/>'+
    // '</goal>'+
	// '<activity>'+
		// '<status value="not started"/>'+
		// '<prohibited value="false"/>'+
		// '<notes value="9/10/12 Cormac eats one meal a day with his parents"/>'+
		// '<simple>'+
			// '<extension url="http://example.org/DoNotUse/EnhancedCarePlan/ActivityGoalLink">'+
			   // '<valueUri value="#g1"/>'+
			// '</extension>'+
			// '<extension url="http://example.org/DoNotUse/General/RevisionDate">'+
				// '<valueDate value="2012-09-10"/>'+
			// '</extension>'+
			// '<category value="other"/>'+
			// '<timingPeriod>'+
				// '<start value="2012-09-10"/>'+
			// '</timingPeriod>'+
			// '<details value="He will review photos of high and low density foods and share with his parents"/>'+
		// '</simple>'+
	// '</activity>'+
		// '<activity>'+
		// '<status value="not started"/>'+
		// '<prohibited value="false"/>'+
		// '<notes value="9/10/12 Eve eats one meal a day with her parents"/>'+
		// '<simple>'+
			// '<extension url="http://example.org/DoNotUse/EnhancedCarePlan/ActivityGoalLink">'+
			   // '<valueUri value="#g1"/>'+
			// '</extension>'+
			// '<extension url="http://example.org/DoNotUse/General/RevisionDate">'+
				// '<valueDate value="2012-09-10"/>'+
			// '</extension>'+
			// '<category value="other"/>'+
			// '<timingPeriod>'+
				// '<start value="2012-09-10"/>'+
			// '</timingPeriod>'+
			// '<details value="He will reduce intake of coffee and chocolate"/>'+
		// '</simple>'+
	// '</activity>'+
	// '<activity>'+
        // '<prohibited value="false"/>'+
      // '<simple>'+
        // '<category value="observation"/>'+
        // '<code>'+
            // '<text value="a code for weight measurement"/>'+
        // '</code>'+
        // '<timingSchedule>'+
            // '<repeat>'+
                // '<frequency value="1"/>'+
                // '<duration value="1"/>'+
                // '<units value="d"/>'+
            // '</repeat>'+
        // '</timingSchedule>'+
        // '<performer>'+
          // '<reference value="Patient/'+reference+'"/>'+
          // '<display value="Cormac Tester"/>'+
        // '</performer>'+
      // '</simple>'+
    // '</activity>'+
    // '<participant>'+
        // '<role>'+
            // '<text value="responsiblePerson"/>'+
        // '</role>'+
        // '<member>'+
          // '<reference value="Patient/'+reference+'"/>'+
          // '<display value="Cormac Tester"/>'+
        // '</member>'+
    // '</participant>'+
    // '<participant>'+
        // '<role>'+
            // '<text value="adviser"/>'+
        // '</role>'+
        // '<member>'+
            // '<reference value="#pr1"/>'+
            // '<display value="Dorothy Dietition"/>'+
        // '</member>'+
    // '</participant>'+
// '</CarePlan>';


myData = '<CarePlan xmlns="http://hl7.org/fhir">'+
    '<text>'+
        '<status value="additional"/>'+
        '<div xmlns="http://www.w3.org/1999/xhtml">'+
        '</div>'+
    '</text>'+
    '<contained>'+
      '<Condition id="p1">'+
        '<subject>'+
          '<reference value="Patient/'+patientID+'"/>'+
          '<display value="'+name+'"/>'+
        '</subject>'+
        '<code>'+
          '<text value="Obesity"/>'+
        '</code>'+
        '<status value="confirmed"/>'+
      '</Condition>'+
    '</contained>'+
    '<contained>'+
      '<Practitioner id="pr1">'+
          '<name>'+
            '<family value="Dietician"/>'+
            '<given value="Dorothy"/>'+
          '</name>'+
        '<specialty>'+
          '<text value="Dietician"/>'+
        '</specialty>'+
      '</Practitioner>'+
    '</contained>'+
    '<patient>'+
        '<reference value="Patient/'+patientID+'"/>'+
        '<display value="'+name+'"/>'+
    '</patient>'+
    '<status value="active"/>'+
    '<period>'+
      '<end value="2013-01-01"/>'+
    '</period>'+
    '<concern>'+
        '<reference value="#p1"/>'+
        '<display value="'+concern+'"/>'+
    '</concern>'+
    '<participant>'+
        '<role>'+
            '<text value="responsiblePerson"/>'+
        '</role>'+
        '<member>'+
          '<reference value="Patient/'+patientID+'"/>'+
          '<display value="'+name+'"/>'+
        '</member>'+
    '</participant>'+
    '<participant>'+
        '<role>'+
            '<text value="adviser"/>'+
        '</role>'+
        '<member>'+
            '<reference value="#pr1"/>'+
            '<display value="Dorothy Dietition"/>'+
        '</member>'+
    '</participant>'+
    '<goal>'+
      '<description value="Target weight is 80 kg"/>'+
    '</goal>'+
    '<activity>'+
        '<prohibited value="false"/>'+
      '<simple>'+
        '<category value="observation"/>'+
        '<code>'+
            '<text value="a code for weight measurement"/>'+
        '</code>'+
        '<timingSchedule>'+
            '<repeat>'+
                '<frequency value="1"/>'+
                '<duration value="1"/>'+
                '<units value="d"/>'+
            '</repeat>'+
        '</timingSchedule>'+
        '<performer>'+
          '<reference value="Patient/'+patientID+'"/>'+
          '<display value="'+name+'"/>'+
        '</performer>'+
		'<details value="He will reduce intake of coffee and chocolate"/>'+
      '</simple>'+
    '</activity>'+
'</CarePlan>';

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    request = $.ajax({
        url: "http://fhir.healthintersections.com.au/open/CarePlan",
        type: "post",
        data: myData
    });
	
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
		// var	patient = { 
				// key: 0,
				// value: name,
				// dob: dob,
				// hosNumber: hosNumber};
		
		
        console.log("It worked!");
		console.log(response);
		console.log(textStatus);
		console.log(jqXHR.getResponseHeader('Content-Location'));
		console.log(jqXHR.getAllResponseHeaders());
		//fetchPatientOverviewAfterUpload(patient);
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
	
	console.log('<<< uploadCarePlan()');
}

function fetchCarePlanAfterUpload(patient) {
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