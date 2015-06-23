define( ["three"], function ( THREE ) {

  var time = {
    scale: 1000,
    start: new Date(),
    now: function() { return (new Date() - time.start) / time.scale; }
  };

  return time;

});
