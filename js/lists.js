app.lists = function () {

	'use strict';

	var pub = {};

	pub.onDOMReady = function (whichList) {
		app.db.setTestData();
		pub.addEventListeners();
		pub.populateItems(whichList);
	};
 
	pub.addEventListeners = function (whichList) {
		document.getElementById('btnInventory').addEventListener('click', function(){pub.populateItems(app.INVENTORY);});
		document.getElementById('btnList').addEventListener('click', function(){pub.populateItems(app.LIST);});
		document.getElementById('btnCart').addEventListener('click', function(){pub.populateItems(app.CART);});
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
			case app.INVENTORY :
				console.log('inventory items');
				listItems = app.db.getArray(app.KEY_INVENTORY);
				screenTitle.setCaption('Inventory');

			break;
			case app.CART :
				console.log('cart items');
				listItems = app.db.getArray(app.KEY_CART);
				screenTitle.setCaption('My Cart');

			break;
			case app.LIST :
				console.log('list items');
				listItems = app.db.getArray(app.KEY_LIST);
				screenTitle.setCaption('Grocery List');

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


