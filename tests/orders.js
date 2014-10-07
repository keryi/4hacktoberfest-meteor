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

	test('using both server and client', function(done, server, client) {
		server.eval(function() {
			Orders.find().observe({
				added: addedNewOrder
			});

			function addedNewOrder(order) {
				emit('order', order);
			}
		}).once('order', function(order) {
			// First order in fixtures, not the one created by client below
			assert.equal(order.quantity, 2);
			done();
		});

		client.eval(function() {
			Orders.insert({
				menuId: 1,
				orderListId: 1,
				quantity: 3
			});
		});
	});
});