Template.menusList.helpers({
	menus: function() {
		return Menus.find();
	}
});

Template.menusList.events({
	'click .order': function(e) {
		e.preventDefault();

		var menuId = $(e.target).attr('data-id');
		Session.set('selectedMenuId', menuId);
		$('#submit-order-modal').modal('show');
	}
});

Template.submitOrderForm.helpers({
	menu: function() {
		var menuId = Session.get('selectedMenuId');
		var menu = Menus.findOne({ _id: menuId });
		return menu;
	}
});

Template.submitOrderForm.events({
	'click #order-confirm-button': function(e) {
		e.preventDefault();

		var order = {
			menuId: $('#menu_id').val(),
			orderListId: amplify.store('hacktoberfest.orderlist_id'),
			quantity: parseInt($('#order_quantity').val()),
			status: 'processing',
		}

		Meteor.call('order', order, function(error, id) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				Router.go('orderLists', { _id: order.orderListId });
			}
		});

		$('#submit-order-modal').modal('hide');
	}
});