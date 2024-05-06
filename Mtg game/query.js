var setLogo = ["blb","mh3","otj","pip"]
var MTGurl = "https://api.scryfall.com/cards/search"; 
var loadMain = true;
$(main) 
function main(){
    if(loadMain)
    {
        for(let i = 0; i < setLogo.length; i++)
        {
            const imgElement = document.createElement("img");
            const aElement = document.createElement("a");
            $(aElement).prop("href","./display/display.html")
            $(imgElement).prop("src",`./image/${setLogo[i]}-logo.jfif`)
            $(imgElement).val(setLogo[i]);
            aElement.append(imgElement)
            $(imgElement).click(IconClick)
            $("#index_icon").append(aElement);
        }        
    }
}

function IconClick(){
    let ob = {
        as: "grid",
        order : 'set',
        q: `set:${$(this).val()}`
        
    }
    $.ajax({
        url: MTGurl,
        dataType: "json",
        data: ob,
        type: "GET",
        success: SuccessCallSet,
        error: () => {console.log("error")}
    })
    loadMain = false;
}

function SuccessCallSet(data,mgs)
{
    console.log(data)
}
