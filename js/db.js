app.db = function () {

	'use strict';

	var pub = {};

	pub.clearTestData = function () {
		localStorage.setItem('shelf', '');
		localStorage.setItem('cart', '');
	};

	pub.setTestData = function () {
		console.log('pub.populateTestData');

		var cart, shelf, testData = '', itemsLoaded = pub.getArray('shelf').length;

		if (!itemsLoaded) {

			testData = '['
				+ '{"name":"Item 1", "price":"0.99/ea", "quantity":"4"},'
				+ '{"name":"Item 2", "price":"4.99/lb", "quantity":"4"},'
				+ '{"name":"Item 3", "price":"2.99/kg", "quantity":"2"}'
				+ ']';
				
			console.log('storing testData: ' + testData);
			localStorage.setItem('shelf', testData);
			localStorage.setItem('cart', '');
		} 
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
		var cart = pub.getArray('cart'), 
			shelf = pub.getArray('shelf'), 
			itemToMove = shelf.splice(idx, 1)[0];
		if (itemToMove) {
			cart.push(itemToMove);
			pub.persist('cart', cart);
			pub.persist('shelf', shelf);
		}
	};

	pub.persist = function (slot, items) {
		localStorage.setItem(slot, JSON.stringify(items));
	};



	return pub;
}();
