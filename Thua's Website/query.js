//Globally//
const arrayCategory = ["pedi", "mani", "extension", "wax", "combo", "all"];
let service = [
  {
    id: 1,
    name: `Super Spa - Pedicure`,
    description: ``,
    duration: `45`,
    price: `25`,
  },
  {
    id: 2,
    name: `Tyson`,
    description: `Tall`,
    duration: `30`,
    price: `10`,
  },
];

service;
service.forEach((value, key) => {
  console.log(value.id);
});
const enableShow = 1;
const enableOff = 0;
function showProduct(serviceID, Enabler) {
  var txtElement;
  switch (serviceID) {
    case arrayCategory[0]:
      txtElement = document.getElementsByName("pedi");
      if (Enabler == 3) {
        for (var i = 0; i < txtElement.length; i++) {
          txtElement[i].style.display = "block";
        }
        return;
      }

      if (Enabler != 3) {
        for (var i = 0; i < txtElement.length; i++) {
          if (Enabler == 1) {
            txtElement[i].style.display = "block";
          } else {
            while (i < txtElement.length) {
              txtElement[i].style.display = "none";
              i++;
            }
            return;
          }
        }
        showProduct("mani", 0);
        showProduct("extension", 0);
        showProduct("wax", 0);
        showProduct("combo", 0);
      }
      break;
    case arrayCategory[1]:
      txtElement = document.getElementsByName("mani");
      if (Enabler == 3) {
        for (var i = 0; i < txtElement.length; i++) {
          txtElement[i].style.display = "block";
          return;
        }
      }

      if (Enabler != 3) {
        for (var i = 0; i < txtElement.length; i++) {
          if (Enabler == 1) {
            txtElement[i].style.display = "block";
          } else {
            while (i < txtElement.length) {
              txtElement[i].style.display = "none";
              i++;
            }
            return;
          }
        }
        showProduct("pedi", 0);
        showProduct("extension", 0);
        showProduct("wax", 0);
        showProduct("combo", 0);
      }
      break;
    case arrayCategory[2]:
      txtElement = document.getElementsByName("extension");
      if (Enabler == 3) {
        for (var i = 0; i < txtElement.length; i++) {
          txtElement[i].style.display = "block";
        }
        return;
      }

      if (Enabler != 3) {
        for (var i = 0; i < txtElement.length; i++) {
          if (Enabler == 1) {
            txtElement[i].style.display = "block";
          } else {
            while (i < txtElement.length) {
              txtElement[i].style.display = "none";
              i++;
            }
            return;
          }
        }
        showProduct("mani", 0);
        showProduct("pedi", 0);
        showProduct("wax", 0);
        showProduct("combo", 0);
      }
      break;
    case arrayCategory[3]:
      txtElement = document.getElementsByName("wax");
      if (Enabler == 3) {
        for (var i = 0; i < txtElement.length; i++) {
          txtElement[i].style.display = "block";
        }
        return;
      }

      if (Enabler != 3) {
        for (var i = 0; i < txtElement.length; i++) {
          if (Enabler == 1) {
            txtElement[i].style.display = "block";
          } else {
            while (i < txtElement.length) {
              txtElement[i].style.display = "none";
              i++;
            }
            return;
          }
        }
        showProduct("mani", 0);
        showProduct("extension", 0);
        showProduct("pedi", 0);
        showProduct("combo", 0);
      }
      break;
    case arrayCategory[4]:
      txtElement = document.getElementsByName("combo");
      if (Enabler == 3) {
        for (var i = 0; i < txtElement.length; i++) {
          txtElement[i].style.display = "block";
        }
        return;
      }

      if (Enabler != 3) {
        for (var i = 0; i < txtElement.length; i++) {
          if (Enabler == 1) {
            txtElement[i].style.display = "block";
          } else {
            while (i < txtElement.length) {
              txtElement[i].style.display = "none";
              i++;
            }
            return;
          }
        }
        showProduct("mani", 0);
        showProduct("extension", 0);
        showProduct("wax", 0);
        showProduct("pedi", 0);
      }
      break;
    case arrayCategory[5]:
      for (var i = 0; i < arrayCategory.length; i++) {
        showProduct(arrayCategory[i], Enabler);
      }
      break;
  }
}
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
  showProduct("all", 3);
};
document.querySelector("#all").addEventListener("click", showAll);
const showPedi = () => {
  showProduct("pedi", 1);
};
document.querySelector("#pedi").addEventListener("click", showPedi);
const showMani = () => {
  showProduct("mani", 1);
};
document.querySelector("#mani").addEventListener("click", showMani);
const showExtension = () => {
  showProduct("extension", 1);
};
document.querySelector("#extension").addEventListener("click", showExtension);
const showWax = () => {
  showProduct("wax", 1);
};
document.querySelector("#wax").addEventListener("click", showWax);
const showCombo = () => {
  showProduct("combo", 1);
};
document.querySelector("#combo").addEventListener("click", showCombo);

//BOOK-ONLINE//
