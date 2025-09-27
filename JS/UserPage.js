import { logout, Calendario, Indicator} from "./Libreria.js";
const calendar = new Calendario([]);
const scrittaBenvenuto = document.getElementById("ScrittaBenvenuto");
const logoutButton = document.getElementById("LogoutButton");
const formUtente = document.getElementById("GeneralForm");
const formUtenteSecurity = document.getElementById("GeneralFormPassword");
const inputform = formUtente.querySelectorAll("input[type='text']");
const ParentMyclub = document.getElementById("ProfileMyClub");

const IndicatorCalendar = new Indicator("CalendarDaysID","div","IndicatorePagina",".Active",0,0);
IndicatorCalendar.HoverMouse();
IndicatorCalendar.NotHoverMouse();

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
    const url = new URL('http://127.0.0.1:5000/myClub');
    url.searchParams.append("idUser", JSON.parse(localStorage.getItem("Utente")).id_user);
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.msg === "Errore"){
                console.log("KABOOM")
            }else{
                for(const t of data.msg){
                    const club = document.createElement("button");
                    club.textContent = t[0];
                    club.addEventListener("click", () =>{
                        const urlclub = new URL('BookClubPage.html',window.location.origin);
                        urlclub.searchParams.append("idClub",t[1]);
                        window.location.href = urlclub;
                    })
                    ParentMyclub.append(club);
                }
                
            }
        })
    calendar.render();
        IndicatorCalendar.SetOnActive();
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
