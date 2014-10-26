Tinytest.add('Errors collection works', function(test) {
	test.equal(Errors.collection.find().count(), 0);

	Errors.throw('A new error!');
	test.equal(Errors.collection.find().count(), 1);

	Errors.collection.remove({});
});