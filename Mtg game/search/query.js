var MTGurl = "https://api.scryfall.com/cards/search";
var cardName,cardImg,cardMV,cardId;
var strRequest;
$(main);

function main() {
  $(`#search_btn`).click(btnClickRequest);
  $(`#testAdd`).click(btnClickAdd);
}

function btnClickRequest() {
  strRequest = BuildString();
  let ob = {
    as:"grid",
    order: `name`,
    q: strRequest
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
    $(imgElement).prop("src", returnData.data[i].image_uris.normal);
    $(imgElement).val(returnData.data[i].id);
    $(imgElement).click(CardClick)
    $("#body-div").append(imgElement);
  }
}

function ErrorAjax(xqh, msg) {

  $("#body-div").empty();
  $("#body-div").html(`There is no card with: ` + strRequest);
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

function BuildString(){
  let strReturn = "";
  if($("#cardMV").val() != "")
  {
    strReturn += `cmc=${Number($("#cardMV").val())}`
  }
  strReturn += '(set:c19)';
  strReturn += `${$("#cardName").val()}`
  
  return strReturn;
}