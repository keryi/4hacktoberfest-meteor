Template.orderSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var order = {
			menuId: $(e.target).find('[name=menu_id]').val(),
			orderListId: Session.get('orderlist_id'),
			quantity: parseInt($(e.target).find('[name=order_quantity]').val())
		}

		var existing_order = Orders.findOne({
			menuId: order.menuId,
			orderListId: order.orderListId
		});

		if (existing_order != null) {
			Orders.update({ _id: existing_order._id }, { $inc: { quantity: order.quantity } });
		} else {
			order._id = Orders.insert(order);
		}

		Router.go('orderLists', { _id: order.orderListId });
	}
});