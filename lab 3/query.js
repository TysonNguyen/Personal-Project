//***********************************************************************************
//Global Declaration
//***********************************************************************************
var myURL = "https://thor.cnt.sast.ca/~demo/cmpe2000/lab03_webservice.php";

//***********************************************************************************

//***********************************************************************************
//Main
//***********************************************************************************

$(document).ready(main);

function main() {
  let table = document.createElement(`table`);
  $(table).prop("id", "createdTable");
  table.append(document.createElement("thead"));
  table.append(document.createElement("tbody"));
  $(`#divOutput`).append(table);
  $("#getAll_Btn").click(getAll_BtnEvent);
  $("#addTag_Btn").click(addTag_BtnEvent);
  $("#getLive_Btn").click(getLive_BtnEvent);
}

//***********************************************************************************

function getAll_BtnEvent() {
  var objectRequest = {};
  objectRequest["tagId"] = "all";
  AjaxRequest(myURL, "POST", objectRequest, "html", ShowAllTags, ajaxFail);
}
function getLive_BtnEvent() {
  let liveObject = {};
  liveObject["action"] = "live";
  liveObject["tagDescription"] = `A`;
  AjaxRequest(myURL, "POST", liveObject, "html", ajaxSuccess, ajaxFail);
}
function addTag_BtnEvent() {
  if (Validate()) {
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

function ajaxFail(jqHQR, status, errormessage) {
  alert(`GET fail: ${status}`);
  console.log(errormessage);
}
function ajaxSuccess(responseData, returnStatus) {
  alert(responseData.returnStatus);
  console.log(responseData);
}
function ShowAllTags(responseData, returnStatus) {
  console.log(`POST done: ${returnStatus}`);
  console.log(responseData);
  alert(responseData.status);
  tarTable = $(`#createdTable`);
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
}

function Validate() {
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
