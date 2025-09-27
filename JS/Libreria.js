export class Indicator {
    constructor(ElementsID, ElementsType, IndicatorObjectID, DefaultActiveObject, OffSetUdjustX, OffSetUdjustY) {
        this.Elements = document.getElementById(ElementsID).querySelectorAll(ElementsType);
        this.Indicator = document.getElementById(IndicatorObjectID);
        this.ActiveObject = document.querySelector(DefaultActiveObject);
        this.RectActiveObject = this.ActiveObject.getBoundingClientRect();
        this.IndicatorPosition = this.Indicator.getBoundingClientRect();
        this.OffSetUdjustX = OffSetUdjustX;
        this.OffSetUdjustY = OffSetUdjustY;
    }
    SetOnActive() {
        let offset = this.ActiveObject.x - this.IndicatorPosition.x + this.OffSetUdjustX;
        let offsetY = this.ActiveObject.y - this.IndicatorPosition.y + this.OffSetUdjustY;
        this.ActiveObject.style.transform = "translate(" + offset + "px," + offsetY + "px)";
    }
    HoverMouse() {
        this.Elements.forEach((Element) => {
            Element.addEventListener("mouseover", () => {
                const ElementPos = Element.getBoundingClientRect();
                let offset = ElementPos.x - this.IndicatorPosition.x + this.OffSetUdjustX;
                let offsetY = ElementPos.y - this.IndicatorPosition.y + this.OffSetUdjustY;
                this.ActiveObject.style.backgroundColor = "transparent";
                this.Indicator.style.visibility = "visible";
                this.Indicator.style.transform = "translate(" + offset + "px," + offsetY + "px)";
                this.Indicator.style.transition = "0.1s ease-in-out";
            })
        })
    }
    NotHoverMouse() {
        this.Elements.forEach((Element) => {
            Element.addEventListener("mouseout", () => {
                let offset = this.RectActiveObject.x - this.IndicatorPosition.x + this.OffSetUdjustX;
                let offsetY = this.RectActiveObject.y - this.IndicatorPosition.y + this.OffSetUdjustY;

                this.Indicator.style.visibility = "hidden";
                this.Indicator.style.transform = "translate(" + offset + "px," + offsetY + "px)";
                this.Indicator.style.transition = "0.3s ease-in-out";
                if ((this.IndicatorPosition.x + (this.ActiveObject.x - this.IndicatorPosition.x)) === this.ActiveObject.x) {
                    ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
                }
                if ((this.IndicatorPosition.y + (this.ActiveObject.y - this.IndicatorPosition.y)) === this.ActiveObject.y) {
                    ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
                }
            })
        })
    }
}

export class Pagination {
    constructor(Element) {
        this.Card = Element;
        this.numberOfElement = 6;
        this.CurrentElement = 0;
        this.Pages = Math.round(Object.keys(Element).length / this.numberOfElement) + 1;
        this.NumberOfElements = Object.keys(Element).length;
        this.Array = [];
    }

