Template.orderEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var orderProperties = {
			quantity: parseInt($(e.target).find('[name=order_quantity]').val())
		}

		var currentOrderId = this._id;
		var currentOrderListId = this.orderListId;

		if (orderProperties.quantity <= 0) {
			var error = new Meteor.Error(422, 'Please specify a valid quantity');
			Errors.throw(error.reason);
		} else {
			Orders.update({ _id: currentOrderId }, { $set: orderProperties }, function(error) {
				if (error) {
					Errors.throw(error.reason);
				} else {
					Router.go('orderLists', { _id: currentOrderListId });
				}
			});
		}
	}
});

Template.orderEdit.helpers({
	menuItem: function() {
		return Menus.findOne({ _id: this.menuId });
	}
});