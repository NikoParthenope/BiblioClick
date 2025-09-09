const NumericButtonID = document.getElementById("NumericButtonID").querySelectorAll("button");
const IndicatorPagination = document.getElementById("IndicatorPagin");
const ActivePaginationIndicator = document.querySelector(".Active");
const IndicatorPaginationPos = IndicatorPagination.getBoundingClientRect();

NumericButtonID.forEach((NumericButton) =>{
    NumericButton.addEventListener("mouseover", () =>{
        const NumericButtonIDPos = NumericButton.getBoundingClientRect();
        let offset = NumericButtonIDPos.x - IndicatorPaginationPos.x;
        ActivePaginationIndicator.style.backgroundColor = "transparent";
        IndicatorPagination.style.visibility = "visible";
        IndicatorPagination.style.transform = "translateX("+offset+"px)";
        IndicatorPagination.style.transition = "0.5s ease-in-out"; 
    })
})
NumericButtonID.forEach((NumericButton) =>{
    NumericButton.addEventListener("mouseout", () =>{
        const ActivePaginationIndicatorPos = ActivePaginationIndicator.getBoundingClientRect();
        let offset = ActivePaginationIndicatorPos.x - IndicatorPaginationPos.x;

        IndicatorPagination.style.visibility = "hidden";
        IndicatorPagination.style.transform = "translateX("+offset+"px)";
        IndicatorPagination.style.transition = "0.5s ease-in-out"; 
        if((IndicatorPaginationPos.x+(ActivePaginationIndicatorPos.x-IndicatorPaginationPos.x)) ===  ActivePaginationIndicatorPos.x){
            ActivePaginationIndicator.style.backgroundColor = "hsl(0,0%,70%,0.3)";
        }
    })
})