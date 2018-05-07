var Timer = function() {
  var target = undefined;
  var list = undefined;
  var counter = 0;
  var timeline = new Timeline;
  function main_loop() {
      if(target == undefined || target.paused == undefined || target.paused)
        return;
      timeline.sync(parseInt(target.currentTime));
    }

  return {
      connect: function(ptarget) {
        target = ptarget;
        setInterval(main_loop, 100);
      },
      setList : function(plist) {
        timeline.setList(plist);
      },
      getList : function() {
        return timeline.getList();
      },
      getTarget : function() {
        return target;
      },
      setItems : function(pitems) {
        if(pitems.length > 0) {
          timeline.setItems(pitems);
        }
      },
      loadItems : function(url) {
        timeline.loadItems(url);
      },
      loadItemsFromText : function(url) {
        timeline.loadItemsFromText(url)
      },
      loadVideo : function(url) {
        target.src = url;
      },
      loadData(video_url, notes_url) {
        timeline.loadItems(notes_url);
        target.src = video_url;
      }
  };
}
