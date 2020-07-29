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

    fetch(url)
        .then((resp) => {return resp.json()})
        .then(cities_uf => { 

            for( const city of cities_uf){
                city_select.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            city_select.disabled = false
        }) 
}