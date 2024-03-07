//Globally//
const arrayCategory = ["Pedi", "Mani", "Extension", "Wax", "Combo"];

function showProduct(serviceID) {
  switch (serviceID) {
    case arrayCategory[0]:
      break;
    case arrayCategory[1]:
      break;
    case arrayCategory[2]:
      break;
    case arrayCategory[3]:
      break;
    case arrayCategory[4]:
      break;
    default:
      for (var i = 0; i < arrayCategory; i++) {
        showProduct(arrayCategory[i]);
      }
      break;
  }
}

//Globally//

setInterval(function ScreenMedia() {
  if (window.innerWidth < 800) {
    document.getElementById("services").classList.remove("gtc-3");
    document.getElementById("services").classList.add("gtc-1");
    document.body.style.background = "pink";
  } else {
    document.getElementById("services").classList.add("gtc-3");
    document.getElementById("services").classList.remove("gtc-1");
    document.body.style.background = "palevioletred";
  }
}, 100);

const showAll = () => {
  document.getElementById("forMani").style.backgroundColor = "blue";
  var txtElement = document.getElementsByName("product");
  for (var i = 0; i < txtElement.length; i++) {
    txtElement[i].style.display = "none";
  }

  //.getElementById("forExtension").style.backgroundColor = "blue";
  document.getElementById("forWax").style.backgroundColor = "blue";
  document.getElementById("forCombo").style.backgroundColor = "blue";
};
document.querySelector("#all").addEventListener("click", showAll);

const showMani = () => {};
document.querySelector("#pedi").addEventListener("click", showMani);

const showPedi = () => {};
document.querySelector("#pedi").addEventListener("click", showPedi);

const showExtension = () => {};
document.querySelector("#pedi").addEventListener("click", showExtension);
const showWax = () => {};
document.querySelector("#pedi").addEventListener("click", showWax);
const showCombo = () => {};
document.querySelector("#pedi").addEventListener("click", showCombo);
