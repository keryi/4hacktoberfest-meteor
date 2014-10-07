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
});
