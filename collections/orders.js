Orders = new Meteor.Collection('orders');

Orders.allow({
	update: function(userId, order, fieldNames) {
		return order.status == 'processing';
	},

	insert: function(userId, order) {
		return true;
	}
});