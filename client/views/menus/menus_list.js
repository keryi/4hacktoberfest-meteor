Template.menusList.helpers({
	menus: function() {
		return Menus.find();
	},

	orders: function() {
		return Orders.find();
	}
});