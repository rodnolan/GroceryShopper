GroceryShopper
==============

the plan is to create a bbm, nfc and email enabled app that helps wives tell husbands what to buy on the way home from work and helps husbands figure out what the wife really wanted

the app supports two main use cases
	- putting new items in the list 
		- using in-app UI
		- from email message
		- from bbm message
		- from nfc tag

	- managing the list while you're buying the groceries at the store	
		- view list items
		- view notes on list
		- move item to cart
		- put item back on shelf


Use Cases
=========

User Adds Item to List using in-app screen

	user clicks Add Item action item
		app opens a new screen; user sees UI to enter name, price, quantity, and notes
		app creates a new empty grocVO  
	
	user enters a name
		app saves entered name on blur to an internal list 
		app saves entered name in new grocVO
	or 
	user clicks a control to see a list of previously entered items 
		app reads database and presents a list of items (grid and list should be supported)
		user selects an item
		app stores selected name in new grocVO

	user enters a price
	user selects a 'per' unit ... kg, lb, each, bag

	user enters a quantity

	user adds free form notes

	user clicks the Save button
		item gets added to the list and the UI clears itself

	user repeats use case or clicks the View List action item


User Shares Item(s)

	user clicks Share Items action item
		app displays a list of items in list

	user presses one or more items to share
		app styles selected items accordingly, allows multi-selection

	user clicks share
		app displays a Share card with BBM, BBM Group, Email, NFC

	user clicks OK
		app branches according to the selected action item

		NFC
			app displays NFC Share card
			users bumps device 2
			app sends data to device 2, confirms that file was sent successfully, returns to list 

		BBM/Group
			app presents a BBM contact picker
			user selects a bbm contact or group
			app stores selected contact or group for future use, sends data to selected bbm user or group, confirms that it was sent successfully, returns to list

		EMAIL
			app presents a compose email card with the subject and body prefilled
			user clicks send
			app sends email


Add Item to List from email message 

	user opens email intended for GroceryApp
	user opens context menu and selects Send to GroceryApp
		email app invokes our AddItems card which lists items to be added
	user reviews list and clicks Add 
		app adds items and returns to email app


Add Item to List from NFC

	user bumps senders phone
		app receives message from sender and invokes our AddItems card which lists items to be added
	user reviews list and clicks Add 
		app adds items and returns to email app

Add Item to List from BBM message

	user receives BBM message intended for GroceryApp 
	user opens context menu and selects Send to GroceryApp
		email app invokes our AddItems card which lists items to be added
	user reviews list and clicks Add 
		app adds items and returns to email app



	user sends email in the following format
name: item name 1
price: .99/kg
quantity:  
notes: 
---
name: 
price: 
quantity:  
notes: 
---

each item in the list shows
	- a name
	- a price
	- a quantity 
	- notes
