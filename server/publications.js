Meteor.publish('menus', function() {
	return Menus.find();
});

Meteor.publish('orders', function() {
	return Orders.find();
});

Meteor.publish('orders_lists', function() {
	return OrdersLists.find();
});