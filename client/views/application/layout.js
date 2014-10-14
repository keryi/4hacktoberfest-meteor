Template.dashboardLayout.events({
	'click #signout': function() {
		Meteor.logout();
	}
});