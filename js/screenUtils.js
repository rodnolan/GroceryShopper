app.screenUtils = function () {

	'use strict';

	var pub = {};

	pub.onScreenReady = function (element) {
		var actionBarFilePath = 'actionBars/abGroceryList.html',
			actionBarButtons = "";

		$.ajax({
			type : 'GET',
			url : actionBarFilePath,
			dataType : 'html',
			success : function (response, status, xhr) {
			    console.log('success loading inventory: status: ' + status);
			    console.log(response);
			    actionBarButtons = response;
			},
			error : function (jqXHR, textStatus, errorThrown) {
			    console.log('error loading actionBar: textStatus: ' + textStatus + " error: " + errorThrown);
			},
			complete : function (jqXHR, textStatus) {
			    console.log('complete loading actionBar: textStatus ' + textStatus);
			    if (actionBarButtons != null) {
					$('#actionBar', element).append(actionBarButtons);
			    }
			}
		});	
	};

	return pub;
}();


