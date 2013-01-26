app.db = function () {

	'use strict';

	var pub = {};
		

	pub.clearTestData = function () {
		localStorage.clear();
		localStorage.setItem(app.LSK_INVENTORY, '');
		localStorage.setItem(app.LSK_SHELF, '');
		localStorage.setItem(app.LSK_CART, '');
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
			    console.log('  in ajax success: status: ' + status);
			    console.log(response);
			    inventoryData = response;
			},
			error : function (jqXHR, textStatus, errorThrown) {
			    console.log('  in ajax error: status: ' + textStatus);
			    console.log('  in ajax error: error : ' + errorThrown);
			},
			complete : function (jqXHR, textStatus) {
			    console.log('  in ajax complete: textStatus ' + textStatus);
			    if (inventoryData === '') {
					console.log('  ajax call did not succeed, using hard-coded inventory');
					inventoryData = '['
								+ '{"id":"0", "name":"Placeholder 1", "price":"1.99/ea", "quantity":"1"},'
								+ '{"id":"1", "name":"Placeholder2 ", "price":"1.99/ea", "quantity":"1"},'
								+ ']';
				}
				localStorage.setItem(app.LSK_INVENTORY, JSON.stringify(inventoryData));
				localStorage.setItem(app.LSK_SHELF, shelfData);
				localStorage.setItem(app.LSK_CART, cartData);
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
			inventory = pub.getArray(app.LSK_INVENTORY),
			cart = pub.getArray(app.LSK_CART),
			shelf = pub.getArray(app.LSK_SHELF);

		switch(srcList) {
			case app.LIST_INVENTORY :
				console.log('Copying item to shelf: ' + idx);
				src = inventory; 
				dest = shelf;
				itemToCopy = src[idx];
				if (itemToCopy) {
					dest.push(itemToCopy);
					pub.persist(app.LSK_SHELF, shelf);
					pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
				}
			break;
			case app.LIST_SHELF :
				console.log('Moving item to cart: ' + idx);
				src = shelf; 
				dest = cart;

				itemToMove = src.splice(idx, 1)[0];
				if (itemToMove) {
					dest.push(itemToMove);
					pub.persist(app.LSK_INVENTORY, inventory);
					pub.persist(app.LSK_CART, cart);
					pub.persist(app.LSK_SHELF, shelf);
					pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
				}

			break;
			case app.LIST_CART :
				console.log('Putting item back on shelf: ' + idx);
				src = cart; 
				dest = shelf;
				itemToMove = src.splice(idx, 1)[0];
				if (itemToMove) {
					dest.push(itemToMove);
					pub.persist(app.LSK_INVENTORY, inventory);
					pub.persist(app.LSK_CART, cart);
					pub.persist(app.LSK_SHELF, shelf);
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


