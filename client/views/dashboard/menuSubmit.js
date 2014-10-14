Template.menuSubmit.events({
	'submit form': function(e, t) {
		e.preventDefault();

		var menuName = $(e.target).find('[name=menu_name]').val();
		var menuPrice = parseFloat($(e.target).find('[name=menu_price]').val()).toFixed(2);

		Menus.insert({
			name: menuName,
			price: menuPrice,
			submitted: Date.now()
		});

		Router.go('dashboardMenus');
	}
});