function checkUsername(username) {
	if (username.length < 6) {
		Errors.throw("Username is too short, must be at least 6 characters");
		return false;
	}
	return true;
}

function checkPassword(password, passwordConfirmation) {
	if (password.length < 8) {
		Errors.throw("Password is too short, must be at least 8 characters");
		return false;
	}

	if (passwordConfirmation != password) {
		Errors.throw("Password and password confirmation is not the same");
		return false;
	}
	return true;
}

Template.signinForm.events({
	'submit #signinForm': function(e, t) {
		e.preventDefault();

		clearError();
		
		var username = t.find('#signinUsername').value
		var password = t.find('#signinPassword').value

		Meteor.loginWithPassword(username, password, function(error) {
			if (error) {
				Errors.throw(error.reason);
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

		clearError();

		var username = t.find('#signupUsername').value
		var password = t.find('#signupPassword').value
		var passwordConfirmation = t.find('#signupPasswordConfirmation').value

		var isValidUsername = checkUsername(username);
		var isValidPassword = checkPassword(password, passwordConfirmation);

		if (isValidUsername && isValidPassword) {
			Accounts.createUser({
				username: username,
				password: password
			}, function(error) {
				if (error) {
					Errors.throw(error.reason);
				}
			});
		}
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