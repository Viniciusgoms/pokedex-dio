
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

var modalOpenButton = [];
var modalCloseButton = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">

            </div>
            <button class="modalButton">More Info</button>

            <div id="poke${pokemon.number}" class="modal">
                    <div class="modal-container">
                        <div class="close-button">
                            <span class="close">&times;</span>
                        </div>                       
                        <div class="modal-content ${pokemon.type}">
                            <div class="modal-header ">
                                <div class="pokemon">
                                    <span class="number">#${pokemon.number}</span>
                                    <span class="name">${pokemon.name}</span>                    
                                    <div class="detail">
                                        <ol class="types">
                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        </ol>                                                           
                                    </div>       
                                </div>
                                <div class="modal-body">
                                    <div class="modal-body-options">
                                        <ol>
                                            <li>About</li>
                                            <li>Base Stats</li>
                                            <li>Evolution</li>
                                            <li>Moves</li>
                                        </ol>
                                    </div>
                                    <div class="modal-info-option">
                                        <ol class="modal-info-about">
                                            <li>
                                                <spam class="modal-info-title">Species</spam>
                                                <div>
                                                    <spam class="modal-info-data">tipo Species</spam>                                                    
                                                </div>
                                            </li>
                                            <li>
                                                <spam class="modal-info-title">Height</spam>
                                                <div>
                                                    <spam class="modal-info-data">(${pokemon.height}cm)</spam>                                                    
                                                </div>
                                            </li>
                                            <li>
                                                <spam class="modal-info-title">Weight</spam>
                                                <div>
                                                    <spam class="modal-info-data">(${pokemon.weight}kg)</spam>                                                    
                                                </div>
                                            </li>
                                            <li>
                                                <spam class="modal-info-title">Abilities</spam>
                                                <div>
                                                ${pokemon.abilities.map((ability) => `<spam class="modal-info-data">${ability}</spam>`).join('')}                                                   
                                                </div>
                                            </li>
                                        </ol>                                      
                                    </div>
                                </div>
                            </div>
                            <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                        </div>                     
                    </div>
                </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    return new Promise((resolve, reject) => {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml

            var openCloseModal = {
                modalOpenButtons : document.querySelectorAll('.modalButton'),
                modalCloseButtons : document.querySelectorAll('.close')     
            }
            console.log(openCloseModal)
            resolve(openCloseModal)
        }).catch(error => {
            reject(error)
        })
    })
}

loadPokemonItens(offset, limit)
    .then(openCloseModal => {
        modalOpenButton = openCloseModal.modalOpenButtons
        modalCloseButton = openCloseModal.modalCloseButtons
        openModal(modalOpenButton)
        closeModal(modalCloseButton)
    })
    .catch(error => {
        console.error(error)
    });

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, limit)
        .then(openCloseModal => {
            modalOpenButton = openCloseModal.modalOpenButtons
            modalCloseButton = openCloseModal.modalCloseButtons
            openModal(modalOpenButton)
            closeModal(modalCloseButton)  
         })
        .catch(error => {
        console.error(error)
        });
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
        .then(openCloseModal => {
            modalOpenButton = openCloseModal.modalOpenButtons
            modalCloseButton = openCloseModal.modalCloseButtons
            openModal(modalOpenButton)
            closeModal(modalCloseButton) 
        })
        .catch(error => {
        console.error(error)
        });
    }
})

function openModal(modalOpenButton){
    modalOpenButton.forEach(button => {
        button.addEventListener('click', () =>{
            const listItem = button.closest('li');
            const modal = listItem.querySelector('.modal')
            modal.style.display = "block"
        })
    })
}

function closeModal(modalCloseButton){
    modalCloseButton.forEach(button => {
        button.addEventListener('click', () =>{
            const listItem = button.closest('li');
            const modal = listItem.querySelector('.modal')
            modal.style.display = "none"
        })
    })
}


