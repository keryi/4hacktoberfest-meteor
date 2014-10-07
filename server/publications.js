Meteor.publish('menus', function() {
	return Menus.find();
});

Meteor.publish('orders',function() {
	return Orders.find();
});