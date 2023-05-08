const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let pokeSelected;
const limit = 202;
let offset = 1;
let maxQtd = 1010;


loadPoke(offset, limit);

function loadPoke(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml =  pokemons.map((pokemon) => `
            <li class="pokemon ${pokeBackgroundColor(pokemon.types)}">
                    <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
                    <span class="name">${pokemon.name} </span>
                    <div class="details">
                        <ol class = "types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
        
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml;
    })
    .catch((error) => console.error(error))
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    let qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxQtd) {
        let newLimit = maxQtd - offset;
                
        loadPoke(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else {
        loadPoke(offset, limit);
    }
})


function pokeBackgroundColor(pokecolors) {

    

    if (pokecolors[1] === undefined) {
        return pokecolors[0];
    }
    else {
        return pokecolors[0]+pokecolors[1];
    }
}