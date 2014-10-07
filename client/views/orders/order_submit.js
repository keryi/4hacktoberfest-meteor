Template.orderSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var order = {
			menuId: $(e.target).find('[name=menu_id]').val(),
			quantity: $(e.target).find('[name=order_quantity]').val()
		}

		order._id = Orders.insert(order);
		Router.go('menusList', order);
	}
})