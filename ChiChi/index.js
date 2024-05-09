$(main);

function main() {
  SlideShow();
}

function SlideShow() {
  let timer = setInterval(() => {
    $("#slideShow").fadeOut(1000, () => {
      $("#slideShow").empty();
      const imgElement = document.createElement("img");
      $(imgElement).prop("src", "./img/download.png");
      $("#slideShow").append(imgElement);
      $("#slideShow").fadeIn(2000);
    });
  });
}
