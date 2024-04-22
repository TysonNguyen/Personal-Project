window.onload = function () {
  // const Labels = document.querySelectorAll(".myButton");
  // for (var i = 0; i < Labels.length; i++) {
  //   Labels[i].addEventListener("mouseenter", Enter);
  //   Labels[i].addEventListener("mouseleave", Whiten);
  // }
  // const Buttons = document.querySelectorAll("#myButton");
  // for (var j = 0; j < Buttons.length; j++) {
  //   Buttons[j].addEventListener("mouseenter", Clicked);
  // }
  // document.querySelector("#rightClick").addEventListener("click",AlohaClick)
  //Graph();
  $("#testJson").click(TestJson);
};

// function Clicked(e) {
//   this.innerHTML = this.value;
// }
// function Whiten() {
//   document.body.style.backgroundColor = "white";
// }
// function Enter() {
//   document.body.style.backgroundColor = this.style.backgroundColor;
// }
// function ReturnNum(iX) {

//   if(iX < 1)
//   return 0;
//   else return 1;
// }
// function AlohaClick(e){
//   console.log(e.which);
// }

// function Graph(){
//   var xValues = [50,60,70,80,90,100,110,120,130,140,150];
//   var yValues = [1,3,5,4,6,11,10,9,7,6,5];

//   new Chart("myChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       fill: false,
//       lineTension: 0,
//       backgroundColor: "rgba(0,0,255,1.0)",
//       borderColor: "rgba(0,0,255,0.1)",
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     scales: {
//       yAxes: [{ticks: {min: 1, max:11}}],
//     }
//   }
//   });
// }

function TestJson() {
  $.getJSON("data.json",function(data){
    console.log(data);  
  })
}


