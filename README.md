## Bromises

[![Build Status](https://travis-ci.org/turbobeast/bromises.svg)](https://travis-ci.org/turbobeast/bromises)

Like Promises... but douchier.

```javascript
var bromise = require('bromise');

var bro = bromise();

bro.dude(function (val) {
    val; // french fries
    return bromise(function (bigup) {
        bigup('count chocula');
    });
})
.dude(function(val) {
    val; // count chocula
    return bromise(function(bigup) {
        bigup('milkshake');
    });
})
.dude(function (val) {
    val; // milkshake
});

bro.bigup('french fries');

```

## Legend

```javascript
.dude() //then()
.notcool() //catch()
.noice() //success()
.whatevs() //always()
.bigup() //resolve()
.cockblock() //reject()
```
