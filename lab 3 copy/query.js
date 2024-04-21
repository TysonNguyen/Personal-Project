//***********************************************************************************
//Program: Lab 3
//Description: Data Retreat Lab
//Date: Apr 21 2024
//Author: Tyson Nguyen
//Course: CMPE2000
//Class: CNTA01
//***********************************************************************************

//***********************************************************************************
//Global Declaration
//***********************************************************************************
var myURL = "https://thor.cnt.sast.ca/~demo/cmpe2000/lab03_webservice.php";
var xValues = [];
var yValues= [] ;
var iArrayCount = 0;
var liveValue,liveTime;
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


//Method: getAll_BtnEvent()
//Purpose: Get All button Evenet
//Parameters:
//Returns: nothing
//*********************************************************************************************
function getAll_BtnEvent() {
  var objectRequest = {};
  objectRequest["tagId"] = "all";
  AjaxRequest(myURL, "POST", objectRequest, "html", ShowAllTags, ajaxFail);
}

//Method: addTag_BtnEvent()
//Purpose: add Tag button Evenet
//Parameters:
//Returns: nothing
//*********************************************************************************************
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

//Method: AjaxRequest(passedURL,passedType,passedData,passedDataType,successFunction,errorFunction)
//Purpose: Request Ajax from sever
//Parameters:
//passedURL : URL to the sever
//passedType : type of request
//passedData : the data to the sever
//passedDataType : the return type data
//successFunction : function when ajax call success
//errorFunction : function when ajax call fail
//Returns: nothing
//*********************************************************************************************
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

//Method: ValidateAddTag()
//Purpose: Validation before addTag button send ajax request
//Parameters:
//Returns: nothing
//*********************************************************************************************
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

//Method: ajaxFail(jqHQR,status,errormessage)
//Purpose: get call when ajax request is fail
//Parameters:
//jqHQR: 
//status: status of request
//errormessage: message when it failed
//Returns: nothing
//*********************************************************************************************
function ajaxFail(jqHQR, status, errormessage) {
  alert(`GET fail: ${status}`);
  console.log(errormessage);
}

//Method: ShowAllTags(responseData, returnStatus)
//Purpose: show all tags when alltag button is click
//Parameters:
//responseData : return data from the request
//returnStatus : status of request
//Returns: nothing
//*********************************************************************************************
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

//Method: getLive_BtnEvent()
//Purpose: giveLive button event click
//Parameters:
//Returns: nothing
//*********************************************************************************************
function getLive_BtnEvent() {
  let liveObject = {};
  liveObject["action"] = "live";
  liveObject["tagDescription"] = $("#Filter").val();
  AjaxRequest(myURL, "POST", liveObject, "html", ShowGauge, ajaxFail);
}

//Method: ShowGauge(responseData, returnStatus)
//Purpose: show gauge when get live button is click
//Parameters:
//responseData : return data from the request
//returnStatus : status of request
//Returns: nothing
//*********************************************************************************************
function ShowGauge(responseData, returnStatus) {
  $(`#divStatus`).html(responseData.status);
  let tarTable = $(`#tarTable`);
  var extractedData = responseData.data;
  tarTable.find("tbody").empty();
  console.log(extractedData)
  for (key of extractedData) {
    var tr = document.createElement("tr");
    for (tag in key) {
      var date = new Date();
      var td = document.createElement("td");
      if (tag == "value") {
        liveValue = Math.round(key[tag]);
        liveTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        td.appendChild(document.createTextNode(`${liveValue}`));
      }
      else td.appendChild(document.createTextNode(`${key[tag]}`));
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

//Method: filter_BtnEvent()
//Purpose: filter button event click
//Parameters:
//Returns: nothing
//*********************************************************************************************
function filter_BtnEvent() {
  let filterObject = {};
  filterObject["action"] = "filter";
  filterObject[`tagDesc`] = $("#Filter").val();
  AjaxRequest(myURL, `POST`, filterObject, `html`, PopulateOption, ajaxFail);
}

//Method: PopulateOption(responseData, returnStatus)
//Purpose: popuplate option when get historical is click
//Parameters:
//responseData : return data from the request
//returnStatus : status of request
//Returns: nothing
//*********************************************************************************************
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

//Method: getHistorical_BtnEvent()
//Purpose: getHistorical button is click
//Parameters:
//Returns: nothing
//*********************************************************************************************
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

//Method: ShowHistorical(responseData, returnStatus)
//Purpose: show 100 historical data
//Parameters:
//responseData : return data from the request
//returnStatus : status of request
//Returns: nothing
//*********************************************************************************************
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

//Method: Live_chkBoxEvent()
//Purpose: keep call get live button and show chart
//Parameters:
//Returns: nothing
//*********************************************************************************************
function Live_chkBoxEvent() {
  if ($(this).is(":checked")) {
    timer = setInterval(() => {
      Graph();
    }, 500);
  } else clearInterval(timer);
}

function Graph(){  
  getLive_BtnEvent();
  if(iArrayCount < 10)
  {
    xValues[iArrayCount] = liveTime;
    yValues[iArrayCount] = liveValue;
    iArrayCount++;
  }
  else
  {
    xValues.push(liveTime);
    xValues.shift();

    yValues.push(liveValue);
    yValues.shift();
  }
  new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 1, max:11}}],
    }
  }
  });
}