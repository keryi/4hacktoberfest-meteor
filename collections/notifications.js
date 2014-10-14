Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	insert: function() {
		return true;
	}
});

var createNotificationMessage = function(status) {
	if (status == 'cooking') {
		return 'Your order is being cooked now';
	} else if (status == 'reject') {
		return 'Your order is rejected, please consult nearby waitress for more info';
	} else if (status == 'served') {
		return 'Your order will be served in a moment, Enjoy!';
	}
}

createOrderNotification = function(order, status) {
	var orderList = OrderLists.findOne(order.orderListId);
	Notifications.insert({
		orderListId: order.orderListId,
		orderId: order._id,
		message: createNotificationMessage(status),
		read: false,
		submitted: Date.now()
	});
}