import { Indicator } from "./Libreria.js";

const IndicatorPagination = new Indicator("NumericButtonID", "button", "IndicatorPagin", ".Active", 0, -10);
IndicatorPagination.HoverMouse();
IndicatorPagination.NotHoverMouse();

addEventListener("DOMContentLoaded", () => {
    IndicatorPagination.SetOnActive();
})

document.getElementById("Content").querySelector("button").addEventListener("click", () => {
    window.location.href = "LogRegPage.html";
});

const url_s = document.getElementById("FormSearch");
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
            console.log("Risultato:", data);
        })
        .catch(err => console.error("Errore:", err));

})

