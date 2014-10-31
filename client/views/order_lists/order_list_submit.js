Template.orderListSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var orderList = {
			paid: false
		}

		var orderListId = OrderLists.insert(orderList);
		amplify.store('hacktoberfest.orderlist_id', orderListId);
		Router.go('orderLists', { _id: orderListId });
	}
})