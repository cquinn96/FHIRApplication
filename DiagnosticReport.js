function displayReports(entries, totalReports, name) {
	$('#pageHeader').text('Results for: ' + name + ' (' + totalReports + ' reports found)');
	
	$('#reportRows').children('li').remove();
	if(entries.length == 0)
	{
		$('#reportRows').append('<li>'+
				'<table class="tableContainer" cellspacing="0" cellpadding="0">'+
					'<tr class="orange">'+
						'<td class="status"></td>'+
						'<td class="name"><h2>No report found for '+ name + '.<h2></td>'+
					'</tr>'+
					'<tr>');
	}
	else {
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
}

//There is no contained, so only show the 'div' value returned
function displayReportDiv(entry, reportTitle, rowNumber) {
	appendReportTitle(reportTitle, rowNumber);
							
	$('#row'+rowNumber).append('<tr>'+
									'<td>'+entry.content.text.div+'</td>'+
								'</tr>');
}

function displayReportLikeDiv(containedResults, reportTitle, rowNumber) {
	appendReportTitle(reportTitle, rowNumber);
	var textDiv = '<?xml version=\"1.0\" encoding=\"UTF-8\"?> <div xmlns=\"http://www.w3.org/1999/xhtml\"> &#x0A;&#x0A;  <pre>&#x0A;';
	textDiv +=  '<table><tr><th>SERUM/PLASMA</th><th>\t\tResult</th><th>\tUnits</th><th>\tReference Range</th>';
	for (var i = 0; i < containedResults.length; i++){
		textDiv += '<tr>';
		
		if(containedResults[i].name != null)
		{
			var testName = containedResults[i].name.coding[0].display;
			testName = testName.replace(' in Serum or Plasma', '');
			textDiv += '<td>';
			textDiv += testName;
			textDiv += '</td>';
		}
		
		if(containedResults[i].valueQuantity != null)
		{
			if(containedResults[i].valueQuantity.value != null)
			{
				var value = containedResults[i].valueQuantity.value;
				textDiv += '<td>';
				textDiv += '\t\t' + value;
				textDiv += '</td>';
			}
			if(containedResults[i].valueQuantity.units != null)
			{
				var units = containedResults[i].valueQuantity.units;
				textDiv += '<td>';
				textDiv += '\t' + units;
				textDiv += '</td>';
			}
		}
		if(containedResults[i].referenceRange != null)
		{
			var referenceRange = '(' + containedResults[i].referenceRange[0].low.value + ' - ' + containedResults[i].referenceRange[0].high.value + ')';
			textDiv += '<td>';
			textDiv += '\t' + referenceRange;
			textDiv += '</td>';
		}
		textDiv += '</tr> &#x0A;';
	}	
	
	textDiv += '</table></pre>&#x0A;</div>';
	
	// $('#row'+rowNumber).append('<tr>'+
								// '<td>'+textDiv+'</td>'+
							// '</tr>');
}

function displayReport(containedResults, reportTitle, rowNumber) {
	appendReportTitle(reportTitle, rowNumber);
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
	
	$('#reportListView'+rowNumber).listview("refresh");	
	$("#reportCollabsibleSet" ).collapsibleset( "refresh" );
	//$('#report'+rowNumber).collapsibleset( "refresh" );

}

function appendReportTitle(reportTitle, rowNumber){
	// $('#reportRows').append('<li>'+
						// '<table class="tableContainer" cellspacing="0" cellpadding="0">'+
							// '<tr class="orange">'+
								// '<td class="status"></td>'+
								// '<td class="name"><h2>' + reportTitle +'<h2></td>'+
								// '<td class="doctor">DR. P SMITH</td>'+
							// '</tr>'+
							// '<tr>'+
							// '<td colspan="4">'+
								// '<table class="innerTable2" >'+
								// '<div id="row'+rowNumber+'">');
								
								
	$('#reportCollabsibleSet').append(
									'<div data-role="collapsible" id="report'+rowNumber+'">'+
										'<h2>' + reportTitle +'</h2>'+
									'</div>'
									);
									
	
			
	$('#report'+rowNumber).append(
							'<ul data-role="listview" data-filter="true" data-filter-theme="c" data-divider-theme="d" id="reportListView'+rowNumber+'">'+
							'</ul>'
							);
	
	// $('#report'+rowNumber).append(
        // '<ul data-role="listview" data-theme="d" data-divider-theme="d">'+
		// '</ul>');

			
	 // $('#DiagnosticReportPage').append(
						// '<div data-role="collapsible-set" data-theme="b" data-content-theme="d">'+
							// '<div data-role="collapsible">'+
								// '<h2>Report Title</h2>'+
								// '<ul data-role="listview" data-filter="true" data-filter-theme="c" data-divider-theme="d" id="reportListView">'+
									// '<li><a href="index.html">Acura</a></li>'+
									// //'<div id="row'+rowNumber+'">'+
								// '</ul>'+
							// '</div>'+
						// '</div>'
						// );
						
	$( '#reportListView'+rowNumber).listview({
	  create: function( event, ui ) {}
	});

	$('#reportCollabsible'+rowNumber).collapsibleset({
	   create: function(event, ui) {}
	});
						
	$('#reportListView'+rowNumber).listview("refresh");
	//$("#reportCollabsibleSet" ).collapsibleset( "refresh" );
	//$('#report'+rowNumber).collapsibleset( "refresh" );
}