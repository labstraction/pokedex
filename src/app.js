import PokeService from "./services/poke-service.js";

const pService = new PokeService();

pService.getPokeData().then(data => render(data));

function next( ){
    pService.nextPage();
    pService.getPokeData().then(data => render(data));
}
window.next = next;

function previous( ){
    pService.previousPage();
    pService.getPokeData().then(data => render(data));
}
window.previous = previous;


function render(data){

    console.log(data);

    const dexContainer = document.getElementById('dex-container');
    dexContainer.innerText = ''

    for (const pokemon of data) {
        
        const pokeLink = document.createElement('a');

        const img = document.createElement('img');

        img.src = pokemon.sprites.front_default;

        pokeLink.appendChild(img);

        const node = document.createTextNode(pokemon.name);

        pokeLink.appendChild(node);

        dexContainer.appendChild(pokeLink)
    }

}

