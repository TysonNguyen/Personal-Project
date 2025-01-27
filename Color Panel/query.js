$(main);

function main() {
    for(let i = 0; i <= 4; i++)
    {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src',`./Color number/bio chic ${i}.png`);
        $("#displayColor").append(imgElement);
    }
}