    render(pagina = 0) {
        this.renderButton();
        this.renderCard(pagina);
    }
    setPagine() {
        let n = 0;
        let nn = 6;
        let tempArray = [];

        this.Card.forEach(Club => {
            tempArray.push(new ClubClass(Club.frequenzadiscussioni, Club.id_club, Club.linguaclub, Club.nomeclub, Club.numeropartecipantimax, Club.tematicaclub));
        })

        //Crea le pagine al fine di inserire i club
        for (let i = 0; i < this.Pages; i++) {
            let tempPagina = []
            tempPagina = tempArray.slice(n, nn);
            this.Array.push(tempPagina);
            n += 6;
            nn += 6;
        }
        //Aggiunge le card invisibili mancanti per arrivare a 6
        if (this.Array[this.Pages - 1].length < 6) {
            let elementimancanti = 6 - this.Array[this.Pages - 1].length;
            for (let i = 0; i < elementimancanti; i++) {
                this.Array[this.Pages - 1].push(new EmptyClubClass());
            }
        }
    }
    renderCard(pagina) {
        const contenitore = document.getElementById("ClubSearchContainer");
        contenitore.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            this.Array[pagina][i].render();
        }
    }
    renderButton() {
        let NumericButton = document.getElementById("NumericButtonID");
        NumericButton.innerHTML = '';
        const Indicator = document.createElement("div");
        Indicator.id = "IndicatorPagin";
        Indicator.style.visibility = "hidden";
        Indicator.style.alignItems = "center";
        Indicator.style.display = "flex";
        NumericButton.appendChild(Indicator);
        const Pallina = document.createElement("div");
        Pallina.classList.add("IndicatorGlass");
        Pallina.classList.add("GlassColor");
        Pallina.style.width = "45px";
        Pallina.style.height = "45px";
        Indicator.appendChild(Pallina);

        const buttonBack = document.createElement("button");
        buttonBack.textContent = '<';
        buttonBack.addEventListener("click", () => {
            if (this.CurrentElement > 0) {
                this.CurrentElement -= 1;
                this.renderCard(this.CurrentElement);


            }
        })
        NumericButton.appendChild(buttonBack);
        for (let i = 1; i < this.Pages + 1; i++) {
            const buttone = document.createElement("button");
            buttone.id = "ButtoneN" + i;
            buttone.textContent = i;
            buttone.addEventListener("click", (event) => {
                const idbottone = i - 1;
                this.CurrentElement = idbottone;
                this.renderCard(idbottone);
                document.querySelector(".Active").classList.remove("Active");
                event.currentTarget.classList.add("Active");

            })
            if (i === 1) {
                buttone.classList.add("Active");
            }
            NumericButton.appendChild(buttone);

        }
        const buttonNext = document.createElement("button");
        buttonNext.textContent = '>';
        buttonNext.addEventListener("click", () => {

            if (this.CurrentElement < this.Pages - 1) {
                this.CurrentElement += 1;
                this.renderCard(this.CurrentElement);
            }
        })
        NumericButton.appendChild(buttonNext);
    }

}
export class User {

    constructor(id_user, username, email, password, nome, cognome, data_reg) {
        this.id_user = id_user;
        this.username = username;
        this.email = email;
        this.password = password;
        this.nome = nome;
        this.cognome = cognome;
        this.data_reg = data_reg;
    }

}
export function createLoginVisible(){
    document.getElementById("CreateClubButton").style.visibility = "visible";
}
export function login() {
    const Menu = document.getElementById("Content");
    Menu.innerHTML = "";
    const bottoneProfilo = document.createElement("button");
    bottoneProfilo.textContent = "Profilo";
    bottoneProfilo.id = "ProfiloButton";
    const bottoneLogout = document.createElement("button");
    bottoneLogout.textContent = "Logout";
    bottoneLogout.id = "LogoutButton";

    Menu.appendChild(bottoneProfilo);
    Menu.appendChild(bottoneLogout);

}
export function logout() {
    document.getElementById("CreateClubButton").style.visibility = "hidden";
    console.log("test");
    const Menu = document.getElementById("Content");
    Menu.innerHTML = "";
    localStorage.removeItem("Utente");
    const bottoneLogin = document.createElement("button");
    bottoneLogin.textContent = "Login";
    bottoneLogin.id = "LoginButton";
    window.location.reload();
}
export class Membership {
    #id_user = null;
    #id_club = null;
}
export class EmptyClubClass {
    render() {
        const contenitore = document.getElementById("ClubSearchContainer");
        const emptyCard = document.createElement("div");
        emptyCard.classList.add("Card");
        emptyCard.innerHTML = 'c';
        emptyCard.style.visibility = "hidden";
        contenitore.appendChild(emptyCard);
    }
}
export class ClubClass {
    constructor(frequenzadiscussioni, id_club, linguaclub, nomeclub, numeropartecipantimax, tematicaclub) {
        this.id_club = id_club;
        this.frequenzadiscussioni = frequenzadiscussioni;
        this.nomeclub = nomeclub;
        this.tematicaClub = tematicaclub;
        this.linguaclub = linguaclub;
        this.numeropartecipantimax = numeropartecipantimax;
    }

