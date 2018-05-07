var timer = new Timer;
timer.setList(document.querySelector(".notes"));
timer.connect(document.querySelector("video"));
var file_reader = new FileReader;
file_reader.onload = function() {
  try {
    timer.loadItemsFromText(file_reader.result);
    document.querySelector(".dialog").style.display = "none";
  } catch (e) {
    document.querySelector(".error").innerText = e;
    document.querySelector(".error").style.visibility = "visible";

  }
}

document.querySelector("#remove_file").onclick = function() {
  document.querySelector("#json_file").value = "";
}

document.querySelector(".button").onclick = function() {
  try {
    timer.loadVideo(document.querySelector("#video_url").value);
    if(document.querySelector("#json_file").files.length == 0) {
      timer.loadItemsFromText(document.querySelector("#json_data").value);
      document.querySelector(".dialog").style.display = "none";
    }
    else {
      file_reader.readAsText(document.querySelector("#json_file").files[0])
    }
  } catch (e) {
    document.querySelector(".error").innerText = e;
    document.querySelector(".error").style.visibility = "visible";
  } finally {

  }

};
