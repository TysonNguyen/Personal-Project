window.onload = function () {
  const Labels = document.querySelectorAll(".myButton");
  for (var i = 0; i < Labels.length; i++) {
    Labels[i].addEventListener("mouseenter", Enter);
    Labels[i].addEventListener("mouseleave", Whiten);
  }

  const Buttons = document.querySelectorAll("#myButton");
  for (var j = 0; j < Buttons.length; j++) {
    Buttons[j].addEventListener("mouseenter", Clicked);
  }

  document.querySelector("#rightClick").addEventListener("click",AlohaClick)
};

function Clicked(e) {
  this.innerHTML = this.value;
}
function Whiten() {
  document.body.style.backgroundColor = "white";
}
function Enter() {
  document.body.style.backgroundColor = this.style.backgroundColor;
}




function ReturnNum(iX) {
  
  if(iX < 1)
  return 0;
  else return 1;
}

function AlohaClick(e){
  console.log(e.which);
}