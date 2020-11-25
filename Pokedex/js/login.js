window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = "signin.html";
        });
        
        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = "pokedex.html";
    }
}

function login(){
    let mail = document.querySelector('#input-mail').value;
    let password = document.querySelector('#input-password').value;

    axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
            mail,
            password
        }
    }).then(res => {
        if(res.data.status === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "pokedex.html";
        } else {
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(err => {
        console.log(err);
    });
}

