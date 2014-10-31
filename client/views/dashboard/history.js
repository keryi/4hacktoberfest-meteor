Template.dashboardHistory.helpers({
	orders: function() {
		return Orders.find({ status: { $in: ['served'] } });
	},
	
	menuName: function(menuId) {
		return Menus.findOne(menuId).name;
	}
});