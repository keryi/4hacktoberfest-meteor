var assert = require('assert');

suite('Orders', function() {
	test('in the server', function(done, server) {
		server.eval(function() {
			Orders.insert({
				menuId: 1,
				orderListId: 1,
				quantity: 1
			});
			var orders = Orders.find().fetch();
			emit('orders', orders);
		});

		server.once('orders', function(orders) {
			// Why 4? because fixtures are included
			assert.equal(orders.length, 4);
			done();
		});
	});
});