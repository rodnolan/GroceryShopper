app.lists = function () {

	'use strict';

	var pub = {};

	pub.onScreenReady = function (element) {
		//var actionBarFilePath = 'actionBars/abGroceryList.html',
		//	actionBarButtons = "<div id='btnInventory' data-bb-type='action' data-bb-style='tab' data-bb-overflow='false' data-bb-img='./img/Large/White/icon_180.png'>Inventory</div><div id='btnList' data-bb-type='action' data-bb-style='tab' data-bb-overflow='false' data-bb-img='./img/Large/White/icon_180.png'>Grocery List</div><div id='btnCart' data-bb-type='action' data-bb-style='tab' data-bb-overflow='false' data-bb-img='./img/Large/White/icon_180.png'>My Cart</div>";
		//$('#actionBar', element).append(actionBarButtons);
	};


	pub.onDOMReady = function (whichList) {
		if (localStorage.getItem(app.KEY_JSON_LOADED) == null) {
			console.log('loading inventory from external source');
			app.db.initData();
		}
		pub.addEventListeners();
		pub.initUI(whichList);
		pub.populateItems(whichList);
	};
 
	pub.addEventListeners = function () {
		document.getElementById('tabInventory').addEventListener('click', function(){pub.populateItems(app.INVENTORY);});
		document.getElementById('tabList').addEventListener('click', function(){pub.populateItems(app.LIST);});
		document.getElementById('tabCart').addEventListener('click', function(){pub.populateItems(app.CART);});
		document.getElementById('btnAdd').addEventListener('click', function(){bb.pushScreen('addForm.html', 'addForm')});
		document.getElementById('miSettings').addEventListener('click', function(){ });
		document.getElementById('miBBMConnect').addEventListener('click', function(){ });
		document.getElementById('miSendList').addEventListener('click', function(){ });
		document.getElementById('cmDeleteItem').addEventListener('click', function(){ });
		document.getElementById('cmEditItem').addEventListener('click', function(){ });
		document.getElementById('cmAddItem').addEventListener('click', function(){ bb.pushScreen('addForm.html', 'addForm') });


	};

	pub.initUI = function (whichList) {
		var actionBar = document.getElementById('actionBar'),
			tInvt = document.getElementById('tabInventory'),
			tCart = document.getElementById('tabCart'),
			tList = document.getElementById('tabList'),
			selectedTab;

		switch (whichList) {
			case app.LIST :
				selectedTab = tList;
			break;
			case app.INVENTORY :
				selectedTab = tInvt;
			break;
			case app.CART :
				selectedTab = tCart;
			break;
		}
		actionBar.setSelectedTab(selectedTab);
	};

	pub.populateItems = function (whichList) {
		var itemsList = document.getElementById('itemsList'),
			screenTitle = document.getElementById('screenTitle'),
			listItems,
			listItem, 
			newItem,
			i;

		$(itemsList).fadeOut('fast', function(){
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
					screenTitle.setCaption('My List');

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
				if (whichList != app.INVENTORY) {
					newItem.innerHTML = listItem.quantity + " @ " + listItem.price;
				}
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
		});
	};

	pub.onDataUpdated = function (event) {
		console.log('onDataUpdated');
		window.removeEventListener(app.DATA_CHANGED_EVENT, pub.onDataUpdated);
		pub.populateItems(app.currentList);
	};

	return pub;
}();



