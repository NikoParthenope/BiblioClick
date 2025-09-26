import { logout} from "./Libreria.js";

const scrittaBenvenuto = document.getElementById("ScrittaBenvenuto");
const logoutButton = document.getElementById("LogoutButton");
const formUtente = document.getElementById("GeneralForm");
const formUtenteSecurity = document.getElementById("GeneralFormPassword");
const inputform = formUtente.querySelectorAll("input[type='text']");

document.addEventListener("DOMContentLoaded", () =>{
    scrittaBenvenuto.textContent = "Benvenuto," + " " + JSON.parse(localStorage.getItem("Utente")).username;
    inputform[0].placeholder = JSON.parse(localStorage.getItem("Utente")).nome;
    inputform[1].placeholder = JSON.parse(localStorage.getItem("Utente")).cognome;
    inputform[2].placeholder = JSON.parse(localStorage.getItem("Utente")).email;
    for(const input of inputform){
        input.addEventListener("input", () =>{
            document.getElementById("SaveButtonUser").style.visibility = "visible";
            document.getElementById("DivConfermaPassword").style.visibility = "visible";
            if(!inputform[0].value && !inputform[1].value && !inputform[2].value){
                document.getElementById("SaveButtonUser").style.visibility = "hidden";
                document.getElementById("DivConfermaPassword").style.visibility = "hidden";
            }
        })

    }
})

formUtente.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(formUtente);
    formData.append("IdUtente", JSON.parse(localStorage.getItem("Utente")).id_user );

    fetch('http://127.0.0.1:5000/UpdateUser',{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(risultato => {
        document.getElementById("ResetButtonUser").click();
        document.getElementById("SaveButtonUser").style.visibility = "hidden";
        document.getElementById("DivConfermaPassword").style.visibility = "hidden";
    })
})

formUtenteSecurity.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(formUtenteSecurity);
    formData.append("IdUtente", JSON.parse(localStorage.getItem("Utente")).id_user );

    fetch('http://127.0.0.1:5000/updateUserPassword',{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("ResetButtonUser").click();
        document.getElementById("SaveButtonUser").style.visibility = "hidden";
        document.getElementById("DivConfermaPassword").style.visibility = "hidden";
        document.getElementById("ResetButtonPassword").click();

    })
})

logoutButton.addEventListener("click",() =>{
    logout();
})
