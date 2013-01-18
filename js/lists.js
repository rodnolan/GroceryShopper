app.lists = function () {

	'use strict';

	var pub = {};

	pub.onDOMReady = function (whichList) {
		app.db.setTestData();
		pub.addEventListeners();
		pub.populateItems(whichList);
	};

	pub.addEventListeners = function (whichList) {
		document.getElementById('btnCartItems').addEventListener('click', function(){pub.populateItems(app.LIST_CART);});
		document.getElementById('btnShelfItems').addEventListener('click', function(){pub.populateItems(app.LIST_SHELF);});
	};

	pub.populateItems = function (whichList) {
		var itemsList = document.getElementById('itemsList'),
			screenTitle = document.getElementById('screenTitle'),
			listItems,
			listItem, 
			newItem,
			i;

		$(itemsList).fadeOut('fast');
		itemsList.clear();

		switch (whichList) {
			case app.LIST_CART :
				console.log('my cart items');
				listItems = app.db.getArray(app.LSK_CART);
				screenTitle.setCaption('Items In Cart');

			break;
			case app.LIST_SHELF :
				console.log('shelf items');
				listItems = app.db.getArray(app.LSK_SHELF);
				screenTitle.setCaption('Items to Get');

			break;
		}

		for (i = 0; i < listItems.length; i++) {
			listItem = listItems[i];
			console.log(listItem);
			newItem = document.createElement('div');
			newItem.setAttribute('data-item-id', listItem.id);
			newItem.setAttribute('data-item-idx', i);
			newItem.setAttribute('data-lst', whichList);

			newItem.setAttribute('data-bb-type', 'item');
			newItem.setAttribute('data-bb-style', 'removebuttons');
			newItem.setAttribute('data-bb-title', listItem.name);
			newItem.innerHTML = listItem.quantity + " @ " + listItem.price;
			console.log(newItem);

			newItem.onclick = function(){
				var selectedItemData = itemsList.selected.dataset;
				console.log("selected itemId: " + selectedItemData.itemId + " from [" + selectedItemData.itemIdx + "] in list: " + selectedItemData.lst);
				app.currentList = selectedItemData.lst;
				window.addEventListener(app.DATA_CHANGED_EVENT, pub.onDataUpdated);
				app.db.moveItem(selectedItemData.itemIdx, selectedItemData.lst);
			};
			itemsList.appendItem(newItem);
		};
		$(itemsList).fadeIn('fast');
	};

	pub.onDataUpdated = function (event) {
		console.log('onDataUpdated');
		window.removeEventListener(app.DATA_CHANGED_EVENT, pub.onDataUpdated);
		pub.populateItems(app.currentList);
	};

	return pub;
}();


