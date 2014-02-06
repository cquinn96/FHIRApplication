function displayReports(entries, totalReports) {
	// $('#pageHeader').text('Results for: ' + name + ' (' + totalReports + ' reports found)');
	
	$('#reportCollabsibleSet').children('div').remove();
	$('#pageHeader').text(totalReports + ' report(s) found');

	for(var i = 0; i < entries.length; i++)
	{
		if(entries[i].content.contained != null)
		{
			if(entries[i].content.contained[0].name != null)
				displayReport(entries[i].content.contained, entries[i].title, i);
				//displayReportLikeDiv(entries[i].content.contained, entries[i].title, i);
			else
				displayReportDiv(entries[i], entries[i].title, i);
		}
		else
		{
			displayReportDiv(entries[i], entries[i].title, i);
		}
	}
}

//There is no contained, so only show the 'div' value returned
function displayReportDiv(entry, reportTitle, rowNumber) {
	appendReportTitle(reportTitle, rowNumber);

	$('#report'+rowNumber).append('<p>'+entry.content.text.div+'</p>');
	$("#reportCollabsibleSet" ).collapsibleset( "refresh" );			
}

function displayReport(containedResults, reportTitle, rowNumber) {
	appendReportTitle(reportTitle, rowNumber);

	$('#report'+rowNumber).append(
							'<ul data-role="listview" data-theme="a" data-inset="true" data-filter="true" data-filter-theme="b" data-divider-theme="a" id="reportListView'+rowNumber+'">'+
							'</ul>'
							);
						
	$( '#reportListView'+rowNumber).listview();				

	for (var i = 0; i < containedResults.length; i++){
		
		if(containedResults[i].name != null)
		{
			var testName = containedResults[i].name.coding[0].display;
			testName = testName.replace(' in Serum or Plasma', '');
			var n = testName.indexOf("[");
			if(n>0)
				testName = testName.substring(0, n);
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
		
		// $('#row'+rowNumber).append('<tr>'+
							// '<td>'+testName+'</td>'+
							// '<td><h3>'+value+'</td>'+
							// '<td>'+units+'</td>'+
						// '</tr>');

		//$('#reportListView'+rowNumber).append('<li><a href="">'+testName+'</a></li>');
		
		$('#reportListView'+rowNumber).append(
									'<li><a href="">'+
									'<h3>'+testName+'</h3>'+
								//'<p><strong>'+value+'</strong></p>'+
								//'<p>'+units+'</p>'+
								'<p class="ui-li-aside"><strong>'+value+'</strong>'+units+'</p>'+
							'</a></li>'
							);					
	}
	
	$("#reportCollabsibleSet" ).collapsibleset( "refresh" );
	$('#reportListView'+rowNumber).listview("refresh");	
	//$('#report'+rowNumber).collapsibleset( "refresh" );
}

function appendReportTitle(reportTitle, rowNumber){									
	$('#reportCollabsibleSet').append(
									'<div data-role="collapsible" id="report'+rowNumber+'">'+
										'<h2>' + reportTitle +'</h2>'+
									'</div>'
									);
}