var ServiceCall = {

	var login = function(loginRequestJSON) {

		$.ajax({
			type: "POST",
			contentType: 'application/json',
			data: loginRequestJSON,
			url: "http://evolve/services/api/authentication/login",
			success: function (msg) {
				if (msg.Status == SUCCESS) {
                // Successfully logged in to Evolve
                AppSetup.sessionKey = msg.SessionKey;

                

            }
            else {
                // Login request failed
            }
        },
        error: function (msg) {
            // Login request failed
        }
    });
	}

};


var Actions = {

	var APIkey = "ABCDE";
	
	var login = function(username,password) {

		var JSONToSend = {
			"userName":username,
			"password":password,
			"deviceId":"AEFDSF-F32424-DF3333",
			"deviceName":"TestDevice",
			"deviceOSVersion":"6.0",
			"appVersion":"3.2"
			"includeWorkflow":true  
		}

		ServiceCall.login(JSONToSend);

	}


};