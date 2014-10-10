Orders = new Meteor.Collection('orders');

Orders.allow({
	insert: function(userId, order) {
		return order.quantity > 0;
	},

	update: function(userId, order, fieldNames, modifier) {
		return (order.status == 'processing' && order.quantity > 0);
	},

	remove: function(userId, order) {
		return order.status == 'processing';
	}
});

Meteor.methods({
	order: function(orderAttributes) {
		if (orderAttributes.quantity <= 0) {
			throw new Meteor.Error(422, 'Please specify a valid quantity');
		}

		var existing_order = Orders.findOne({
			menuId: orderAttributes.menuId,
			orderListId: orderAttributes.orderListId
		});

		if (existing_order) {
			Orders.update(
				{ _id: existing_order._id },
				{ $inc: { quantity: orderAttributes.quantity } }, function(error) {
					throw error;
				});
		} else {
			orderAttributes._id = Orders.insert(orderAttributes);
		}

		return orderAttributes._id;
	}
});