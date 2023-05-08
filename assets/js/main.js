const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let pokeSelected;
const limit = 12;
let offset = 0;
let maxQtd = 1010;


loadPoke(offset, limit);

function loadPoke(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => {
            const bgColor = pokeBackgroundColor(pokemon.types);
            return `
            <li class="pokemon" style ="${bgColor}">
                    <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
                    <span class="name">${pokemon.name} </span>
                    <div class="details">
                        <ol class = "types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
        
            </li>
        `;
    }).join('')
        pokemonList.innerHTML += newHtml;
    })
    .catch((error) => console.error(error))
}


function pokeBackgroundColor(pokecolors) {
    
    let color1;
    let color2;    

    if (pokecolors[1] === undefined) {
        color1 = pokeTypeColor(pokecolors[0]);
        return `background-color: ${color1}`;
    }
    else {
        color1 = pokeTypeColor(pokecolors[0]);
        color2 = pokeTypeColor(pokecolors[1]);
        return `background: linear-gradient(130deg, ${color1} 20%, ${color2} 80%);`
    }
}


function pokeTypeColor(pokecolor) { 
    const colors = {
        "normal": '#A8A878',
        "fighting": '#C03028',
        "flying": '#A890F0',
        "poison": '#A040A0',
        "ground": '#E0C068',
        "rock": '#B8A038',
        "bug": '#A8B820',
        "ghost": '#705898',
        "steel": '#B8B8D0',
        "fire": '#F08030',
        "water": '#6890F0',
        "grass": '#78C850',
        "electric": '#F8D030',
        "psychic": '#F85888',
        "ice": '#98D8D8',
        "dragon": '#7038F8',
        "dark": '#705848',
        "fairy": '#EE99AC'
    }

    for (let color of Object.keys(colors)){
        if (pokecolor == color) {
            return colors[color];
        }
    }
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