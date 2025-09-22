import { Indicator } from "./Libreria.js";

const IndicatorPagination = new Indicator("NumericButtonID","button","IndicatorPagin",".Active",0,-10);
IndicatorPagination.HoverMouse();
IndicatorPagination.NotHoverMouse();

addEventListener("DOMContentLoaded", () =>{
    IndicatorPagination.SetOnActive();
})