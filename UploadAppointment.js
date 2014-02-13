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
	
	var description = document.getElementById('description').value;
  var comment = document.getElementById('comment').value;
	var startDate =  document.getElementById('startDate').value;
	var startTime =  document.getElementById('startTime').value;
  var endDate =  document.getElementById('endDate').value;
  var endTime =  document.getElementById('endTime').value;
  var priority =  document.getElementById('priority').value;

  //Discussion on the results of your recent MRI
  //Further expand on the results of the MRI and determine the next actions that may be appropriate.
	
  //myData = '<Appointment xmlns="http://hl7.org/fhir">  <text>    <status value="generated"/>    <div xmlns="http://www.w3.org/1999/xhtml">Brian MRI results discussion</div>  </text>  <priority value="5"/>  <status value="normal"/>  <description value="Discussion on the results of your recent MRI"/>  <start value="2013-12-10T09:00:00Z"/>  <end value="2013-12-10T11:00:00Z"/>  <timezone value="AEST"/>  <location>    <reference value="Location/1"/>  </location>  <comment value="TestFurther expand on the results of the MRI and determine the next actions that may be appropriate."/>  <participant>    <individual>      <reference value="Patient/362"/>      <display value="Cormac Test"/>    </individual>    <required value="required"/>    <status value="accepted"/>  </participant>  <participant>    <type>      <coding>        <code value="attending"/>      </coding>    </type>    <individual>      <reference value="Practitioner/example"/>      <display value="Dr Adam Careful"/>    </individual>    <required value="required"/>    <status value="accepted"/>  </participant>  <recorder>    <reference value="Practitioner/example"/>    <display value="Dr Adam Careful"/>  </recorder>  <recordedDate value="2012-09-17"/></Appointment>';

  myData = '<Appointment xmlns="http://hl7.org/fhir">'+
    '<text>'+
    '  <status value="generated"/>'+
    '  <div xmlns="http://www.w3.org/1999/xhtml">'+description+'</div>'+
    '</text>'+
    '<priority value="'+priority+'"/>'+
    '<status value="normal"/>'+
    '<description value="'+description+'"/>'+
    '<start value="'+startDate+'T'+startTime+':00Z"/>'+
    '<end value="'+endDate+'T'+endTime+':00Z"/>'+
    '<timezone value="AEST"/>'+
    '<location>'+
    '  <reference value="Location/4CB69EC7-4DCB-4BD6-9A43-ACA9498EB6C"/>'+
    '</location>'+
    '<comment value="'+comment+'"/>'+
    '<participant>'+
    '  <individual>'+
    '    <reference value="Patient/'+patientID+'"/>'+
    '    <display value="'+name+'"/>'+
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
		 //console.log(jqXHR.getResponseHeader('Content-Location'));
		 //console.log(jqXHR.getAllResponseHeaders());   

      var appointmentUrl = jqXHR.getResponseHeader('Content-Location');
      var appointmentID = appointmentUrl.replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
      //alert('Added appointment successfully');

      fetchResource('appointment', '_id', appointmentID, true); 
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