/** DOM ELEMENTS */
const pokemonCard = document.getElementById('pokemon-card');
const pokemonImg = document.getElementById('pokemon-img');
const pokemonName = document.getElementById('pokemon-name');
const pokemonType = document.getElementById('pokemon-type');
const pokemonStats = document.getElementById('pokemon-stats');
const hpStat = document.getElementById('pokemon-hp');
const attackStat = document.getElementById('pokemon-attack');
const defenseStat = document.getElementById('pokemon-defense');
const spAttackStat = document.getElementById('pokemon-sp');
const spDefenseStat = document.getElementById('pokemon-sd');
const speedStat = document.getElementById('pokemon-speed');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const statusMessage = document.querySelector('.status-message');
const errorMessage = document.querySelector('.error-message');

const searchPokemon = () =>{
    const pokemonName = searchInput.value.toLowerCase().trim();

    if (!pokemonName) {
        showError("Type a Pokémon name");
        return;
    }

    fetchPokemon(pokemonName);
}

const setLoading = () => {
    statusMessage.classList.remove('hidden');
    statusMessage.textContent = "Loading...";
}

const hideLoading = () => {
    statusMessage.classList.add('hidden');
    statusMessage.textContent = "";
}

const hideError = () => {
    errorMessage.classList.add('hidden'); 
    errorMessage.textContent = "";
}

const showError = (msg) => {
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = `${msg}`;
}

const fetchPokemon = async (name) => {
    pokemonCard.classList.add('hidden');
    setLoading();
    hideError();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        if (!response.ok) throw new Error('Pokémon not found');


        const data = await response.json();

        const stats = data.stats;

        hpStat.textContent = `HP: ${stats.find(s => s.stat.name === 'hp').base_stat}`;
        attackStat.textContent = `Attack: ${stats.find(s => s.stat.name === 'attack').base_stat}`;
        defenseStat.textContent = `Defense: ${stats.find(s => s.stat.name === 'defense').base_stat}`;
        spAttackStat.textContent = `Special Attack: ${stats.find(s => s.stat.name === 'special-attack').base_stat}`;
        spDefenseStat.textContent = `Special Defense: ${stats.find(s => s.stat.name === 'special-defense').base_stat}`;
        speedStat.textContent = `Speed: ${stats.find(s => s.stat.name === 'speed').base_stat}`;

        pokemonImg.src = data.sprites.front_default;
        pokemonName.textContent = data.name;

        pokemonType.textContent = data.types.map(t => t.type.name).join(', ');

        pokemonCard.classList.remove('hidden');
    } catch (error) {
        console.error('Failed to fetch:', error);
        pokemonCard.classList.add('hidden');
        showError(error.message);
    } finally {
        hideLoading();
    }
}

searchBtn.addEventListener('click', searchPokemon);

fetchPokemon('pikachu');