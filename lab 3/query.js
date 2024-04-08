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
    $('#getAll_Btn').click(getAll_BtnEvent);
}

//***********************************************************************************

function getAll_BtnEvent() {
    console.log("clicked");
    let tagId = "all";
    AjaxRequest(myURL,"POST",tagId,'html',);
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
    console.alert(`GET fail: ${status}`);
    console.log(errormessage);
}

function ShowAllTags(data, returnStatus) {
    console.log(`GET done: ${returnStatus}`);
    $($(".display")[btnNum]).html(data);
}
