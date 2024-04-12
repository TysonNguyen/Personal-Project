var MTGurl = "https://magicthegathering.io/";

$(document).ready(main);

function main(){
    console.log("hello")
    const mtg = require('mtgsdk')

// Get all cards
mtg.card.all()
.on('data', function (card) {
  console.log(card.name)
});

// Filter Cards
mtg.card.all({ supertypes: 'legendary', types: 'creature', colors: 'red,white' })
.on('data', function (card) {
    console.log(card.name)
});
}


// function ajaxFail(jqHQR, status, errormessage) {
//     alert(`GET fail: ${status}`);
//     console.log(errormessage);
// }

// function ajaxSuccess(responseData, returnStatus) {
//     console.log(responseData);
// }