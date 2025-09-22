import { Indicator } from "./Libreria.js";

const IndicatorCalendar = new Indicator("CalendarDaysID","div","IndicatorePagina",".Active",0,10);
IndicatorCalendar.HoverMouse();
IndicatorCalendar.NotHoverMouse();

addEventListener("DOMContentLoaded", () =>{
    IndicatorCalendar.SetOnActive();
})