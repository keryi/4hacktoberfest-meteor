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
	'click .delete-order': function(e) {
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
	},

	'click .edit-order': function(e) {
		e.preventDefault();

		var orderId = $(e.target).attr('data-id');
		Session.set('selectedOrderId', orderId);
		$('#edit-order-modal').modal('show');
	}
});

Template.editOrderForm.helpers({
	order: function() {
		var orderId = Session.get('selectedOrderId');
		return Orders.findOne({ _id: orderId });
	},

	menu: function() {
		var orderId = Session.get('selectedOrderId');
		var order = Orders.findOne({ _id: orderId });
		return Menus.findOne({ _id: order.menuId });
	}
});

Template.editOrderForm.events({
	'click #edit-order-confirm-button': function(e) {
		e.preventDefault();

		var orderProperties = {
			quantity: parseInt($('#edit_order_quantity').val())
		}

		var orderId = $('#edit_order_id').val();

		if (orderProperties.quantity <= 0) {
			var error = new Meteor.Error(422, 'Please specify a valid quantity');
			Errors.throw(error.reason);
		} else {
			Orders.update({ _id: orderId }, { $set: orderProperties }, function(error) {
				if (error) {
					Errors.throw(error.reason);
				} else {
					Router.go('orderLists', { _id: currentOrderListId });
				}
			});
		}

		$('#edit-order-modal').modal('hide');
	}
});