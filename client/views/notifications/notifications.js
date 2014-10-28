Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({ read: false }, { sort: { submitted: 'desc' } });
	},

	notificationCount: function() {
		return Notifications.find({ read: false }).count();
	}
});

Template.notification.events({
	'close.bs.alert .alert': function(e) {
		e.preventDefault();
		var notifId = $(e.target).attr('data-id');
		Notifications.update({ _id: notifId }, { $set: { read: true } });
	}
});