var MTGurl = "https://api.scryfall.com/cards/search";
var cardName,cardImg,cardMV,cardId;
var obCardToJson = { card :{
  cardName:"",cardImg:"",cardMV:"",cardId:""
}
}
$(main);

function main() {
  $(`#testRequest`).click(btnClickRequest);
  $(`#testAdd`).click(btnClickAdd);
}

function btnClickRequest() {
  let ob = {
    as:"grid",
    order: `name`,
    q: `cmc=${Number($("#cardMV").val())} ${$("#cardName").val()}` 
    
  };
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
  $("#body-div").empty();
  console.clear();
  console.log(returnData);
  for (let i = 0; i < returnData.total_cards; i++) {
    let imgElement = document.createElement("img");
    obCardToJson.card.cardId = returnData.data[i].id
    obCardToJson.card.cardName = returnData.data[i].name
    obCardToJson.card.cardImg= returnData.data[i].image_uris.normal
    obCardToJson.card.cardMV = returnData.data[i].cmc
    $(imgElement).prop("src", returnData.data[i].image_uris.normal);
    $(imgElement).val(returnData.data[i].id);
    $(imgElement).click(CardClick)
    $("#body-div").append(imgElement);
  }
}

function ErrorAjax(xqh, msg) {
  alert(msg);
}

function CardClick(){
  console.log($(this).val());
}

function btnClickAdd(){
  $.ajax({
    url: "cards.json",
    dataType: "json",
    data: obCardToJson,
    type: "POST",

  });
}