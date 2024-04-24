var thisURL = 'https://cat-fact.herokuapp.com/facts/random';


$(main)
function main(){
    $("#callRequest").click(ClickEvent)
}


function ClickEvent(){
    let ob = {}
    ob.animal_type = `cat,horse`;
    ob.amount = 500
    console.log(ob);
    AjaxRequest(ob);
}
function AjaxRequest(object)
{
    $.ajax({
        url: thisURL,
        type: "GET",
        data: object,
        dataType: "json",
        success: Success,
        error: (xqh,msg,status) => {console.log("error")}
    })
}

function Success(data,msg)
{
    let count = 0;
    console.log("sucesss"); 
    console.log(data)
    $("#displayDiv").empty();
    for(key of data)
    {
        if(key.status.verified == true )
        {
            let pElement = document.createElement("p")
            pElement.appendChild(document.createTextNode(key.text))
            $("#displayDiv").append(document.createElement("hr")).append(pElement);
            count++;
        }
        
    }
    
    console.log(count);
}