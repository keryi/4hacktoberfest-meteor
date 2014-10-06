Meteor.publish('menus', function() {
	return Menus.find();
});