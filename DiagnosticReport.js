function displayReports(entries, totalReports, name) {
	$('#pageHeader').text('Results for: ' + name + ' (' + totalReports + ' reports found)');
	
	if(entries.length == 0)
	{
		$('#reportRows').children('li').remove();
		$('#reportRows').append('<li>'+
				'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
					'<tr class="orange">'+
						'<td class="status"></td>'+
						'<td class="name"><h2>No report found for '+ name + '.<h2></td>'+
					'</tr>'+
					'<tr>');
	}
	else
	{
		for(var i = 0; i < entries.length; i++)
		{
			if(entries[i].content.contained != null)
			{

				// if(entries[i].content.contained.name == undefined)
					// console.log('name is undefined');
				// if(entries[i].content.contained.name == null)
					// console.log('name is null');
			
				if(entries[i].content.contained[0].name != null)
					displayReport(entries[i].content.contained, entries[i].title, i);
				else
					displayReportDiv(entries[i], entries[i].title, i);
			}
			else
			{
				displayReportDiv(entries[i], entries[i].title, i);
			}
		}
	}
}

//There is no contained, so only show the 'div' value returned
function displayReportDiv(entry, reportTitle, rowNumber) {
	console.log('in DisplayReportDiv');
	appendReportTitle(reportTitle, rowNumber);
							
	$('#row'+rowNumber).append('<tr>'+
									'<td>'+entry.content.text.div+'</td>'+
								'</tr>');
}

function displayReport(containedResults, reportTitle, rowNumber) {
console.log('in DisplayReport');
	appendReportTitle(reportTitle, rowNumber);
	for (var i = 0; i < containedResults.length; i++){
		
		if(containedResults[i].name != null)
		{
			var testName = containedResults[i].name.coding[0].display;
			console.log('Has a Test Nname:' + testName);
		}
		
		if(containedResults[i].valueQuantity != null)
		{
			if(containedResults[i].valueQuantity.value != null)
			{
				var units = containedResults[i].valueQuantity.units;
			}
			
			if(containedResults[i].valueQuantity.value != null)
			{
				var value = containedResults[i].valueQuantity.value;
			}
		}
		// if(containedResults[i].referenceRange != null && containedResults.referenceRange != null)
		// {
			// var referenceRange = containedResults[i].referenceRange.low.value.value + ' - ' + containedResults.referenceRange.high.value.value
		// }
		
		$('#row'+rowNumber).append('<tr>'+
							'<td>'+testName+'</td>'+
							'<td><h3>'+value+'</td>'+
							'<td>'+units+'</td>'+
						'</tr>');
	}	
}

function appendReportTitle(reportTitle, rowNumber){
	$('#reportRows').append('<li>'+
						'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
							'<tr class="orange">'+
								'<td class="status"></td>'+
								'<td class="name"><h2>' + reportTitle +'<h2></td>'+
								'<td class="doctor">DR. P SMITH</td>'+
							'</tr>'+
							'<tr>'+
							'<td colspan="4">'+
								'<table class="innerTable2" >'+
								'<div id="row'+rowNumber+'">');
}