const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 12;
let offset = 0;
let maxQtd = 1010;


loadPoke(offset, limit);

function loadPoke(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml =  pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${AddZeros(pokemon.number)}</span>
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

function AddZeros(id) {
    if (id < 10) {
        return '00' + id;
    }
    else if (id < 100) {
        return '0' + id;
    }
    else {
        return id;
    }
}