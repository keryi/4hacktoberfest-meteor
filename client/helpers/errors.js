Errors = new Meteor.Collection(null);

throwError = function(message) {
	Errors.insert({ message: message, seen: false });
}

clearError = function() {
	Errors.remove({ seen: true });
}