Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({ read: false }, { sort: { submitted: 'desc' } });
	},

	notificationCount: function() {
		return Notifications.find({ read: false }).count();
	}
});

Template.notifications.events({
	'click #notification-toggle': function() {
		Notifications.update({ read: false }, { $set: { read: true } });
	}
})