class Indicator{
    constructor(ElementsID,ElementsType,IndicatorObjectID,DefaultActiveObject){
        this.Elements = document.getElementById(ElementsID).querySelectorAll(ElementsType);
        this.Indicator = document.getElementById(IndicatorObjectID);
        this.ActiveObject = document.querySelector(DefaultActiveObject);
        this.RectActiveObject = this.ActiveObject.getBoundingClientRect();
        this.IndicatorPosition = this.Indicator.getBoundingClientRect();
    }
    SetOnActive(){
        let offset = this.ActiveObject.x - this.IndicatorPosition.x;
        let offsetY = this.ActiveObject.y - this.IndicatorPosition.y + 10;
        this.ActiveObject.style.transform = "translate("+offset+"px,"+offsetY+"px)";
    }
    HoverMouse(){
        this.Elements.forEach((Element) =>{
            Element.addEventListener("mouseover", () =>{
                const ElementPos = Element.getBoundingClientRect();
                let offset = ElementPos.x - this.IndicatorPosition.x;
                let offsetY = ElementPos.y - this.IndicatorPosition.y + 10;
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
            let offset = this.RectActiveObject.x - this.IndicatorPosition.x;
            let offsetY = this.RectActiveObject.y - this.IndicatorPosition.y + 10;

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
const IndicatorCalendar = new Indicator("CalendarDaysID","div","IndicatorePagina",".Active");
IndicatorCalendar.HoverMouse();
IndicatorCalendar.NotHoverMouse();

addEventListener("DOMContentLoaded", () =>{
    IndicatorCalendar.SetOnActive();
})