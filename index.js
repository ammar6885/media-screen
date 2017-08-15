(function (global, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define([], function () { return factory(); });
  } else if (typeof module !== 'undefined' && typeof exports === 'object') { // Node.js
    module.exports = factory();
  } else if (global !== undefined) { // Global variable
    global.MediaScreen = factory();
  }
})(this || window, function () {

  var events = [],
    currentEvent = {},
    looping = false,
    newMedia = { MediaScreen: MediaScreen },
    alwaysOption = { always: this.always };


  function getDimensions(elm) {
    if (elm === window) return { width: elm.innerWidth, height: elm.innerHeight };
    else return { width: elm.offsetWidth, height: elm.offsetHeight };
  }

  var triggers = {
    then: function (callback1, callback2) {
      [].forEach.call(currentEvent.elm, function (elm) {
        var dimensions = getDimensions(elm);

        events.push({
          condition: currentEvent.condition,
          elm: elm,
          limit: currentEvent.limit,
          low: currentEvent.low,
          high: currentEvent.high,
          once: currentEvent.once,
          elseOnce: currentEvent.elseOnce,
          callback: callback1,
          else: callback2,
          done: false,
          dimension: currentEvent.dimension || 'width',
          width: dimensions.width,
          height: dimensions.height
        });
      });

      currentEvent = {};
      return newMedia;
    }
  };

  var options = {
    gt: gt,
    lt: lt,
    in: inRange,
    out: out,
    landscape: landscape,
    portrait: portrait,
    always: always,
    width: width,
    height: height,
    both: both
  };

  var conditions = {
    gt: gt,
    lt: lt,
    in: inRange,
    out: out,
    landscape: landscape,
    portrait: portrait,
    always: always
  }

  function gt(limit, each, elseEach) {
    currentEvent.condition = 'gt';
    currentEvent.limit = limit;
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    return triggers;
  }

  function lt(limit, each, elseEach) {
    currentEvent.condition = 'lt';
    currentEvent.limit = limit;
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    return triggers;
  }

  function inRange(low, high, each, elseEach) {
    currentEvent.condition = 'in';
    currentEvent.low = low;
    currentEvent.high = high;
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    return triggers;
  }

  function out(low, high, each, elseEach) {
    currentEvent.condition = 'out';
    currentEvent.low = low;
    currentEvent.high = high;
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    return triggers;
  }

  function landscape(each, elseEach) {
    currentEvent.condition = 'landscape';
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    currentEvent.dimension = '_';
    return triggers;
  }

  function portrait(each, elseEach) {
    currentEvent.condition = 'portrait';
    currentEvent.once = !each;
    currentEvent.elseOnce = !elseEach;
    currentEvent.dimension = '_';
    return triggers;
  }

  function always() {
    currentEvent.dimension = currentEvent.dimension || 'both';
    currentEvent.condition = 'always';
    currentEvent.size = 'all';
    currentEvent.once = false;
    return triggers;
  }

  function width() {
    currentEvent.dimension = 'width';
    return conditions;
  }

  function height() {
    currentEvent.dimension = 'height';
    return conditions;
  }

  function both() {
    currentEvent.dimension = 'both';
    return alwaysOption;
  }

  var check = {
    gt: function (size, limit) { return size > limit },
    lt: function (size, limit) { return size < limit },
    in: function (size, n1, low, high) { return size > low && size < high },
    out: function (size, n1, low, high) { return size < low || size > high },
    landscape: function (w, n1, n2, n3, height) { return w > height },
    portrait: function (w, n1, n2, n3, height) { return w < height },
    always: function (size, n1, n2, n3, n4, prevSize) { return !size || size !== prevSize }
  }

  function checkEvent(event) {
    var dimensions = getDimensions(event.elm),
      condition = event.condition,
      dimension = event.dimension,
      widthChange = dimensions.width !== event.width,
      heightChange = dimensions.height !== event.height,
      size = dimension !== '_' ? dimensions[dimension] : dimensions.width;

    if (!widthChange && !heightChange || (dimension === 'width' && !widthChange) || (dimension === 'height' && !heightChange)) return;

    if (check[condition](size, event.limit, event.low, event.high, dimensions.height, event[dimension])) {
      if (event.once && !event.done) {
        event.callback.call(event.elm, dimensions);
        event.done = true;
      } else if (!event.once) event.callback.call(event.elm, dimensions);
    } else {
      if (event.else) {
        if (event.elseOnce && event.done) event.else.call(event.elm, dimensions);
        else if (!event.elseOnce) event.else.call(event.elm, dimensions);
      }
      event.done = false
    }

    event.width = dimensions.width;
    event.height = dimensions.height;

  }

  function MediaScreen(elm) {
    elm = !elm ? [window] : typeof elm === 'string' ? document.querySelectorAll(elm) : elm;
    currentEvent.elm = elm.length ? elm : [elm];
    if (!looping) requestAnimationFrame(loop);
    looping = true;
    return options;
  }

  function loopEvents() {
    for (var i = 0; i < events.length; i++) checkEvent(events[i]);
  }

  function loop() {
    requestAnimationFrame(loop);
    loopEvents();
  }

  return MediaScreen;
});