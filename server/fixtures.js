if (Menus.find().count() == 0) {
	var now = new Date().getTime();

	var crId = Menus.insert({
		name: 'Chicken Rice',
		price: 5.50,
	});
	
	var wmId = Menus.insert({
		name: 'Wantoon Mee',
		price: 4.50,
	});

	var fmId = Menus.insert({
		name: 'Fried Meehoon',
		price: 3.50,
	});

	var orderListOneId = OrderLists.insert({
		paid: false,
	});

	Orders.insert({
		menuId: wmId,
		orderListId: orderListOneId,
		quantity: 2,
		status: 'processing'
	});

	Orders.insert({
		menuId: crId,
		orderListId: orderListOneId,
		quantity: 1,
		status: 'cooking'
	});

	Orders.insert({
		menuId: fmId,
		orderListId: orderListOneId,
		quantity: 5,
		status: 'served'
	});
}