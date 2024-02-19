const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonImage = document.querySelector('.pokemon-img')
const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const btnprev = document.querySelector('.btn-prev')
const btnnext = document.querySelector('.btn-next')
let searchPokemon =  1

async function fetchPokemon(pokemon){
  
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (APIResponse.status == 200){
    const data = await APIResponse.json() //vai salvar os dados json
    return data
  } 
  
}

async function renderPokemon(pokemon){

  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML =  ''
  const data = await fetchPokemon(pokemon)
  console.log(data.id)
  if (data) {
    pokemonImage.style.display = 'block'
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    searchPokemon = data.id
  
    input.value = ''
  } else {
    pokemonName.innerHTML = 'Not found :('
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
    input.value = ''
  }
}

renderPokemon('1')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

btnnext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

btnprev.addEventListener('click', () => {
  if (searchPokemon > 1){
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  } 
})



/*await vai servir pra esperar a linha concluir antes de executar as linhas seguintes do código,
o await so funciona em função assincrona, por isso o async ali em cima. esse async serve pro ja 
ir organizando as outras coisas enquanto espera pelas respostas*/