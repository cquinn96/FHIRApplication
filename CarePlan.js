function populateCarePlanRows(entries, totalCarePlans) {

	//var name = entries[0].content.patient.display;

	//$('#carePlanHeader').text('Results for: ' + name + ' (' + totalCarePlans + ' found)');
	$('#carePlanHeader').text(totalCarePlans + ' care plan(s) found');
	$('#carePlanDiv').children('div').remove();

	for(var i = 0; i < entries.length; i++)
	{
		displayCarePlan(entries[i], entries[i].title, i);
	}
}

function displayCarePlan(entry, reportTitle, rowNumber) {

	// <div data-role="collapsible-set" data-theme="a" data-content-theme="a" data-inset="true" id="reportCollabsibleSet">
	// 	</div>

// 	$('#carePlanDiv').append(
//     '<div data-role="collapsible-set" data-theme="a" data-content-theme="a" data-inset="true" id="carePlanCollabsibleSet">' +
//     '<h2>'+reportTitle+'</h2>' +
//     '<div id="innerC'+rowNumber+'"></div>'+
//     '</div>');

// 	$('#carePlanCollabsibleSet').collapsibleset();

// 	$( "#carePlanCollabsibleSet" ).collapsibleset({
//    create: function(event, ui) { console.log('created'); }
// });
  
//     var $concernsC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Concerns</h3><span id="concernSpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
//     $concernsC.collapsible();  
    
//     var $goalsC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Goals</h3><span id="goalSpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
//     $goalsC.collapsible();  

//     var $activitiesC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Activities</h3><span id="activitySpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
//     $activitiesC.collapsible();  
    
//     // List views
//     var $concernList = $('<ul data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentConcernsListView'+rowNumber+'"></ul>').appendTo($('#concernSpan'+rowNumber));
//     $concernList.listview();

//     var $goalList = $('<ol data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentGoalsListView'+rowNumber+'"></ol>').appendTo($('#goalSpan'+rowNumber));
//     $goalList.listview();

//     var $activityList = $('<ol data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentActivitesListView'+rowNumber+'"></ol>').appendTo($('#activitySpan'+rowNumber));
//     $activityList.listview();




    $('#carePlanDiv').append(
    '<div data-role="collapsible" data-theme="a" data-content-theme="a" data-inset="true" id="carePlanCollabsible'+rowNumber+'">' +
    '<h2>'+reportTitle+'</h2>' +
    '<div id="innerC'+rowNumber+'"></div>'+
    '</div>');

    $('#carePlanCollabsible'+rowNumber).collapsible();
  
    var $concernsC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Concerns</h3><span id="concernSpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
    $concernsC.collapsible();  
    
    var $goalsC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Goals</h3><span id="goalSpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
    $goalsC.collapsible();  

    var $activitiesC = $('<div data-role="collapsible" data-theme="a" data-collapsed="true"><h3>Current Activities</h3><span id="activitySpan'+rowNumber+'"></span></div>').appendTo($('#innerC'+rowNumber));
    $activitiesC.collapsible();  
    
    // List views
    var $concernList = $('<ul data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentConcernsListView'+rowNumber+'"></ul>').appendTo($('#concernSpan'+rowNumber));
    $concernList.listview();

    var $goalList = $('<ol data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentGoalsListView'+rowNumber+'"></ol>').appendTo($('#goalSpan'+rowNumber));
    $goalList.listview();

    var $activityList = $('<ol data-role="listview" data-inset="true" data-filter="false" data-theme="a" data-divider-theme="d" id="currentActivitesListView'+rowNumber+'"></ol>').appendTo($('#activitySpan'+rowNumber));
    $activityList.listview();

	var content = entry.content;
	if(content.concern != null)
	{
		for(var i =0; i < content.concern.length; i++)
		{
			var concern = content.concern[i].display;
			$('#currentConcernsListView'+rowNumber).append('<li>'+concern+'</li>');
		}
	}	

	if(content.goal != null)
	{
		for(var i =0; i < content.goal.length; i++)
		{
			var goal = content.goal[i].description;
			// $('#currentGoalsListView'+rowNumber).append('<li><a href="">'+goal+'</a></li>');
			$('#currentGoalsListView'+rowNumber).append('<li>'+goal+'</li>');
		}
	}
				
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

			$('#currentActivitesListView'+rowNumber).append('<li>'+activityDetails+'</li>');
		}
	}	

	$('#currentConcernsListView'+rowNumber).listview("refresh");
	$('#currentGoalsListView'+rowNumber).listview("refresh");	
	$('#currentActivitesListView'+rowNumber).listview("refresh");	
}