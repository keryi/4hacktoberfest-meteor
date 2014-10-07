Meteor.publish('menus', function() {
	return Menus.find();
});

Meteor.publish('orders', function() {
	return Orders.find();
});

Meteor.publish('orderlists', function() {
	return OrderLists.find();
});