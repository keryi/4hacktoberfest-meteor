Meteor.publish('menus', function() {
	return Menus.find();
});

Meteor.publish('singleMenu', function(id) {
	return Menus.findOne(id);
});

Meteor.publish('orders', function(orderListId) {
	return Orders.find({ orderListId: orderListId });
});

Meteor.publish('orderList', function(id) {
	return OrderLists.find(id);
});