function populateCarePlanRows(entries, totalCarePlans, name) {
	$('#carePlanHeader').text('Results for: ' + name + ' (' + totalCarePlans + ' found)');
	$('#carePlanRows').children('li').remove();
	if(entries.length == 0)
	{
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

function displayCarePlan(entry, reportTitle, rowNumber) {



		$('#carePlanCollabsibleSet').append(
									'<div data-role="collapsible" id="carePlan'+rowNumber+'">'+
										'<h2>' + reportTitle +'</h2>'+
									'</div>'
									);
															
		// $('#carePlanCollabsibleSetConcerns').append(
									// '<div data-role="collapsible" id="carePlan'+rowNumber+'">'+
									// '<h2>Current Concerns</h2>'+
									// '</div>'
									// );
									
	// $('#carePlan'+rowNumber).append(
	// 						'<ul data-role="listview" data-filter="false" data-filter-theme="c" data-divider-theme="d" id="carePlanListView'+rowNumber+'">'+
	// 						'</ul>'
	// 						);


	$('#carePlan'+rowNumber).append(
						'<ul data-role="listview" data-filter="false" data-theme="d" data-divider-theme="d" id="carePlanListView'+rowNumber+'">'+
						'</ul>'
						);



	$( '#carePlanListView'+rowNumber).listview({
	  create: function( event, ui ) {}
	});

	$('#carePlan'+rowNumber).collapsibleset({
	   create: function(event, ui) {}
	});	
	
	$('#carePlanCollabsibleSetConcerns').collapsibleset({
	   create: function(event, ui) {}
	});

	$('#carePlanListView'+rowNumber).append('<li data-role="list-divider">Current Concerns</li>');

		
	var content = entry.content;
	if(content.concern != null)
	{
		for(var i =0; i < content.concern.length; i++)
		{
			var concern = content.concern[i].display;
			$('#carePlanListView'+rowNumber).append('<li><a href="">'+concern+'</a></li>');
		}
	}	

	$('#carePlanListView'+rowNumber).append('<li data-role="list-divider">Current Goals</li>');
	
	if(content.goal != null)
	{
		for(var i =0; i < content.goal.length; i++)
		{
			var goal = content.goal[i].description;
			$('#carePlanListView'+rowNumber).append('<li><a href="">'+goal+'</a></li>');
		}
	}


	$('#carePlanListView'+rowNumber).append('<li data-role="list-divider">Current Activities</li>');
							
	if(content.activity != null)
	{
		for(var i =0; i < content.activity.length; i++)
		{
			var activityDetails = content.activity[i].simple.details;
			if(activityDetails == undefined)
			{
				activityDetails = content.activity[i].simple.code.text;
			}
			
			var date = 'No date given';
			if(content.activity[i].simple.timingPeriod != null)
			{
				date = content.activity[i].simple.timingPeriod.start;
				date = date.substring(0,10);
			}

			$('#carePlanListView'+rowNumber).append('<li><a href="">'+activityDetails+''+
					'<p class="ui-li-aside"><strong>'+date+'</strong></p>'+
					'</a></li>');
		}
	}	
	
	$('#carePlanListView'+rowNumber).listview("refresh");	
	$("#carePlanCollabsibleSet" ).collapsibleset( "refresh" );
	$("#carePlanCollabsibleSetConcerns" ).collapsibleset( "refresh" );
}








// function displayCarePlan(entry, reportTitle, rowNumber) {

// 	$('#carePlanCollabsibleSet').append(
// 								'<div data-role="collapsible-set" data-theme="a" data-content-theme="d" id="carePlanCollabsibleSetConcerns">'+
// 								'<h2>' + reportTitle +'</h2>'+
// 								'</div>'
// 								);

// 	$('#carePlanCollabsibleSetConcerns').append(
// 									'<div data-role="collapsible" id="carePlan'+rowNumber+'">'+
// 									'<h2>Current Concerns</h2>'+
// 									'</div>'
// 									);
									
// 	// $('#carePlanCollabsibleSet').append(
// 	// 						'<div data-role="collapsible-set" data-theme="a" data-content-theme="d" id="carePlanCollabsibleSetConcerns">'+
// 	// 						'<h2>' + reportTitle +'</h2>'+
// 	// 						'</div>'
// 	// 						);								
									
// 		// $('#carePlanCollabsibleSetConcerns').append(
// 									// '<div data-role="collapsible" id="carePlan'+rowNumber+'">'+
// 									// '<h2>Current Concerns</h2>'+
// 									// '</div>'
// 									// );
									
// 	$('#carePlan'+rowNumber).append(
// 							'<ul data-role="listview" data-filter="false" data-filter-theme="c" data-divider-theme="d" id="carePlanListView'+rowNumber+'">'+
// 							'</ul>'
// 							);


// 	$('#carePlan'+rowNumber).append(
// 						'<ul data-role="listview" data-filter="false" data-filter-theme="c" data-divider-theme="d" id="carePlanListView'+rowNumber+'">'+
// 						'</ul>'
// 						);



// 	$( '#carePlanListView'+rowNumber).listview({
// 	  create: function( event, ui ) {}
// 	});

// 	$('#carePlan'+rowNumber).collapsibleset({
// 	   create: function(event, ui) {}
// 	});	
	
// 	$('#carePlanCollabsibleSetConcerns').collapsibleset({
// 	   create: function(event, ui) {}
// 	});
		
// 	var content = entry.content;
// 	if(content.concern != null)
// 	{
// 		for(var i =0; i < content.concern.length; i++)
// 		{
// 			var concern = content.concern[i].display;
// 			$('#carePlanListView'+rowNumber).append('<li><a href="">'+concern+'</a></li>');
// 		}
// 	}	

// 	$('#row'+rowNumber).append('<table id="goalTable'+rowNumber+'">'+
// 						'<tr>'+
// 						'<th>Goal</th> '+
// 						'<th>Description</th>'+
// 						'</tr>');
	
// 	if(content.goal != null)
// 	{
// 		for(var i =0; i < content.goal.length; i++)
// 		{
// 			var goal = content.goal[i].description;
// 			$('#goalTable'+rowNumber).append('<tr>'+
// 												'<td class="numberRow">'+(i+1)+ '</td>'+ 
// 												'<td>'+goal +'</td>'+
// 												'</tr>');
// 		}
// 	}	

// 	$('#row'+rowNumber).append('</ul></br>');	
	
// 	$('#row'+rowNumber).append('<table id="activityTable'+rowNumber+'">'+
// 							'<tr>'+
// 							'<th>Activity</th> '+
// 							'<th>Description</th>'+
// 							'<th>\tDate</th>'+
// 							'</tr>');
							
// 	if(content.activity != null)
// 	{
// 		for(var i =0; i < content.activity.length; i++)
// 		{
// 			var activityDetails = content.activity[i].simple.details;
// 			if(activityDetails == undefined)
// 			{
// 				activityDetails = content.activity[i].simple.code.text;
// 			}
			
// 			var date = 'No date given';
// 			if(content.activity[i].simple.timingPeriod != null)
// 			{
// 				date = content.activity[i].simple.timingPeriod.start;
// 				date = date.substring(0,10);
// 			}

// 			$('#activityTable'+rowNumber).append('<tr>'+
// 												'<td class="numberRow">'+(i+1)+ '</td>'+ 
// 												'<td>'+activityDetails +'</td>'+
// 												'<td>\t'+date +'</td>'+
// 												'</tr>');
// 		}
// 	}	
	
// 	$('#carePlanListView'+rowNumber).listview("refresh");	
// 	$("#carePlanCollabsibleSet" ).collapsibleset( "refresh" );
// 	$("#carePlanCollabsibleSetConcerns" ).collapsibleset( "refresh" );
// }

// //entry is the careplan (1)
// //totalReports is the number of reports found (same as entries.length)
// //name is the name of the patient/subject of the report
// function displayCarePlan(entry, reportTitle, rowNumber) {
	// $('#carePlanRows').append('<li>'+
					// '<table class="tableContainer" cellspacing="0" cellpadding="0">'+
						// '<tr class="orange">'+
							// '<td class="status"></td>'+
							// '<td class="name"><h2>' + reportTitle +'<h2></td>'+
						// '</tr>'+
						// '<tr>'+
						// '<td colspan="4">'+
							// '<table class="innerTable2" >'+
							// '<div id="row'+rowNumber+'">');
		
	// var content = entry.content;
	
	// // if(content.text != null)
		// // {
			// // var text = content.text.div;
			// // $('#row'+rowNumber).append('<h3>Summary: </h3><p>'+text+'</p>');
		// // }
		
	// $('#row'+rowNumber).append('<h3>Current Concerns: </h3><ul>');	
	// if(content.concern != null)
	// {
		// for(var i =0; i < content.concern.length; i++)
		// {
			// var concern = content.concern[i].display;
			// $('#row'+rowNumber).append('<li>Concern '+(i+1)+ ': '+concern +'</li>');
		// }
	// }	
	// $('#row'+rowNumber).append('</ul></br>');	

	// $('#row'+rowNumber).append('<table id="goalTable'+rowNumber+'">'+
						// '<tr>'+
						// '<th>Goal</th> '+
						// '<th>Description</th>'+
						// '</tr>');
	
	// if(content.goal != null)
	// {
		// for(var i =0; i < content.goal.length; i++)
		// {
			// var goal = content.goal[i].description;
			// $('#goalTable'+rowNumber).append('<tr>'+
												// '<td class="numberRow">'+(i+1)+ '</td>'+ 
												// '<td>'+goal +'</td>'+
												// '</tr>');
		// }
	// }	
	// $('#row'+rowNumber).append('</ul></br>');	
	
	// $('#row'+rowNumber).append('<table id="activityTable'+rowNumber+'">'+
							// '<tr>'+
							// '<th>Activity</th> '+
							// '<th>Description</th>'+
							// '<th>\tDate</th>'+
							// '</tr>');
							
	// if(content.activity != null)
	// {
		// for(var i =0; i < content.activity.length; i++)
		// {
			// var activityDetails = content.activity[i].simple.details;
			// if(activityDetails == undefined)
			// {
				// activityDetails = content.activity[i].simple.code.text;
			// }
			
			// var date = 'No date given';
			// if(content.activity[i].simple.timingPeriod != null)
			// {
				// date = content.activity[i].simple.timingPeriod.start;
				// date = date.substring(0,10);
			// }

			// $('#activityTable'+rowNumber).append('<tr>'+
												// '<td class="numberRow">'+(i+1)+ '</td>'+ 
												// '<td>'+activityDetails +'</td>'+
												// '<td>\t'+date +'</td>'+
												// '</tr>');
		// }
	// }	
// }