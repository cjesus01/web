document.addEventListener('DOMContentLoaded',function(e){
"use strict";
let btn=document.querySelector(".abrir_menu");
btn.addEventListener ('click',Clase);

let btncerrar=document.querySelector(".cerrar_menu");
btncerrar.addEventListener('click',Clase);

function Clase(){
    document.querySelector(".barra_navegacion").classList.toggle("mostrar_nav");
}
}) 