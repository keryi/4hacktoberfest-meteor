Template.signinForm.events({
	'submit #signinForm': function(e, t) {
		e.preventDefault();

		var username = t.find('#signinUsername').value
		var password = t.find('#signinPassword').value

		Meteor.loginWithPassword(username, password, function(error) {
			if (error) {
				throwError(error.reason);
			}
		});
	},

	'click #signup': function() {
		Session.set('accountFormView', 'signupForm');
	}
});

Template.signupForm.events({
	'submit #signupForm': function(e, t) {
		e.preventDefault();

		var username = t.find('#signupUsername').value
		var password = t.find('#signupPassword').value
		var passwordConfirmation = t.find('#signupPasswordConfirmation').value

		Accounts.createUser({
			username: username,
			password: password
		}, function(error) {
			if (error) {
				throwError(error.reason);
			}
		});
	},

	'click #signin': function() {
		Session.set('accountFormView', null);
	}
})

Template.accountForms.helpers({
	signinFormView: function() {
		if (!Session.get('accountFormView'))
			return true;
	},

	signupFormView: function() {
		return Session.equals('accountFormView', 'signupForm');
	}
});