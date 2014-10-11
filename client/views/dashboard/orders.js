Template.dashboardOrders.helpers({
	orders: function() {
		return Orders.find({ status: 'processing' });
	},

	menuName: function(menuId) {
		return Menus.findOne(menuId).name;
	}
});