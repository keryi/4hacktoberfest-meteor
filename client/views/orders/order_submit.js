Template.orderSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var order = {
			menuId: $(e.target).find('[name=menu_id]').val(),
			orderListId: Session.get('orderlist_id'),
			quantity: parseInt($(e.target).find('[name=order_quantity]').val()),
			status: 'processing',
			submitted: Date.now()
		}

		Meteor.call('order', order, function(error, id) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('orderLists', { _id: order.orderListId });
			}
		});
	}
});