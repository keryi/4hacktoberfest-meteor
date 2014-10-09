var assert = require('assert');

suite('Orders', function() {
	test('in the server', function(done, server) {
		server.eval(function() {
			Orders.insert({
				menuId: 1,
				orderListId: 1,
				quantity: 1,
				status: 'processing'
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
				added: onAdded
			});

			function onAdded(order) {
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
				quantity: 3,
				status: 'processing'
			});
		});
	});

	test('Allow to update order if its status is processing', function(done, server, client) {
		server.eval(function() {
			Orders.find().observe({
				changed: onChanged,
				added: onAdded
			});

			function onChanged(newOrder, oldOrder) {
				emit('change', newOrder, oldOrder);
			}

			function onAdded(order) {
				emit('add', order);
			}

			emit('return');
		});

		server.once('change', function(newOrder, oldOrder) {
			assert.equal(newOrder.quantity, 10);
			done();
		});

		server.once('add', function(order) {
			server.eval(function(order) {
				Orders.update({ _id: order._id }, { $set: { quantity: 10 } });
			}, order);
		});
	});

	test('Deny to update order if its status is not processing', function(done, server, client) {
		server.eval(function() {
			Orders.find().observe({
				changed: onChanged,
				added: onAdded
			});

			function onChanged(newOrder, oldOrder) {
				emit('change', newOrder, oldOrder);
			}

			function onAdded(order) {
				emit('add', order);
			}

			emit('return');
		});

		server.once('change', function(newOrder, oldOrder) {
			assert.equal(oldOrder.quantity, 2);
			done();
		});

		server.once('add', function(order) {
			server.eval(function(order) {
				Orders.update({ _id: order._id }, { $set: { quantity: 5 } });
			}, order);
		});
	});

	test('Add order with invalid quantity throw error', function(done, server) {
		server.eval(function() {
			var orderAttributes = {
					menuId: 1,
					orderListId: 1,
					quantity: 0,
					status: 'processing'
			};

			Meteor.call('order', orderAttributes, function(error, id) {
				var ret = { error: error, id: id };
				emit('return', ret);
			});

		}).once('return', function(ret) {
			assert.ok(ret.error.reason.match(/Please specify a valid quantity/));
			done();
		});
	});

	test('Update order with invalid quantity throw error', function(done, server, client) {
		server.eval(function() {
			Orders.find().observe({
				changed: onChanged,
				added: onAdded
			});

			function onChanged(newOrder, oldOrder) {
				emit('change', newOrder, oldOrder);
			}

			function onAdded(order) {
				emit('add', order);
			}
			emit('return');
		});

		server.once('change', function(newOrder, oldOrder) {
			assert.equal(oldOrder.quantity, 2);
			done();
		});

		server.once('add', function(order) {
			server.eval(function(order) {
				Orders.update({ _id: order._id }, { $set: { quantity: 0 } });
			}, order);
		});
	});
});