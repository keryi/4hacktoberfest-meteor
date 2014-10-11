Template.dashboardIndex.events({
	'click #signout': function() {
		Meteor.logout();
	}
});