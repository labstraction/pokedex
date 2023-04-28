//console.log(window.location)
//console.log(window.location.search)

const urlSearchParams = new URLSearchParams(window.location.search);

//console.log(urlSearchParams)

const pokemonName = urlSearchParams.get('pokemon');


console.log(pokemonName);


PokeService.getDetail(pokemonName).then(pokemonObject => {
    console.log('data from db', pokemonObject);
    
    const newPokemon = createNewPokemon(pokemonObject);
    displayPokemon(newPokemon)

})

function displayPokemon(pokemon){
    document.getElementById('pokemon-name').innerHTML = pokemon.name;

    const statsContainer = document.getElementById('pokemon-stats');
    for (const stat of pokemon.stats) {
        statsContainer.innerHTML += `<li><strong>${stat.name}</strong> ${stat.baseValue}</li>`
    }

    const typesContainer = document.getElementById('pokemon-types');
    for (const type of pokemon.types) {
        typesContainer.innerHTML += `<li><a href="./type.html?typeUrl=${type.url}"><strong>${type.name}</strong></a></li>`
    }
}


function createNewPokemon(pokemonObject){
    const myPokemon = new Pokemon(pokemonObject.name);

    for (let i = 0; i < pokemonObject.stats.length; i++) {
        const statObject = pokemonObject.stats[i];
        myPokemon.addStat(statObject.stat.name, statObject.base_stat)
    }

    for (let i = 0; i < pokemonObject.types.length; i++) {
        const typeObj = pokemonObject.types[i];
        myPokemon.addType(typeObj.type.name, typeObj.type.url);
    }

    

    return myPokemon;
}