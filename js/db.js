app.db = function () {

	'use strict';

	var pub = {};
		
	pub.clearTestData = function () {
		localStorage.clear();
		localStorage.setItem(app.KEY_INVENTORY, '');
		localStorage.setItem(app.KEY_LIST, '');
		localStorage.setItem(app.KEY_CART, '');
	};

	pub.setTestData = function () {
		console.log('pub.populateTestData');

		var filePath = 'data/inventoryData.json',
			inventoryData = '',
			shelfData = '',
			cartData = '';
 		
		$.ajax({
			type : 'GET',
			url : filePath,
			dataType : 'json',
			success : function (response, status, xhr) {
			    console.log('success reading inventory: status: ' + status);
			    console.log(response);
			    inventoryData = response;
			},
			error : function (jqXHR, textStatus, errorThrown) {
			    console.log('error reading inventory: textStatus: ' + textStatus + " error: " + errorThrown);
			},
			complete : function (jqXHR, textStatus) {
			    console.log('complete reading inventory: textStatus ' + textStatus);
			    if (inventoryData === '') {
					console.log('using hard-coded inventory');
					inventoryData =   '['
									+ 	'{"id":"1", "name":"eggs", "price":"", "quantity":""},'
									+ 	'{"id":"2", "name":"cheese", "price":"", "quantity":""},'
									+ 	'{"id":"3", "name":"apples", "price":"", "quantity":""},'
									+ 	'{"id":"4", "name":"milk", "price":"", "quantity":""},'
									+ 	'{"id":"5", "name":"bread", "price":"", "quantity":""},'
									+ 	'{"id":"6", "name":"oranges", "price":"", "quantity":""}'
									+ ']';
				}
				localStorage.setItem(app.KEY_INVENTORY, JSON.stringify(inventoryData));
				localStorage.setItem(app.KEY_LIST, shelfData);
				localStorage.setItem(app.KEY_CART, cartData);
			}
		});			
	};



	pub.getArray = function (key) {
		console.log('Getting ' + key + ' items.');
		var temp = localStorage.getItem(key);
		if (temp === "") {
			return [];
		} else {
			return JSON.parse(temp);
		}
	};

	pub.moveItem = function (idx, srcList) {
		var src,  
			dest, 
			itemToMove,
			itemToCopy,
			inventory = pub.getArray(app.KEY_INVENTORY),
			cart = pub.getArray(app.KEY_CART),
			shelf = pub.getArray(app.KEY_LIST);

		switch(srcList) {
			case app.INVENTORY :
				console.log('Copying item to shelf: ' + idx);
				src = inventory; 
				dest = shelf;
				itemToCopy = src[idx];
				if (itemToCopy) {
					dest.push(itemToCopy);
					pub.persist(app.KEY_LIST, shelf);
					pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
				}
			break;
			case app.LIST :
				console.log('Moving item to cart: ' + idx);
				src = shelf; 
				dest = cart;

				itemToMove = src.splice(idx, 1)[0];
				if (itemToMove) {
					dest.push(itemToMove);
					pub.persist(app.KEY_INVENTORY, inventory);
					pub.persist(app.KEY_CART, cart);
					pub.persist(app.KEY_LIST, shelf);
					pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
				}

			break;
			case app.CART :
				console.log('Putting item back on shelf: ' + idx);
				src = cart; 
				dest = shelf;
				itemToMove = src.splice(idx, 1)[0];
				if (itemToMove) {
					dest.push(itemToMove);
					pub.persist(app.KEY_INVENTORY, inventory);
					pub.persist(app.KEY_CART, cart);
					pub.persist(app.KEY_LIST, shelf);
					pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
				}
			break;
		}
	};

	pub.persist = function (slot, items) {
		localStorage.setItem(slot, JSON.stringify(items));
	};

	pub.dispatchDataEvent = function (type) {
		var evt = document.createEvent('Events');
		evt.initEvent(type, true, true);
		document.dispatchEvent(evt);
	};


	return pub;
}();


