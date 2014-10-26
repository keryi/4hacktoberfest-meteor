Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		Meteor.subscribe('menus')
	}
});

Router.map(function() {
	this.route('landingIndex', {
		path: '/',
		layoutTemplate: 'landingLayout'
	});
	
	this.route('menusList', { 
		path: '/menus'
	});

	this.route('menuPage', {
		path: '/menus/:_id',
		data: function() { return Menus.findOne(this.params._id); }
	});

	this.route('orderListSubmit', {
		path: '/orderlists/submit'
	});

	this.route('orderLists', {
		path: '/orderlists/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('orders', this.params._id),
				Meteor.subscribe('orderList', this.params._id),
				Meteor.subscribe('notifications', this.params._id)
			];
		},
		data: function() { return OrderLists.findOne(this.params._id); }
	});

	this.route('dashboardIndex', {
		path: '/dashboard',
		layoutTemplate: 'dashboardLayout',
		waitOn: function() {
			return [
				Meteor.subscribe('allOrders'),
				Meteor.subscribe('menus')
			];
		}
	});

	this.route('dashboardMenus', {
		path: '/dashboard/menus',
		layoutTemplate: 'dashboardLayout',
		waitOn: function() {
			return Meteor.subscribe('menus')
		}
	});

	this.route('menuSubmit', {
		path: '/dashboard/menu/submit',
		layoutTemplate: 'dashboardLayout'
	});
});

Router.onBeforeAction(function() {
	Errors.clearSeen();
});
