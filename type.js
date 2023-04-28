const urlSearchParams = new URLSearchParams(window.location.search);

const typeUrl = urlSearchParams.get('typeUrl')

PokeService.getType(typeUrl).then(typeObj => {
    console.log(typeObj);
})