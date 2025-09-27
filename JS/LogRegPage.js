import { User, } from "./Libreria.js";


const FormRegistrazione = document.getElementById("RegisterForm");
const FormLogin = document.getElementById("LoginForm");
for(const input of document.querySelectorAll("input[type='text']")){
        input.addEventListener("blur", () =>{
            if(input.value){
            const nextSib = input.nextElementSibling;
            nextSib.style.transform = "translateY(0px)";
            nextSib.style.fontsize = "14px";
            nextSib.style.transition = "0.3s ease-in-out";
        }else{
            const nextSib = input.nextElementSibling;
            nextSib.style.transform = "translateY(30px)";
            nextSib.style.fontsize = "16px";
            nextSib.style.transition = "0.3s ease-in-out";
        }
    })
}
FormRegistrazione.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(FormRegistrazione);
    fetch('http://127.0.0.1:5000/Register', {
    method:'POST', 
    body: formData
    })
    .then(response => response.json())
    .then(ciao => {
        console.log(ciao.username);
    })

})

LoginForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(LoginForm);
    fetch('http://127.0.0.1:5000/Login', {
    method:'POST', 
    body: formData
    })
    .then(response => response.json())
    .then(MSG => {
        console.log(MSG.msg);
        if(MSG.msg === "OK"){
            localStorage.setItem("Utente",JSON.stringify(new User(MSG.informazioni[0][0],MSG.informazioni[0][1],MSG.informazioni[0][2],MSG.informazioni[0][3],MSG.informazioni[0][4],MSG.informazioni[0][5],MSG.informazioni[0][6])));
            window.location.href = "index.html";
        }
    })

})