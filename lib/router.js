Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('landingIndex', { path: '/' });
	this.route('menusList', { path: '/menus' });
});
