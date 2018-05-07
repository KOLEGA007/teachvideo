var ANIMATION_RATE = 10;

function smoothDelete (params) {
  if(params.target == undefined) {
    throw "no target specified";
  }
  var time = params.time != undefined ? params.time : 300;
  var old_height = params.target.offsetHeight;
  var step = ANIMATION_RATE*old_height/time;
  params.target.style.overflow = "hidden";
  setInterval(function(){
      var newHeight = params.target.offsetHeight - step;
      if(newHeight <= 0) {
          params.target.remove();
      }
      else {
          params.target.style.height = parseInt(newHeight) + "px";
      }
  },  ANIMATION_RATE);
}
