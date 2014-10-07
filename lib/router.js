Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('landingIndex', { path: '/' });
	this.route('menusList', { path: '/menus' });
	this.route('menuPage', {
		path: '/menus/:_id',
		data: function() { return Menus.findOne(this.params._id); }
	});

	this.route('orderSubmit', {
		path: '/orders/:_id',
		data: function() { return Menus.findOne(this.params._id); }
	});

	this.route('orderEdit', {
		path: '/orders/:_id/edit',
		data: function() { return Orders.findOne(this.params._id); }
	})

	this.route('orderListSubmit', {
		path: '/orderlists/submit'
	});

	this.route('orderLists', {
		path: '/orderlists/:_id',
		data: function() { return OrderLists.findOne(this.params._id); }
	});
});
