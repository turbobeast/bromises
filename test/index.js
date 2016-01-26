var bromise = require('../index.js');
var test = require('tape');


test('bromise has a dude function', function (t) {
    t.plan(1);
    var b = bromise();
    t.equal(typeof b.dude, 'function');
});

test('dude returns a new bromise', function (t) {
    t.plan(1);
    var newB = bromise().dude();
    t.equal(typeof newB.dude, 'function');
});

test('resolved value cannot be changed', function (t) {
    t.plan(2);
    var b = bromise(function(bigup) {
        bigup('pizza');
    });

    b.dude(function(val) {
        t.equal('pizza', val);
    });

    b.bigup('falafel');
    b.noice(function(val) {
        t.equal(val, 'pizza');
    });
});


test('dude return values passed to new dude', function (t) {

    t.plan(2);
    var b = bromise();

    b.dude(function (val) {
        t.equal(val, 'chicken wings');
        return 'ice cream';
    })
    .dude(function(val) {
        t.equal(val, 'ice cream');
    });

    b.bigup('chicken wings');
});

test('can chain bromises with dude', function (t) {
    t.plan(3);
    var b = bromise();

    b.dude(function (val) {
        t.equal(val, 'french fries');
        return bromise(function (bigup) {
            bigup('count chocula');
        });
    })
    .dude(function(val) {
        t.equal(val, 'count chocula');
        return bromise(function(bigup) {
            bigup('milkshake');
        });
    })
    .dude(function (val) {
        t.equal(val, 'milkshake');
    });

    b.bigup('french fries');
});
