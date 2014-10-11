Template.dashboardOrders.helpers({
	orders: function() {
		return Orders.find({ status: { $in: ['processing', 'cooking'] } });
	},

	menuName: function(menuId) {
		return Menus.findOne(menuId).name;
	},

	disable: function(orderId, btnClass) {
		if (Orders.findOne(orderId).status == 'cooking') {
			if (btnClass == 'cook') {
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
	},

	'click #reject': function(e) {
		e.preventDefault();

		if (confirm('Reject this order?')) {
			Orders.update(this._id, { $set: { status: 'reject' } });
		}
	},

	'click #serve': function(e) {
		e.preventDefault();

		Orders.update(this._id, { $set: { status: 'served' } });
	}
});