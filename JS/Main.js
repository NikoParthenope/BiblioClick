const NumericButtonID = document.getElementById("CalendarDaysID").querySelectorAll("div");
console.log(NumericButtonID);
const IndicatorPagination = document.getElementById("IndicatorPagin");
const ActivePaginationIndicator = document.querySelector(".Active");
const IndicatorPaginationPos = IndicatorPagination.getBoundingClientRect();

const NumericButtonIDActive = document.querySelector(".Active");
addEventListener("DOMContentLoaded", () =>{
    const ActivePos = NumericButtonIDActive.getBoundingClientRect();
    let offset = ActivePos.x - IndicatorPaginationPos.x;
    let offsetY = ActivePos.y - IndicatorPaginationPos.y + 10;
    IndicatorPagination.style.transform = "translate("+offset+"px,"+offsetY+"px)";
})
NumericButtonID.forEach((NumericButton) =>{
    NumericButton.addEventListener("mouseover", () =>{
        const NumericButtonIDPos = NumericButton.getBoundingClientRect();
        let offset = NumericButtonIDPos.x - IndicatorPaginationPos.x;
        let offsetY = NumericButtonIDPos.y - IndicatorPaginationPos.y + 10;
        ActivePaginationIndicator.style.backgroundColor = "transparent";
        IndicatorPagination.style.visibility = "visible";
        IndicatorPagination.style.transform = "translate("+offset+"px,"+offsetY+"px)";
        IndicatorPagination.style.transition = "0.1s ease-in-out"; 
    })
})
NumericButtonID.forEach((NumericButton) =>{
    NumericButton.addEventListener("mouseout", () =>{
        const ActivePos = NumericButtonIDActive.getBoundingClientRect();
        let offset = ActivePos.x - IndicatorPaginationPos.x;
        let offsetY = ActivePos.y - IndicatorPaginationPos.y + 10;

        IndicatorPagination.style.visibility = "hidden";
        IndicatorPagination.style.transform = "translate("+offset+"px,"+offsetY+"px)";
        IndicatorPagination.style.transition = "0.3s ease-in-out"; 
        if((IndicatorPaginationPos.x+(ActivePaginationIndicatorPos.x-IndicatorPaginationPos.x)) ===  ActivePaginationIndicatorPos.x){
            ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
        }
        if((IndicatorPaginationPos.y+(ActivePaginationIndicatorPos.y-IndicatorPaginationPos.y)) ===  ActivePaginationIndicatorPos.y){
            ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
        }
    })
})