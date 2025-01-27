function singleEvent(name, start, end) {
  (this.eventName = name), (this.timeStart = start), (this.timeEnd = end);
}

let listEvent = [];
var currentTime
$(main);

function main() {
  console.log(listEvent);

  currentTime = new Date();
  $("input[type=time]").val(currentTime.toString().substring(16, 21)); 

  $("#btn_Add").click(AddToList);
}

function CheckFunc() {
  $(this).parent().css("background-color", "green");
  console.log("Single Clicked");
}
function DeleteFunc() {
  $(this).parent().remove();
  console.log("Double clicked");
}

function AddToList() {

  if($(`#txtBox_Input`).val().trim() == '')
  {
    Reset();
    alert(`put some thing in the event box`);
    return;
  }
  if(($("#time_In").val().substring(0,2) > $(`#time_Out`).val().substring(0,2))||
      ($("#time_In").val().substring(3) > $(`#time_Out`).val().substring(3)))
  {
    Reset();
    alert(`Time is not correct`)
    return;
  }
  
  let eventToAdd = new singleEvent($("#txtBox_Input").val(),$(`#time_In`).val(), $(`#time_Out`).val());
  //listEvent.push();

  let divElement = document.createElement("div");
  let pElement = document.createElement("p");

  let button1Element = document.createElement("button");
  let button2Element = document.createElement("button");;
  
  $(pElement).html(eventToAdd.eventName + ": Start : " + eventToAdd.timeStart + " - " + eventToAdd.timeEnd);

  $(button1Element).html(`Finish`);
  $(button1Element).click(CheckFunc);

  $(button2Element).html(`Delete`);
  $(button2Element).click(DeleteFunc);
  
  divElement.append(pElement,button1Element,button2Element);
  $("#div_Display").append(divElement);

  Reset();
}

function Reset(){
  currentTime = new Date();
  $(`#txtBox_Input`).val('');
  $("input[type=time]").val(currentTime.toString().substring(16, 21));
}
