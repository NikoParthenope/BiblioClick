import { Indicator ,Calendario, login, logout} from "./Libreria.js";
const calendar = new Calendario([]);
const IndicatorCalendar = new Indicator("CalendarDaysID","div","IndicatorePagina",".Active",0,10);
IndicatorCalendar.HoverMouse();
IndicatorCalendar.NotHoverMouse();

function prendiEventi(){
    const urlpar = new URLSearchParams(document.location.search);
    const url =  new URL("http://127.0.0.1:5000/ClubDetails");
    url.searchParams.append("idClub",urlpar.get("idClub"));
    url.searchParams.append("idUser",JSON.parse(localStorage.getItem("Utente")).id_user);
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data.clubinf);
            document.getElementById("NomeBookClub").textContent = data.clubinf[1];
            document.getElementById("DescrizioneBookClub").textContent = "DescrizioneClub"
            document.getElementById("LinguaClub").textContent = data.clubinf[3];;
            document.getElementById("NumeroPartecipanti").innerHTML = '12/' + data.clubinf[2]; + '&#128110';
            document.getElementById("TematicaDelClub").textContent = data.clubinf[5];; 
            document.getElementById("ProssimaDiscussione").textContent = data.Dettagli[0][2];
            document.getElementById("BottonePartecipazioneDiscussione").textContent = data.Dettagli[0][3];
            if(data.QueryReg === "Si"){
                document.getElementById("BottoneIscrizioneClub").textContent = "Iscritto";
            }else{
                document.getElementById("BottoneIscrizioneClub").addEventListener("click", () =>{
                const urlpar = new URLSearchParams(document.location.search);
                const url =  new URL("http://127.0.0.1:5000/Iscrizione");
                url.searchParams.append("idClub",urlpar.get("idClub"));
                url.searchParams.append("idUser",JSON.parse(localStorage.getItem("Utente")).id_user);
                    fetch(url)
                    .then(response => response.json())
                    .then(data =>{
                        window.location.reload();
                    })
                    
                })
            }
            document.getElementById("BottonePartecipazioneDiscussione").addEventListener("click", () =>{
                    let date = new Date();
                    const url = new URL("DiscussionPage.html", window.location.origin);
                    url.searchParams.append("idDiscussione", data.Dettagli[0][0]);
                    
                        window.location.href = url; 
                    
                })
        })
}


/*Gestione Login/Logout*/
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
    calendar.render()
    IndicatorCalendar.SetOnActive();
    prendiEventi();

})

