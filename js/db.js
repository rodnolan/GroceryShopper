app.db = function () {

	'use strict';
//		<div id="sharetext" data-bb-type="item" data-bb-img="./img/Large/White/icon_242.png" data-bb-title="Share Text"></div>
//		<div id="shareimg" data-bb-type="item" data-bb-img="./img/Large/White/icon_209.png" data-bb-title="Share Image" data-bb-accent-text="file://"></div>

	var pub = {};

	pub.clearTestData = function () {
		localStorage.setItem('shelf', '');
		localStorage.setItem('cart', '');
	};

	pub.setTestData = function () {
		console.log('pub.populateTestData');

		var shelfData = '['
				+ '{"idx":"1", "name":"Item 1", "price":"0.99/ea", "quantity":"12"},'
				+ '{"idx":"4", "name":"Item 4", "price":"4.99/lb", "quantity":"4"},'
				+ '{"idx":"5", "name":"Item 5", "price":"2.99/kg", "quantity":"2"}'
				+ ']',
			cartData = '['
				+ '{"idx":"2", "name":"Item 2", "price":"2.59/kg", "quantity":"1"},'
				+ '{"idx":"3", "name":"Item 3", "price":"4.99/lb", "quantity":"4"},'
				+ '{"idx":"6", "name":"Item 6", "price":"1.19/ea", "quantity":"2"}'
				+ ']';
				
		console.log('storing sample data');
		localStorage.setItem('shelf', shelfData);
		localStorage.setItem('cart', cartData);
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

	pub.moveItemToCart = function (idx) {
		console.log('Adding item to cart: ' + idx);
		var cart = pub.getArray(app.LSK_CART), 
			shelf = pub.getArray(app.LSK_SHELF), 
			itemToMove = shelf.splice(idx, 1)[0];
		if (itemToMove) {
			cart.push(itemToMove);
			pub.persist(app.LSK_CART, cart);
			pub.persist(app.LSK_SHELF, shelf);
		}
	};

	pub.persist = function (slot, items) {
		localStorage.setItem(slot, JSON.stringify(items));
	};



	return pub;
}();
