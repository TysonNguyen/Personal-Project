//***********************************************************************************
//Global Declaration
//***********************************************************************************
var myURL = "https://thor.cnt.sast.ca/~demo/cmpe2000/lab03_webservice.php";
var timer;
//***********************************************************************************

//***********************************************************************************
//Main
//***********************************************************************************
$(main);
function main() {
  $("#getAll_Btn").click(getAll_BtnEvent);
  $("#addTag_Btn").click(addTag_BtnEvent);
  $("#getLive_Btn").click(getLive_BtnEvent);
  $(`#filter_Btn`).click(filter_BtnEvent);
  $(`#getHistorical_Btn`).click(getHistorical_BtnEvent);
  $(`#Live_chkBox`).change(Live_chkBoxEvent);
}

//***********************************************************************************

function getAll_BtnEvent() {
  var objectRequest = {};
  objectRequest["tagId"] = "all";
  AjaxRequest(myURL, "POST", objectRequest, "html", ShowAllTags, ajaxFail);
}

function addTag_BtnEvent() {
  if (ValidateAddTag()) {
    console.log("Valid");
    var objectAdd = {};
    objectAdd["action"] = "add";
    objectAdd["tagDesc"] = $("#tagName").val();
    objectAdd["tagMin"] = $("#Minimum").val();
    objectAdd["tagMax"] = $("#Maximum").val();
    AjaxRequest(myURL, "POST", objectAdd, "html", ajaxSuccess, ajaxFail);
  } else console.log("U are missing input");
}

function AjaxRequest(
  passedURL,
  passedType,
  passedData,
  passedDataType,
  successFunction,
  errorFunction
) {
  $.ajax({
    url: passedURL,
    data: passedData,
    type: passedType,
    success: successFunction,
    datatype: passedDataType,
    error: errorFunction,
  });
}

function ValidateAddTag() {
  let name_txtBox = $("#tagName");
  let minimum_txtBox = $("#Minimum");
  let maximum_txtBox = $("#Maximum");
  if (name_txtBox.val() == "") {
    name_txtBox.focus();
    return false;
  }
  if (minimum_txtBox.val() == "") {
    minimum_txtBox.focus();
    return false;
  }

  if (maximum_txtBox.val() == "") {
    maximum_txtBox.focus();
    return false;
  }

  if (minimum_txtBox.val() > maximum_txtBox.val()) {
    alert("Min is greater than Max");
    minimum_txtBox.focus();
    return false;
  }
  return true;
}

function ajaxFail(jqHQR, status, errormessage) {
  alert(`GET fail: ${status}`);
  console.log(errormessage);
}

function ShowAllTags(responseData, returnStatus) {
  $(`#divStatus`).html(responseData.status);
  tarTable = $(`#tarTable`);
  var extractedData = responseData.data;
  tarTable.find("tbody").empty();
  for (key of extractedData) {
    var tr = document.createElement("tr");
    for (tag in key) {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(`${key[tag]}`));
      tr.append(td);
    }
    tarTable.find("tbody").append(tr);
  }
  $("#thead1").prop("class", "display-back");
  $("#thead2").prop("class", "display-none");
  $("#thead3").prop("class", "display-none");
}

function getLive_BtnEvent() {
  let liveObject = {};
  liveObject["action"] = "live";
  liveObject["tagDescription"] = $("#Filter").val();
  AjaxRequest(myURL, "POST", liveObject, "html", ShowGauge, ajaxFail);
}

function ShowGauge(responseData, returnStatus) {
  $(`#divStatus`).html(responseData.status);
  let tarTable = $(`#tarTable`);
  var extractedData = responseData.data;
  tarTable.find("tbody").empty();
  for (key of extractedData) {
    console.log(key);
    var tr = document.createElement("tr");
    for (tag in key) {
      var td = document.createElement("td");
      if (tag == "value") {
        td.appendChild(document.createTextNode(`${Math.round(key[tag])}`));
      } else td.appendChild(document.createTextNode(`${key[tag]}`));
      tr.append(td);
    }
    var tdgauge = document.createElement("td");
    let meterElement = document.createElement("meter");
    $(meterElement).prop("max", key["tagMax"]);
    $(meterElement).prop("min", key["tagMin"]);
    $(meterElement).prop("value", key["value"]);
    if (
      Number(key["value"]) > Number(key["tagMax"]) ||
      Number(key["tagMin"]) > Number(key["value"])
    ) {
      $(meterElement).prop("class", "red");
    } else {
      $(meterElement).prop("class", "green");
    }

    tdgauge.append(meterElement);
    tr.append(tdgauge);
    tarTable.find("tbody").append(tr);
  }
  $("#thead1").prop("class", "display-none");
  $("#thead2").prop("class", "display-back");
  $("#thead3").prop("class", "display-none");
}

function filter_BtnEvent() {
  let filterObject = {};
  filterObject["action"] = "filter";
  filterObject[`tagDesc`] = $("#Filter").val();
  AjaxRequest(myURL, `POST`, filterObject, `html`, PopulateOption, ajaxFail);
}

function PopulateOption(responseData, returnStatus) {
  let tarSelect = $(`#savedFilter_Select`);
  $(tarSelect).empty();
  for (key of responseData.data) {
    console.log(responseData);
    let optionElement = document.createElement("option");
    $(optionElement).prop("value", key[`tagId`]);
    optionElement.appendChild(
      document.createTextNode(`${key[`tagDescription`]}`)
    );
    $(tarSelect).append(optionElement);
  }
}

function getHistorical_BtnEvent() {
  let getHistoricalObject = {};
  getHistoricalObject.action = "historical";
  getHistoricalObject.tagId = $("#savedFilter_Select").val();
  AjaxRequest(
    myURL,
    "POST",
    getHistoricalObject,
    "html",
    ShowHistorical,
    ajaxFail
  );
}

function ShowHistorical(responseData, returnStatus) {
  $(`#divStatus`).html(responseData.status);
  let tarTable = $("#tarTable");
  var extractedData = responseData.data;
  tarTable.find("tbody").empty();
  for (key of extractedData) {
    console.log(key);
    var tr = document.createElement("tr");
    for (tag in key) {
      var td = document.createElement("td");
      if (tag == "value") {
        td.appendChild(document.createTextNode(`${Math.round(key[tag])}`));
      } else td.appendChild(document.createTextNode(`${key[tag]}`));
      tr.append(td);
    }
    var tdgauge = document.createElement("td");
    let meterElement = document.createElement("meter");
    $(meterElement).prop("max", key["tagMax"]);
    $(meterElement).prop("min", key["tagMin"]);
    $(meterElement).prop("value", key["value"]);
    if (
      Number(key["value"]) > Number(key["tagMax"]) ||
      Number(key["tagMin"]) > Number(key["value"])
    ) {
      $(meterElement).prop("class", "red");
    } else {
      $(meterElement).prop("class", "green");
    }

    tdgauge.append(meterElement);
    tr.append(tdgauge);
    tarTable.find("tbody").append(tr);
  }
  $("#thead1").prop("class", "display-none");
  $("#thead2").prop("class", "display-none");
  $("#thead3").prop("class", "display-back");
}

function Live_chkBoxEvent() {
  if ($(this).is(":checked")) {
    timer = setInterval(() => {
      getLive_BtnEvent();
    }, 500);
  } else clearInterval(timer);
}
