Orders = new Meteor.Collection('orders');

Orders.allow({
	update: function(userId, order, fieldNames) {
		return order.status == 'processing';
	},

	insert: function(userId, order) {
		return true;
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

		if (existing_order != null) {
			Orders.update(
				{ _id: existing_order._id },
				{ $inc: { quantity: orderAttributes.quantity } });
		} else {
			orderAttributes._id = Orders.insert(orderAttributes);
		}

		return orderAttributes._id;
	}
})