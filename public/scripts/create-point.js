document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCity)

function populationUFs(){

    const uf_select = document
        .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((resp) => {return resp.json()})
        .then(states_uf => { 

            for(state of states_uf){
                uf_select.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
populationUFs()

function getCity(event){

    const city_select = document
        .querySelector("[name=city]")

    const state_input = document
        .querySelector("[name=state]")

    const index_State_selected = event.target.selectedIndex
    state_input.value = event.target.options[index_State_selected].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    city_select.innerHTML = "<option value>selecione uma cidade</option>"
    city_select.disabled = true


    fetch(url)
        
        .then((resp) => {return resp.json()})
        .then(cities_uf => { 

            for( const city of cities_uf){
                city_select.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            city_select.disabled = false
        }) 
}

const select_to_collect = document.querySelectorAll(" .itens-grid li")

for(const select of select_to_collect) {
    select.addEventListener("click", handlerSelectedItens)
}

const collect_selected = document.querySelector("input[name=itens]")
let selected_itens = []

function handlerSelectedItens(event){

    const item_li = event.target
    item_li.classList.toggle("selected")
    const item_id = item_li.dataset.id
    /*console.log(item_id)*/

    const alReady_selected = selected_itens.findIndex( item => {

        const item_found = item == item_id
        return item_found
    })
    if( alReady_selected >= 0 ){

        const filter_itens = selected_itens.filter( item => {
            
            const item_is_different = item != item_id
            return item_is_different
        })
        selected_itens = filter_itens

    } else { 
        selected_itens.push(item_id)
    }
    
    console.log(selected_itens)
    collect_selected.value = selected_itens
}