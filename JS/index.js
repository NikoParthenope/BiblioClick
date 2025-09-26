import { Indicator, Pagination, login , logout} from "./Libreria.js";


const url_s = document.getElementById("FormSearch");
let risultatoRicerca = [];


addEventListener("DOMContentLoaded", () => {
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
})

document.getElementById("LoginButton").addEventListener("click", () => {
    window.location.href = "LogRegPage.html";
});

document.getElementById("CreateClubButton").addEventListener("click", () => {
    window.location.href = "CreateClub.html";
});
url_s.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(url_s);
    const params = new URLSearchParams();
    let url_n = new URL(window.location.href);

    // aggiungi tutti i campi della form alla query string
    for (const [key, value] of formData.entries()) {
        params.append(key, value);
        url_n.searchParams.append(key, value);
    }
    window.history.replaceState(null, null, url_n);
    fetch(`http://127.0.0.1:5000/Search?${params}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("ClubSearchContainer").innerHTML = '';
            risultatoRicerca = data;
            const pag = new Pagination(data);
            pag.setPagine();
            pag.render();
            let IndicatorPagination = new Indicator("NumericButtonID", "button", "IndicatorPagin", ".Active", 0, -10);
            IndicatorPagination.HoverMouse();
            IndicatorPagination.NotHoverMouse();
            IndicatorPagination.SetOnActive();
        })
        .catch(err => console.error("Errore:", err));

})
