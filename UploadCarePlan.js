// variable to hold request
var request;

function uploadCarePlan(event){

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
	
	//var reference = patientID; 
	var condition = "Obesity";
	var concern = document.getElementById('concern').value;;
	var goal =  document.getElementById('goal').value;
	var activity =  document.getElementById('activity').value;
	
	var hosNumber = 12345678;
	
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
      '<description value="'+goal+'"/>'+
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
		'<details value="'+activity+'"/>'+
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
		// console.log(response);
		// console.log(textStatus);
		// console.log(jqXHR.getResponseHeader('Content-Location'));
		// console.log(jqXHR.getAllResponseHeaders());
		//fetchPatientOverviewAfterUpload(patient);
        // var patient = { 
        // key: patientID,
        // value: name,
        // dob: dob,
        // hosNumber: hosNumber};

        var carePlanUrl = jqXHR.getResponseHeader('Content-Location');
        var carePlanID = carePlanUrl.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
        fetchResource('careplan', '_id', carePlanID, false);

        //fetchResource('patient', '_id', patientID, false);
        //patientOverview(patient);
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