window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = "login.html";
        });
        
        document.querySelector('.btn-primary').addEventListener('click', signin);
    } else {
        window.location.href = "pokedex.html";
    }
}

function signin(){
    let mail = document.querySelector('#input-mail').value;
    let username = document.querySelector('#input-name').value;
    let password = document.querySelector('#input-password').value;

    axios({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: {
            username,
            mail,
            password
        }
    }).then(res => {
        alert("Registrado correctamente");
        console.log(res);
        window.location.href = "login.html";
    }).catch(err => {
        console.log(err);
    });
}

