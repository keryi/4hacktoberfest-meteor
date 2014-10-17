Template.dashboardOrders.helpers({
	orders: function() {
		return Orders.find({ status: { $in: ['processing', 'cooking'] } });
	},

	menuName: function(menuId) {
		return Menus.findOne(menuId).name;
	},

	disable: function(orderId, btnClass) {
		var status = Orders.findOne(orderId).status;
		if (status == 'cooking') {
			if (btnClass == 'cook' || btnClass == 'reject') {
				return 'disabled';
			}

			if (btnClass == 'serve') {
				return 'enabled';
			}
		} else {
			if (btnClass == 'serve') {
				return 'disabled';
			}
		}
	}
});

Template.dashboardOrders.events({
	'click #cook': function(e) {
		e.preventDefault();
		Orders.update(this._id, { $set: { status: 'cooking' } });
		createOrderNotification(this, 'cooking');
	},

	'click #reject': function(e) {
		e.preventDefault();

		if (confirm('Reject this order?')) {
			Orders.update(this._id, { $set: { status: 'reject' } });
			createOrderNotification(this, 'reject');
		}
	},

	'click #serve': function(e) {
		e.preventDefault();

		Orders.update(this._id, { $set: { status: 'served' } });
		createOrderNotification(this, 'served');
	}
});