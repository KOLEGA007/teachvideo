var data;
var xhrg;
var Timeline = function () {
  var items = [];
  var alarm_timer = undefined;
  var list = undefined;
  var counter = 0;
  function next()  {
    var note = items.shift();
    note.id = counter++;
    if(items.length > 0) {
      alarm_timer = items[0].time;
    }
    else {
      alarm_timer = undefined;
    }
    if(list == undefined)
      throw "No list assigned";

    list.prepend(buildNote(note));
  }
  function _loadItems(pitems) {
    items = pitems;
    if(items.length >= 1) {
      alarm_timer = items[0].time;
    }
  }
  return {
    setList : function(plist) {
      list = plist;
    },
    getList : function() {
      return list;
    },
    loadItems : function(url) {
      var xhr = new XMLHttpRequest();
      xhr.onload =  function(event){
        if(xhr.status != 200) {
          throw "Data wasn't loaded from unexpected source reason\ncode: "+xhr.status+"url: "+url;
        }
        try {
          data = JSON.parse(xhr.response)
        } catch (e) {
          throw "Misformated JSON source data - data: " + xhr.response + "e:" + e;
        }
        _loadItems(data);
      };
      xhr.open("GET", url);
      xhr.send();
    },
    loadItemsFromText : function(data) {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw "Misformated JSON source data";
      }
      _loadItems(data);
    },
    setItems : function(pitems) {
      _loadItems(pitems);
    },
    sync : function(time) {
        while(alarm_timer != undefined && alarm_timer <= time)
        {
          next();
        }
    },
    debug : function() {
      return {
        items : items,
        alarm : alarm_timer,
        target : list
      };
    }
  };
}
