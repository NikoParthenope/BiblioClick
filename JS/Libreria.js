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