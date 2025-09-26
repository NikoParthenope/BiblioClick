export class Indicator{
    constructor(ElementsID,ElementsType,IndicatorObjectID,DefaultActiveObject,OffSetUdjustX, OffSetUdjustY){
        this.Elements = document.getElementById(ElementsID).querySelectorAll(ElementsType);
        this.Indicator = document.getElementById(IndicatorObjectID);
        this.ActiveObject = document.querySelector(DefaultActiveObject);
        this.RectActiveObject = this.ActiveObject.getBoundingClientRect();
        this.IndicatorPosition = this.Indicator.getBoundingClientRect();
        this.OffSetUdjustX = OffSetUdjustX;
        this.OffSetUdjustY = OffSetUdjustY;
    }
    SetOnActive(){
        let offset = this.ActiveObject.x - this.IndicatorPosition.x + this.OffSetUdjustX;
        let offsetY = this.ActiveObject.y - this.IndicatorPosition.y + this.OffSetUdjustY;
        this.ActiveObject.style.transform = "translate("+offset+"px,"+offsetY+"px)";
    }
    HoverMouse(){
        this.Elements.forEach((Element) =>{
            Element.addEventListener("mouseover", () =>{
                const ElementPos = Element.getBoundingClientRect();
                let offset = ElementPos.x - this.IndicatorPosition.x + this.OffSetUdjustX;
                let offsetY = ElementPos.y - this.IndicatorPosition.y + this.OffSetUdjustY;
                this.ActiveObject.style.backgroundColor = "transparent";
                this.Indicator.style.visibility = "visible";
                this.Indicator.style.transform = "translate("+offset+"px,"+offsetY+"px)";
                this.Indicator.style.transition = "0.1s ease-in-out"; 
            })
        })
    }
    NotHoverMouse(){
        this.Elements.forEach((Element) =>{
            Element.addEventListener("mouseout", () =>{
            let offset = this.RectActiveObject.x - this.IndicatorPosition.x + this.OffSetUdjustX;
            let offsetY = this.RectActiveObject.y - this.IndicatorPosition.y+ this.OffSetUdjustY;

            this.Indicator .style.visibility = "hidden";
            this.Indicator .style.transform = "translate("+offset+"px,"+offsetY+"px)";
            this.Indicator .style.transition = "0.3s ease-in-out"; 
            if((this.IndicatorPosition.x+(this.ActiveObject.x-this.IndicatorPosition.x)) ===  this.ActiveObject.x){
                ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
            }
            if((this.IndicatorPosition.y+(this.ActiveObject.y-this.IndicatorPosition.y)) ===  this.ActiveObject.y){
                ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
            }
        })
})
    }
}
export function CreateCardClub(Clubs){
    Clubs.forEach(Club =>{
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
                firstP.style.left="2vw";
                firstP.textContent = Club.linguaclub;
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
                thirdP.style.right="2vw";
                thirdP.innerHTML = '12/'+Club.numeropartecipantimax+'&#128110';
                let SixthDiv = document.createElement("div");
                SixthDiv.classList.add("ElementContentColumn");
                let header = document.createElement("h1");
                header.style.margin = "0";
                header.style.padding = "0";
                header.textContent = Club.nomeclub;
                let fourthP = document.createElement("p");
                fourthP.style.margin = "0";
                fourthP.style.padding = "0";
                fourthP.textContent = "Paragrafo"
                let buttoneaccesso = document.createElement("button");
                buttoneaccesso.textContent = "Richiedi Accesso";
                
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
    })
}
export class Pagination{
    constructor(Element){
        this.Card = Element;
        this.numberOfElement = 6;
        this.CurrentElement = 1;
        this.Pages = Math.round(Object.keys(Element).length / this.numberOfElement)+1;
        this.NumberOfElements = Object.keys(Element).length
    }

    render(){
        this.renderButton();
        this.renderCard();
    } 
    renderCard(){
        const contenitore = document.getElementById("ClubSearchContainer");
        CreateCardClub(this.Card);
        console.log(this.NumberOfElements);
        if(this.NumberOfElements < 6){
            for(let i = 0; i < (6-this.NumberOfElements); i++){
                console.log("test");
                const emptyCard = document.createElement("div");
                emptyCard.classList.add("Card");
                emptyCard.innerHTML = 'c';
                emptyCard.style.visibility = "hidden";
                contenitore.appendChild(emptyCard);
            }
        }
    }
    renderButton(){
        let NumericButton = document.getElementById("NumericButtonID");
        NumericButton.innerHTML = '';
        const Indicator = document.createElement("div");
        Indicator.id="IndicatorPagin";
        Indicator.style.visibility= "hidden";
        Indicator.style.alignItems = "center";
        Indicator.style.display = "flex";
        NumericButton.appendChild(Indicator);
        const Pallina = document.createElement("div");
        Pallina.classList.add("IndicatorGlass");
        Pallina.classList.add("GlassColor");
        Pallina.style.width ="45px";
        Pallina.style.height="45px";
        Indicator.appendChild(Pallina);
        
        const buttonBack = document.createElement("button");
        buttonBack.textContent = '<';
        NumericButton.appendChild(buttonBack);
        for(let i = 1; i < this.Pages+1; i++){
            const buttone = document.createElement("button");
            buttone.id="ButtoneN"+i;
            buttone.textContent = i;
            if(i === 1){
                buttone.classList.add("Active");
            }
            NumericButton.appendChild(buttone);
            
        }
        const buttonNext = document.createElement("button");
        buttonNext.textContent = '>';
        NumericButton.appendChild(buttonNext);
    }

}
export class User{
    #id_user = null;
    #username = null;
    #email = null;
    #password = null;
    #nome = null;
    #cognome = null;
    #data_reg = null;
    constructor(){
        this.isLoggined = false;
    }

}

export class Membership{
    #id_user = null;
    #id_club = null;
}

export class Club{
    #id_club = null;
    #nomeclub = null;
    #numeropartecipantimax = null;
    #linguaclub = null;
    #frequenzadiscussioni = null;
    #tematicaClub = null;
}

export class Eventi{
    #id_club = null;
    #nomeevento = null;
    #id_evento = null;
    #data_evento = null;
    #id_discussione = null;
}

export class Commenti{
    #id_commento = null;
    #testoCommento = null;
    #username = null;
    #id_risposta = null;
}