Template.orderLists.helpers({
	orders: function() {
		return Orders.find({ orderListId: this._id });
	},

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
	},

	orderStatusClass: function() {
		switch (this.status) {
			case 'processing':
			return 'info';
			case 'cooking':
			return 'warning';
			case 'served':
			return 'success';
			case 'reject':
			return 'danger';
		}
	}
});

Template.orderLists.events({
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