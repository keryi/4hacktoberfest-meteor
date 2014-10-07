Template.orderLists.helpers({
	orders: function() {
		return Orders.find({ orderListId: this._id });
	}
});