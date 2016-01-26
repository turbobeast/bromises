var bromise = function (funk) {

  var bro = {},
  resolutions = [],
  rejections = [],
  alls = [],
  args = null,
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
    setTimeout(callAlways, 0);
  }

  function rejects () {
    while(rejections.length > 0) {
      rejections.shift().apply(null, args);
    }
    rejected = true;
    setTimeout(callAlways, 0);
  }

  function checkTriggers () {
    setTimeout(function () {
      if(rejected) { rejects(); }
      if(resolved) { resolves(); }
    }, 0);
  }

  bro.dude = function (onResolve, onReject) {
      var lilBro = bromise();
      pushFunction(function () {
          var resolvedVal = onResolve.apply(bro, Array.prototype.slice.call(arguments));
          if(resolvedVal) {
              // kinda duck typing
              if(typeof resolvedVal.noice === 'function') {
                  resolvedVal.noice(function () {
                      lilBro.bigup.apply(lilBro, Array.prototype.slice.call(arguments));
                  });
              } else {
                  lilBro.bigup(resolvedVal);
              }
          }
      }, resolutions);

      pushFunction(onReject, rejections);
      checkTriggers();

      return lilBro;
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
      if(!args) {
        args = Array.prototype.slice.call(arguments);
      }
      setTimeout(resolves, 0);
    }
  };

  bro.cockblock = function () {
    if(!resolved) {
      if(!args) {
        args = Array.prototype.slice.call(arguments);
      }
      setTimeout(rejects, 0);
    }
  };

  if(typeof funk === 'function') {
      funk.apply(bro, [bro.bigup, bro.cockblock]);
  }
  return bro;
};

module.exports = bromise;
