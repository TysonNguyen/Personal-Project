$(main);

function main() {
  $("#btn_Add").click(() => {
    AddToDo($("#txtBox_Input").val());
    $("#txtBox_Input").val("");
  });
}

function AddToDo(name, time) {
  divElement = document.createElement("div");
  $(divElement).html(name);
  $(divElement).addClass("toDo");
  $(divElement).dblclick(DeleteFunc);
  $(divElement).click(CheckFunc);
  $("#div_Display").append(divElement);
}

function CheckFunc() {
  console.log($(this).html());
  $(this).css("background-color","green");
  console.log("Single Clicked");
}
function DeleteFunc() {
  $(this).remove();
  console.log("Double clicked");
}
