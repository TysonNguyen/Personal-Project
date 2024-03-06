setInterval(function ScreenMedia() {
    if(window.innerWidth < 800){
        document.getElementById("services").classList.remove("gtc-3");
        document.getElementById("services").classList.add("gtc-1");
        document.body.style.background = "pink";
    }
    else
    {
        document.getElementById("services").classList.add("gtc-3");
        document.getElementById("services").classList.remove("gtc-1");
        document.body.style.background = "palevioletred" ;
    }
}, 100);