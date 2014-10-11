Menus = new Meteor.Collection('menus');

Menus.allow({
	insert: function(userId, menu) {
		return true;
	}
});