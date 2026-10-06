let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=40;
const ALTURA_PERSONAJE=80;
const ANCHO_PERSONAJE=60;
const ANCHO_LIMON=40;
const ALTO_LIMON=40;


let personajeIzquierda=canvas.width/2;

let limonX=canvas.width/2;
let limonY=0;

let vidas = 3;
let puntaje = 0;

let velocidadCaida = 200;

let intervalo;

function cargarInicio(){
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    mostrarVidas();
    mostrarPuntaje();
    iniciar();
}
function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeIzquierda,canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE),ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}
function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);  
}
//----------------------------------------------------------------------------------------------------------------
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
//----------------------------------------------------------------------------------------------------------------
function moverIzquierda(){
    personajeIzquierda=personajeIzquierda-20;
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}
function moverDerecha(){
    personajeIzquierda=personajeIzquierda+20;
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}
function reiniciar(){

    clearInterval(intervalo);
    personajeIzquierda=canvas.width/2;
    limonY=0;

    vidas=3;
    puntaje=0;
    velocidadCaida=200;

    mostrarVidas();
    mostrarPuntaje();
    
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();

    iniciar();
}

function bajarLimon(){
    limonY=limonY+20;
    
    detectarPiso();
    detectarAtrapado();

    limpiarCanvas();
    dibujarLimon();
    dibujarSuelo();
    dibujarPersonaje();
 
}
function subirLimon(){
    limonY=limonY-20;
    limpiarCanvas();
    dibujarLimon();
    dibujarSuelo();
    dibujarPersonaje();
 
}
//---------------------------------------------------
function mostrarVidas(){
    let componenteVidas = document.getElementById("txtVidas");
    componenteVidas.innerText = vidas;
}

function mostrarPuntaje(){
    let componentePuntaje = document.getElementById("txtPuntaje");
    componentePuntaje.innerText = puntaje;
}

function detectarPiso(){
    if(limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO){
        vidas = vidas - 1;
        mostrarVidas();
        if(vidas == 0){
            clearInterval(intervalo);
            alert("GAME OVER");
        }

        limonY = 0;
    }
}
//----------------------------------------------------------------

function detectarAtrapado(){
    if(
        limonY + ALTO_LIMON >= canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE)
        &&
        limonX + ANCHO_LIMON >= personajeIzquierda
        &&
        limonX <= personajeIzquierda + ANCHO_PERSONAJE
    ){
        puntaje = puntaje + 1;
        mostrarPuntaje();

        if(puntaje == 3){
            velocidadCaida = 150;
            clearInterval(intervalo);
            iniciar();
        }

        if(puntaje == 6){
            velocidadCaida = 100;
            clearInterval(intervalo);
            iniciar();
        }

        if(puntaje == 10){
            clearInterval(intervalo);
            alert("GANASTE");
        }

        limonY = 0;
    }
}

function iniciar(){
    intervalo = setInterval(bajarLimon, velocidadCaida);
}