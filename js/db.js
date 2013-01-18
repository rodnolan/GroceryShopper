app.db = function () {

	'use strict';

	var pub = {};
		

	pub.clearTestData = function () {
		localStorage.clear();
		localStorage.setItem(app.LSK_SHELF, '');
		localStorage.setItem(app.LSK_CART, '');
	};

	pub.setTestData = function () {
		console.log('pub.populateTestData');

		var shelfData = '['
				+ '{"id":"1", "name":"Item 1", "price":"0.99/ea", "quantity":"12"},'
				+ '{"id":"4", "name":"Item 4", "price":"4.99/lb", "quantity":"4"},'
				+ '{"id":"5", "name":"Item 5", "price":"2.99/kg", "quantity":"2"}'
				+ ']',
			cartData = '['
				+ '{"id":"2", "name":"Item 2", "price":"2.59/kg", "quantity":"1"},'
				+ '{"id":"3", "name":"Item 3", "price":"4.99/lb", "quantity":"4"},'
				+ '{"id":"6", "name":"Item 6", "price":"1.19/ea", "quantity":"2"}'
				+ ']';
				
		console.log('storing sample data');
		localStorage.setItem(app.LSK_SHELF, shelfData);
		localStorage.setItem(app.LSK_CART, cartData);
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
			cart = pub.getArray(app.LSK_CART),
			shelf = pub.getArray(app.LSK_SHELF);

		switch(srcList) {
			case app.LIST_SHELF :
				console.log('Moving item to cart: ' + idx);
				src = shelf; 
				dest = cart;
			break;
			case app.LIST_CART :
				console.log('Putting item back on shelf: ' + idx);
				src = cart; 
				dest = shelf;
			break;
		}
		itemToMove = src.splice(idx, 1)[0];
		if (itemToMove) {
			dest.push(itemToMove);
			pub.persist(app.LSK_CART, cart);
			pub.persist(app.LSK_SHELF, shelf);
			pub.dispatchDataEvent(app.DATA_CHANGED_EVENT);
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


