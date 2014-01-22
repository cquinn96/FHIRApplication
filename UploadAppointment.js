// variable to hold request
var request;

function uploadAppointment(event){

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
	var concern = document.getElementById('concern').value;
	var goal =  document.getElementById('goal').value;
	var activity =  document.getElementById('activity').value;
	
	var hosNumber = 12345678;
	
//myData = '<Appointment xmlns="http://hl7.org/fhir">  <text>    <status value="generated"/>    <div xmlns="http://www.w3.org/1999/xhtml">Brian MRI results discussion</div>  </text>  <priority value="5"/>  <status value="normal"/>  <description value="Discussion on the results of your recent MRI"/>  <start value="2013-12-10T09:00:00Z"/>  <end value="2013-12-10T11:00:00Z"/>  <timezone value="AEST"/>  <location>    <reference value="Location/1"/>  </location>  <comment value="TestFurther expand on the results of the MRI and determine the next actions that may be appropriate."/>  <participant>    <individual>      <reference value="Patient/362"/>      <display value="Cormac Test"/>    </individual>    <required value="required"/>    <status value="accepted"/>  </participant>  <participant>    <type>      <coding>        <code value="attending"/>      </coding>    </type>    <individual>      <reference value="Practitioner/example"/>      <display value="Dr Adam Careful"/>    </individual>    <required value="required"/>    <status value="accepted"/>  </participant>  <recorder>    <reference value="Practitioner/example"/>    <display value="Dr Adam Careful"/>  </recorder>  <recordedDate value="2012-09-17"/></Appointment>';

myData = '<Appointment xmlns="http://hl7.org/fhir">'+
  '<text>'+
  '  <status value="generated"/>'+
  '  <div xmlns="http://www.w3.org/1999/xhtml">Brian MRI results discussion</div>'+
  '</text>'+
  '<priority value="5"/>'+
  '<status value="normal"/>'+
  '<description value="Discussion on the results of your recent MRI"/>'+
  '<start value="2013-12-10T09:00:00Z"/>'+
  '<end value="2013-12-10T11:00:00Z"/>'+
  '<timezone value="AEST"/>'+
  '<location>'+
  '  <reference value="Location/1"/>'+
  '</location>'+
  '<comment value="TestFurther expand on the results of the MRI and determine the next actions that may be appropriate."/>'+
  '<participant>'+
  '  <individual>'+
  '    <reference value="Patient/362"/>'+
  '    <display value="Cormac Test"/>'+
  '  </individual>'+
  '  <required value="required"/>'+
  '  <status value="accepted"/>'+
  '</participant>'+
  '<participant>'+
  '  <type>'+
  '    <coding>'+
  '      <code value="attending"/>'+
  '    </coding>'+
  '  </type>'+
  '  <individual>'+
  '    <reference value="Practitioner/example"/>'+
      '<display value="Dr Adam Careful"/>'+
    '</individual>'+
    '<required value="required"/>'+
    '<status value="accepted"/>'+
  '</participant>'+
  '<recorder>'+
    '<reference value="Practitioner/example"/>'+
    '<display value="Dr Adam Careful"/>'+
  '</recorder>'+
  '<recordedDate value="2012-09-17"/>'+
'</Appointment>';

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    request = $.ajax({
        url: "http://fhir.healthintersections.com.au/open/Appointment",
        type: "post",
        data: myData
    });
	
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
		// console.log(response);
		// console.log(textStatus);
		// console.log(jqXHR.getResponseHeader('Content-Location'));
		// console.log(jqXHR.getAllResponseHeaders());   
        alert('Added appointment successfully');
        //TODO: TEST THE RELOAD
        location.reload();
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