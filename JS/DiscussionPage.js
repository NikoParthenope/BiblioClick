import {Commenti,login , logout} from './Libreria.js'
const FormRispostaCommento = document.getElementById("RispostaCommento");
const p = new URLSearchParams(document.location.search);
const param = p.get("idDiscussione");

document.addEventListener("DOMContentLoaded", () =>{    
        if(JSON.parse(localStorage.getItem("Utente"))){
            console.log("Utente LOggato");
            login();
            document.getElementById("LogoutButton").addEventListener("click", () =>{
                logout();
                
            })
            document.getElementById("ProfiloButton").addEventListener("click", () =>{
                window.location.href = "UserPage.html";
                
            })
        }
    const urlpar = new URLSearchParams(document.location.search);
    const url =  new URL("http://127.0.0.1:5000/PrendiCommenti");
    url.searchParams.append("idDiscussione",urlpar.get("idDiscussione"));
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data.msg);
        for(const x of data.msg){
            const t = new Commenti(x[1],x[2]);
            t.render();
        }
    })
})

FormRispostaCommento.addEventListener("submit", (event) =>{
    event.preventDefault();
    const form = new FormData(FormRispostaCommento);
    form.append("idDiscussione", param);
    form.append("username",JSON.parse(localStorage.getItem("Utente")).username)

    fetch('http://127.0.0.1:5000/AggiungiCommenti',{
        method: "POST",
        body: form
    })
    .then(response => response.json())
    .then(data =>{
        window.location.reload();
    })

})