    render() {
        let Card = document.createElement("div");
        Card.classList.add("Card");
        let FirstDiv = document.createElement("div");
        FirstDiv.classList.add("ElementContentColumn");
        let SecondDiv = document.createElement("div");
        FirstDiv.classList.add("ElementContentRow");
        let ThirdDiv = document.createElement("div");
        FirstDiv.classList.add("ElementContentRow");
        let firstP = document.createElement("p");
        firstP.style.position = "absolute";
        firstP.style.top = "0";
        firstP.style.left = "2vw";
        firstP.textContent = this.linguaclub;
        let FourthDiv = document.createElement("div");
        FirstDiv.classList.add("ElementContentRow");
        let secondP = document.createElement("p");
        secondP.style.top = "0";
        secondP.innerHTML = '&#9728';
        secondP.style.fontSize = "100px";
        secondP.style.margin = "0";
        let FifthDiv = document.createElement("div");
        FirstDiv.classList.add("ElementContentRow");
        let thirdP = document.createElement("p");
        thirdP.style.position = "absolute";
        thirdP.style.top = "0";
        thirdP.style.right = "2vw";
        thirdP.innerHTML = '12/' + this.numeropartecipantimax + '&#128110';
        let SixthDiv = document.createElement("div");
        SixthDiv.classList.add("ElementContentColumn");
        let header = document.createElement("h1");
        header.style.margin = "0";
        header.style.padding = "0";
        header.textContent = this.nomeclub;
        let fourthP = document.createElement("p");
        fourthP.style.margin = "0";
        fourthP.style.padding = "0";
        fourthP.textContent = "Paragrafo"
        let buttoneaccesso = document.createElement("button");
        buttoneaccesso.textContent = "Vedi";
        buttoneaccesso.addEventListener("click", () => {
            const urlcorrente = new URL("BookClubPage.html", window.location.origin);
            urlcorrente.searchParams.append("idClub", this.id_club);
            window.location.href = urlcorrente;
        })

        Card.appendChild(FirstDiv);
        FirstDiv.appendChild(SecondDiv);
        SecondDiv.appendChild(ThirdDiv);
        ThirdDiv.appendChild(firstP);
        SecondDiv.appendChild(FourthDiv);
        FourthDiv.appendChild(secondP);
        SecondDiv.appendChild(FifthDiv);
        FifthDiv.appendChild(thirdP);
        FirstDiv.appendChild(SixthDiv);
        SixthDiv.appendChild(header);
        SixthDiv.appendChild(fourthP);
        SixthDiv.appendChild(buttoneaccesso);
        document.getElementById("ClubSearchContainer").appendChild(Card);
    }
}

export class Eventi {
    #id_club = null;
    #nomeevento = null;
    #id_evento = null;
    #data_evento = null;
    #id_discussione = null;
}

export class Commenti {
    #id_commento = null;
    #testoCommento = null;
    #username = null;
    #id_risposta = null;
}

export class Calendario{
    constructor(eventi,CalendarID = "CalendarDaysID"){
        this.eventi = eventi;
        this.mesecorrente = new Date();
        this.CalendarID = CalendarID;
    }

    render(){
        const DivCalendariogiorni = document.getElementById("CalendarDaysID");
        for(let i = 1; i <= this.calcoloGiorniMese(); i++){
            const giorno = document.createElement("div");
            giorno.textContent = i;
            DivCalendariogiorni.appendChild(giorno);
            if(i === this.mesecorrente.getDate()){
                console.log(this.mesecorrente.getDate());
                giorno.classList.add("Active");
            }   
        }
    }

    calcoloGiorniMese(){
        const mese = this.mesecorrente.getMonth()+1;
        const DivCalendario = document.getElementById("NOOOOOOOOOOOO");
        switch(mese){
            case 1:
                DivCalendario.textContent = "Gennario";
                return 31;
            case 2:
                DivCalendario.textContent = "Febbraio";
                return 28;
            case 3:
                DivCalendario.textContent = "Marzo";
                return 31;
            case 4:
                DivCalendario.textContent = "Aprile";
                return 30;
            case 5:
                DivCalendario.textContent = "Maggio";
                return 31;
            case 6:
                DivCalendario.textContent = "Giugno";
                return 30;
            case 7:
                DivCalendario.textContent = "Luglio";
                return 31;
            case 8:
                DivCalendario.textContent = "Agosto";
                return 31;
            case 9:
                DivCalendario.textContent = "Settembre";
                return 30;   
            case 10:
                DivCalendario.textContent = "Ottobre";
                return 31;
            case 11:
                DivCalendario.textContent = "Novembre";
                return 30;
            case 12:
                DivCalendario.textContent = "Dicembre";
                return 31;

        }
        
    }

}