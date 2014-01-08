function populateCarePlanRows(entries, totalCarePlans, name) {
	$('#carePlanHeader').text('Results for: ' + name + ' (' + totalCarePlans + ' found)');
	if(entries.length == 0)
	{
		$('#carePlanRows').children('li').remove();
		$('#carePlanRows').append('<li>'+
				'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
					'<tr class="orange">'+
						'<td class="status"></td>'+
						'<td class="name"><h2>No care plan found for '+ name + '.<h2></td>'+
					'</tr>'+
					'<tr>');
	}
	else
	{
		for(var i = 0; i < entries.length; i++)
		{
			displayCarePlan(entries[i], entries[i].title, i);
		}
	}
}

//entry is the careplan (1)
//totalReports is the number of reports found (same as entries.length)
//name is the name of the patient/subject of the report
function displayCarePlan(entry, reportTitle, rowNumber) {
	
	$('#carePlanRows').children('li').remove();
	$('#carePlanRows').append('<li>'+
					'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
						'<tr class="orange">'+
							'<td class="status"></td>'+
							'<td class="name"><h2>' + reportTitle +'<h2></td>'+
						'</tr>'+
						'<tr>'+
						'<td colspan="4">'+
							'<table class="innerTable2" >'+
							'<div id="row'+rowNumber+'">');
		
	var content = entry.content;
	
	if(content.text != null)
		{
			var text = content.text.div;
			$('#row'+rowNumber).append('<h3>Summary: </h3><p>'+text+'</p>');
		}
		
	$('#row'+rowNumber).append('<h3>Current Concerns: </h3><ul>');	
	
	if(content.concern != null)
	{
		for(var i =0; i < content.concern.length; i++)
		{
			var concern = content.concern[i].display;
			$('#row'+rowNumber).append('<li>Concern '+(i+1)+ ': '+concern +'</li>');
		}
	}	
	$('#row'+rowNumber).append('</ul></br>');	

	//$('#row'+rowNumber).append('<h3>Current Goals: </h3><ul>');	
	$('#row'+rowNumber).append('<table id="goalTable'+rowNumber+'">'+
						'<tr>'+
						'<th>Goal #</th> '+
						'<th>Description</th>'+
						'</tr>');
	
	if(content.goal != null)
	{
		for(var i =0; i < content.goal.length; i++)
		{
			var goal = content.goal[i].description;
			//$('#row'+rowNumber).append('<li>Goal '+(i+1)+ ': '+goal +'</li>');
			$('#goalTable'+rowNumber).append('<tr>'+
												'<td>'+(i+1)+ '</td>'+ 
												'<td>'+goal +'</td>'+
												'</tr>');
		}
	}	
	$('#row'+rowNumber).append('</ul></br>');	
	
	
	//$('#row'+rowNumber).append('<h3>Activities: </h3>');			
	$('#row'+rowNumber).append('<table id="activityTable'+rowNumber+'">'+
							'<tr>'+
							'<th>Activity #</th> '+
							'<th>Description</th>'+
							'</tr>');
							
	if(content.activity != null)
	{
		for(var i =0; i < content.activity.length; i++)
		{
			//var activityText = content.activity[i].simple.code.text;
			var activityDetails = content.activity[i].simple.details;
			$('#activityTable'+rowNumber).append('<tr>'+
												'<td>'+(i+1)+ '</td>'+ 
												'<td>'+activityDetails +'</td>'+
												'</tr>');
		}
	}	

	//$('#row'+rowNumber).append('</ul></br>');
		
	// var containedResults = 	entry.content.contained;
					
	// for (var i = 0; i < containedResults.length; i++){
	
		// var type = containedResults[i].resourceType;
		// if(containedResults[i].code != null)
		// {
			// var text = containedResults[i].code.text;
		// }
		// var status = containedResults[i].status;
		
		// $('#row'+rowNumber).append('<tr>'+
							// '<td>'+type+': </td> '+
							// '<td> '+text+' </td>'+
							// '<td> Status: '+status+'</td>'+
						// '</tr>');
	// }	
		
}