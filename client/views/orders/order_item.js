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