var pin_target = document.querySelector(".pinned_notes");

function createPlaceholder(element) {
  var placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  if(element.dataset.id == undefined)
    throw "No ID, cant create placeholder properly";
  placeholder.id = "placeholder" + element.dataset.id;
  element.parentElement.insertBefore(placeholder, element);
}

function pin(element) {
  if(!element.classList.contains("pinned"))
  {
    createPlaceholder(element);
    element.parentElement.removeChild(element);
    pin_target.appendChild(element);
    element.classList.add("pinned")
  } else {
    element.classList.remove("pinned");
    if(element.dataset.id == undefined)
      throw "No id for element item";
    var placeholder = document.querySelector("#placeholder" + element.dataset.id);
    placeholder.parentElement.insertBefore(element, placeholder);
    placeholder.remove();
  }
}

function secsToTime(seconds) {
  var date = new Date(parseInt(seconds)*1000);
  var time_string = date.toUTCString().split(" ")[4];
  var hours = parseInt(time_string.split(":"));
  if(hours == 0) {
    return time_string.substring(3);
  }
  return time_string;
}


function buildNote(options) {
  var id = options.id;
  var time = options.time;
  if(time == undefined || id == undefined)
    throw "Time and ID have to be defined";
  var title = options.title != undefined ? options.title : "";
  var text = options.text != undefined ? options.text : "";
  var icon = options.icon != undefined ? options.icon : undefined;
  var target = options.target != undefined ? options.target : undefined;
  var image = options.image != undefined ? options.image : undefined;
  var div_note = document.createElement("div");
  div_note.classList.add("note")
  div_note.title = secsToTime(time) + " - " + title
  div_note.dataset.id = id;
  var div_controls = document.createElement("div");
  div_controls.classList.add("controls");
  div_controls.innerHTML = '<a class="item close"><i class="fas fa-times"></i></a>'+
              '<a class="item pin"><i class="fas fa-thumbtack toggable"></i></a>';
  var div_header = document.createElement("div");
  div_header.classList.add("note-header");
  if(image != undefined)  {
    div_header.classList.add("note-image");
    div_header.style.backgroundImage = "url(" + image + ")";
  }
  else if(icon != undefined) {
    div_header.classList.add("note-icon");
    div_header.innerHTML = '<i class="fas fa-'+icon+'"></i>'
  }
  else {
    div_header.innerHTML = secsToTime(time);
  }
  var div_body = document.createElement("div");
  div_body.classList.add("note-body");
  var div_heading = document.createElement("div");
  div_heading.classList.add("note-heading");
  div_heading.innerHTML = title;
  if(target != undefined) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = target;
    div_heading.innerHTML+=' <i class="fa fa-external-link-alt link"></i>';
    a.appendChild(div_heading)
    div_body.appendChild(a);
  }
  else {
    div_body.appendChild(div_heading);
  }
  var div_text = document.createElement("div");
  div_text.classList.add("note-text");
  div_text.innerHTML = text;
  div_body.appendChild(div_text);
  div_note.appendChild(div_controls);
  div_note.appendChild(div_header);
  div_note.appendChild(div_body);
  div_note.querySelector(".close").onclick = function(e) {
      e.preventDefault();
      var options = {target:this.parentElement.parentElement};
      smoothDelete(options);
  }
  div_note.querySelector(".pin").onclick = function(e) {
    e.preventDefault();
    pin(this.parentElement.parentElement);
  }
  return div_note;
}
