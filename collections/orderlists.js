OrderLists = new Meteor.Collection('order_lists');

OrderLists.allow({
	insert: function(userId, orderList) {
		return true;
	}
});