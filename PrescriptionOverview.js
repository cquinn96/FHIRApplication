function populatePrescriptionOverview(prescription) {
	$.mobile.changePage("index.html#PrescriptionOverviewPage");

	var prescriptionID = prescription.prescriptionID
	var status = prescription.status;
	var patientID = prescription.patientID;
	var patientName = prescription.patientName;
	var prescriberID = prescription.prescriberID;
	var prescriberName = prescription.prescriberName;
	var medicationID = prescription.medicationID;
	var medicationName = prescription.medicationName;
	var amount = prescription.amount;
	var frequency = prescription.frequency;
	var timeframe = prescription.timeframe;
	var doseQuantity = prescription.doseQuantity;
	var doseUnits = prescription.doseUnits;
	var route = prescription.route;
	var dispenseQuantity = prescription.dispenseQuantity;
	var dispenseUnits = prescription.dispenseUnits;

	if(timeframe == 'd')
	{
		timeframe = 'day';
	}
	else if(timeframe == 'w')
	{
		timeframe = 'week';
	}
	else if(timeframe == 'm')
	{
		timeframe = 'month';
	}

	$('#prescriptionOverviewHeader').text(patientName);
	//remove all items in list
	$('#prescriptionOverviewRow').children('li').remove();
	//populate new items for list
	$('#prescriptionOverviewRow').append('<li> <i>Patient ID</i> - ' + patientID +'</li>'+
									'<li> <i>Patient Name</i> - '+ patientName+'</li>'+
									'<li> <i>Prescribed By</i> - ' + prescriberName +'</li>'+
									'<li> <i>Medication Name</i> - '+ medicationName +'</li>'+
									'<li> <i>Dosage</i> - ' + doseQuantity + doseUnits + '</li>'+
									'<li> <i>Route</i> - ' + route +'</li>'+
									'<li> <i>Status</i> - ' + status +'</li>'+
									'<li> <i>Advice</i> - Take ' + inWords(amount) + doseQuantity + doseUnits +' dose, ' + inWords(frequency) + ' times a ' + timeframe + ' </li>');

	//if the listview exsists, refresh it, otherwise create it
	if ($('#prescriptionOverviewRow').hasClass('ui-listview')) {
    	$('#prescriptionOverviewRow').listview('refresh');
     } 
	else {
    	$('#prescriptionOverviewRow').trigger('create');
     }
}

var a = ['','ONE ','TWO ','THREE ','FOUR ', 'FIVE ','SIX ','SEVEN ','EIGHT ','NINE ','TEN ','ELEVEN ','TWELVE ','THIRTEEN ','FOURTEEN ','FIFTEEN ','SIXTEEN ','SEVENTEEN ','EIGHTEEN ','NINETEEN '];
var b = ['', '', 'TWENTY','THIRTY','FORTY','FIFTY', 'SIXTY','SEVENTY','EIGHTY','NINETY'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    console.log(n);
    if (!n) return; 
    var str = '';
    // str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    // str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    // str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    // str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}