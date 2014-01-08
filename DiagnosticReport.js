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
				displayReport(entries[i].content.contained, entries[i].title, i);
			}
			else
			{
				displayReportDiv(entries[i], entries[i].title, i);
			}
		}
	}
}

function displayReportDiv(entry, reportTitle, rowNumber) {
	$('#reportRows').children('li').remove();
	$('#reportRows').append('<li>'+
						'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
							'<tr class="orange">'+
								'<td class="status"></td>'+
								'<td class="name"><h2>' + reportTitle +'<h2></td>'+
							'</tr>'+
							'<tr>'+
							'<td colspan="4">'+
								'<table class="innerTable2" >'+
								'<div id="row'+rowNumber+'">');
							
		$('#row'+rowNumber).append('<tr>'+
							'<td>'+entry.content.text.div+'</td>'+
						'</tr>');
}

function displayReport(containedResults, reportTitle, rowNumber) {
	$('#reportRows').append('<li>'+
						'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
							'<tr class="orange">'+
								'<td class="status"></td>'+
								'<td class="name"><h2>' + reportTitle +'<h2></td>'+
								//'<td class="doctor">DR. P SMITH</td>'+
							'</tr>'+
							'<tr>'+
							'<td colspan="4">'+
								'<table class="innerTable2" >'+
								//'<tr>'+
								//	'<td><h1>Test Name</h1></td>'+
								//	'<td><h1>Result</h1></td>'+
								//	'<td><h1>(Units)</h1></td>'+
								//'</tr>'+
								'<div id="row'+rowNumber+'">');
							
	for (var i = 0; i < containedResults.length; i++){
		
		var testName = containedResults[i].name.coding[0].display;
		var units = containedResults[i].valueQuantity.units;
		
		if(containedResults[i].valueQuantity.value != null)
		{
			var value = containedResults[i].valueQuantity.value;
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