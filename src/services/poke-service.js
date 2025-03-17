class PokeService {

    static BASE_URL = 'https://pokeapi.co/api/v2/'
    static POKEMON_URL = 'pokemon/'


    constructor(limit = 20, offset=0){
        this.limit = limit;
        this.offset = offset;
    }

    getPokeData(){
        const url = PokeService.BASE_URL + PokeService.POKEMON_URL + '?limit=' + this.limit + '&offset=' + this.offset;
        //const ulr1 = `${PokeService.BASE_URL}${PokeService.POKEMON_URL}?limit=${this.limit}&offset=${this.offset}`;
        // 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'

        console.log(url);
        
        return fetch(url)
        .then(res => res.json())
        .then(data => {
        
            const requests = [];

            for (const pokemon of data.results) {
                
                const pokeUrl = pokemon.url;

                const request =  fetch(pokeUrl)
                .then(result => result.json())
                .then(pokemonData => pokemonData)
                .catch(err => console.log(err));

                requests.push(request);

            }

            return Promise.all(requests);

        })
        .catch(err => console.log(err));
    }

    nextPage(){
        this.offset += this.limit;
    }

    previousPage(){
        this.offset -= this.limit;
    }

}

export default PokeService;