var MTGurl = "https://api.scryfall.com/cards/search";

$(main);

function main() {
  $(`#testRequest`).click(btnClickEvent);
}

function btnClickEvent() {
  let ob = {};
  ob.q = "Tymna";
  $.ajax({
    url: MTGurl,
    dataType: "json",
    data: ob,
    type: "GET",
    success: SuccessAjax,
    error: ErrorAjax,
  });
}
function SuccessAjax(returnData, msg) {
  console.log(returnData);
  for (let i = 0; i < returnData.total_cards; i++) {
    let imgElement = document.createElement("img");
    console.log(returnData.data[i].image_uris.normal);
    $(imgElement).prop("src", returnData.data[i].image_uris.normal);
    $("body").append(imgElement);
  }
}

function ErrorAjax(xqh, msg) {}
