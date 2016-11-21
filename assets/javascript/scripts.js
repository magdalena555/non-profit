$(function() {

  new WOW().init();

	(function (Vivus) {
  var lastStart = 0;
  var interval  = 200; // Interval between starts
  Vivus.prototype.play_legacy = Vivus.prototype.play;
  Vivus.prototype.play = function () {
    // Your trigger logic
    var now = +(new Date());
    var timeToNextStart = Math.max(lastStart + interval - now, 0);
    setTimeout(function () {
      this.play_legacy();
    }.bind(this), timeToNextStart);
    lastStart = now + timeToNextStart;
  };
})(Vivus);

	var animate = function (svgList, index) {
 if (index >= svgList.length) {
   return;
 }
 return new Vivus(svgList[index], {
     duration: 200,
     onReady: function () {
       console.log(index + ' loaded');
       animate(svgList, index + 1);
     } 
 });
}

animate($(".svg"), 0);

});