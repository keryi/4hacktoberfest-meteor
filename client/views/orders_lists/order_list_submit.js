Template.orderListSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var now = new Date().getTime();
		var orderList = {
			paid: false,
			submitted: now - 3 * 3600 * 1000
		}

		orderListId = OrderLists.insert(orderList);
		Session.set('orderlist_id', orderListId);
		Router.go('orderLists', { _id: orderListId });
	}
})