window.onload = init;
let headers = {};
let url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        };
        loadPokemon();
    } else {
        window.location.href = "index.html";
    }
}

function loadPokemon(){
    axios.get(`${url}/pokemon`, headers).then((res) => {
        console.log(res);
        displayPokemon(res.data.message);
    }).catch((err) => {
        console.log(err);
    })
}

function displayPokemon(pokemon){
    let body = document.querySelector("body");
    pokemon.forEach(element => {
        body.innerHTML += `<h3>${element.pok_name}</h3>`;
    });
}