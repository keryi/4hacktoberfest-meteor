Template.orderEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var orderProperties = {
			quantity: parseInt($(e.target).find('[name=order_quantity]').val())
		}

		Orders.update({ _id: this._id }, { $set: orderProperties });

		Router.go('orderLists', { _id: this.orderListId });
	}
});

Template.orderEdit.helpers({
	menuItem: function() {
		return Menus.findOne({ _id: this.menuId });
	}
});