if (Menus.find().count() == 0) {
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

	Orders.insert({
		menuId: wmId,
		quantity: 2
	});

	Orders.insert({
		menuId: crId,
		quantity: 1
	});
}