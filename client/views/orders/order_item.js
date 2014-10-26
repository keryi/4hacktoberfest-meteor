Template.orderItem.helpers({
	menuItem: function() {
		return Menus.findOne({ _id: this.menuId });
	},

	subtotal: function() {
		var menuItem = Menus.findOne({ _id: this.menuId });
		if (menuItem != null) {
			return menuItem.price * this.quantity;
		} else {
			return 0.0;
		}
	},

	editable: function() {
		return this.status == 'processing';
	}
});

Template.orderItem.events({
	'click .delete': function(e) {
		e.preventDefault();

		if (confirm('Cancel this order?')) {
			var currentOrderId = this._id;
			var currentOrderListId = this.orderListId;
			Orders.remove(currentOrderId, function(error) {
				if (error) {
					Errors.throw(error.reason);
				}
			});
			Router.go('orderLists', { _id: currentOrderListId });
		}
	}
});