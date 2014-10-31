Menus = new Meteor.Collection('menus');

Menus.allow({
	insert: function(userId, menu) {
		return Meteor.user() != null;
	}
});

Menus.before.insert(function(userId, menu) {
	menu.submitted = Date.now();
});