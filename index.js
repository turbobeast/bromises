var bromise = function (funk) {

  var bro = {},
  resolutions = [],
  rejections = [],
  alls = [],
  args = [],
  resolved = false,
  rejected = false;

  function pushFunction (func, ray) {
    if(typeof func === 'function') {
      ray.push(func);
    }
  }

  function callAlways() {
    while(alls.length > 0) {
      alls.shift().apply(null, args);
    }
  };

  function resolves () {
    while(resolutions.length > 0) {
      resolutions.shift().apply(null, args);
    }
    resolved = true;
    callAlways();
  }

  function rejects () {
    while(rejections.length > 0) {
      rejections.shift().apply(null, args);
    }
    rejected = true;
    callAlways();
  }

  function checkTriggers () {
    setTimeout(function () {
      if(rejected) { rejects(); }
      if(resolved) { resolves(); }
    },1);
  }

  bro.dude = function (onResolve, onReject) {
    pushFunction(onResolve, resolutions);
    pushFunction(onReject, rejections);
    checkTriggers();
    return this;
  };

  bro.noice = function (onResolve) {
    pushFunction(onResolve, resolutions);
    checkTriggers();
    return this;
  };

  bro.notcool = function (onReject) {
    pushFunction(onReject, rejections);
    checkTriggers();
    return this;
  };

  bro.whatevs = function (onWhatever) {
    pushFunction(onWhatever, alls);
    checkTriggers();
    return this;
  };

  bro.bigup = function () {
    if(!rejected) {
      args = Array.prototype.slice.call(arguments);
      resolves();
    }
  };

  bro.cockblock = function () {
    if(!resolved) {
      args = Array.prototype.slice.call(arguments);
      rejects();
    }
  };

  funk.apply(this, [bro.bigup, bro.cockblock]);
  return bro;
};

module.exports = bromise;
