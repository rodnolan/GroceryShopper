app.manageInventory = function () {

	'use strict';

	var pub = {};
		pub.afterSave = '';

	pub.onDOMReady = function () {
		pub.addEventListeners();
	};
 
	pub.addEventListeners = function () {
		console.log('in addEventListeners');
		document.getElementById('btnSaveReturn').addEventListener('click', function(){pub.save('return');});
		document.getElementById('btnSaveContinue').addEventListener('click', function(){pub.save('continue');});
	};

	pub.save = function (onSave) {
		var itemToSave = {};

		pub.afterSave = onSave;
		itemToSave.name = document.getElementById('name').value;
		itemToSave.price = document.getElementById('price').value;
		itemToSave.quantity = document.getElementById('quantity').value;
		itemToSave.notes = document.getElementById('notes').value;
		window.addEventListener(app.DATA_CHANGED_EVENT, pub.onDataUpdated);
		app.db.addItemToList(itemToSave);
	};

	pub.onDataUpdated = function (event) {
		console.log('onDataUpdated');
		window.removeEventListener(app.DATA_CHANGED_EVENT, pub.onDataUpdated);
		if (pub.afterSave === 'continue') {
			// clear form
			document.getElementById('name').value = '';
			document.getElementById('price').value = '';
			document.getElementById('quantity').value = '';
			document.getElementById('notes').value = '';
		} else {
			// return to previous list 
			console.log('save and return');
		}

	};

	return pub;
}();


