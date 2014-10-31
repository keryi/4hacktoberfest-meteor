OrderLists = new Meteor.Collection('order_lists');

OrderLists.allow({
	insert: function(userId, orderList) {
		return true;
	}
});

OrderLists.before.insert(function(userId, orderList) {
	orderList.submitted = Date.now();
});