document.addEventListener('DOMContentLoaded',function(){
    "use strict";
    generarCaptcha();

    let resultado = document.querySelector('#resultado');

    let form = document.querySelector("#formulario_captcha");
    form.addEventListener ('submit', function(e){
        e.preventDefault();
        verificarCaptcha();
    });

    function verificarCaptcha(){
        let ingresado= document.querySelector ('#ingresado').value;
        let textcaptcha = document.querySelector('#textCaptcha').innerHTML;
        if (ingresado===textcaptcha){
            resultado.innerHTML='Se ha ingresado correctamente, será contactado en los próximos días.';
        }
        else{
            resultado.innerHTML='Ha ingresado incorrectamente el captcha, intentelo de vuelta.';
            generarCaptcha();
        }
    }
    function generarCaptcha(){
        let captcha = document.querySelector('#textCaptcha');
        let num= Math.floor(Math.random()*6)+1;
        switch(num){
            case 1: captcha.innerHTML= 'Ep5FGy79bj';break; 
            case 2: captcha.innerHTML='w2eRp91DF3o';break;
            case 3: captcha.innerHTML='fXrZTtfg2o';break;
            case 4: captcha.innerHTML='pWQh5o7s0o';break;
            case 5: captcha.innerHTML='eJRa33sc6m';break;
            case 6:captcha.innerHTML='w54rgRSIlas';break;
        }
    }
});
