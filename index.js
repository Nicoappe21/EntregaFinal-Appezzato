class Jugador{
    constructor(nombre,posicion,equipo){
        this.nombre = nombre;
        this.posicion = posicion;
        this.equipo = equipo
    }
}

let jugadores = []
fetch(`plantel.json`)
    .then(res => res.json())
    .then(data =>{
        jugadores = data
    })


let jugadoresElegidos= []
let jugadoresRivales= []



const sectionBienvenido = document.getElementById("bienvenido")
let sectionJugadores = document.getElementById("jugadores")
let sectionBotones = document.getElementById("botones-lista")
const botonComenzar = document.getElementById("comenzar")
const usuarioInput = document.getElementById("usuario")
const divSectionJugadores= document.getElementById("div-jugadores")
let nombreUsuario = document.getElementById("titulo-jugadores");
const seccionBotones = document.querySelector(".botones-lista");


function paginaInicial() {
    botonComenzar.addEventListener("click", iniciarJuego);
    const equipoStorage = localStorage.getItem("jugadoresElegidos");
    if (equipoStorage) {
        jugadoresElegidos = JSON.parse(equipoStorage);
        jugadoresElegidos.forEach((jugador) => {
            const idx = jugadores.findIndex((item) => item.nombre === jugador.nombre);
            if (idx !== -1) {
                const botonConvocar = document.getElementsByClassName("convocar");
                botonConvocar.disabled = true;
            }
        });
    }
}

function iniciarJuego() {

    let usuario = usuarioInput.value;
    if (usuario === "") {
        alert("Escribe un nombre para comenzar");
    } else {
        sectionBienvenido.style.display = "none";
        
        nombreUsuario.innerText = ` Bienvenido ${usuario}, ahora eres el DT, elige 5 jugadores para patear los penales`;

        jugadores.forEach(function (jugador, index) {
            const cartaJugador = document.createElement("div");
            cartaJugador.className = "carta-jugador";

            cartaJugador.innerHTML = `
            <h2>${jugador.nombre}</h2>
            <h3>${jugador.posicion}</h3>
            <h3>${jugador.equipo}</h3>
            <button class="convocar">Convocar</button>
            `;

            const botonConvocar = cartaJugador.querySelector("button");
            if (jugadoresElegidos.some((elegido) => elegido.nombre === jugador.nombre)) {
                botonConvocar.disabled = true;
            }
            if (jugador.elegido) {
                botonConvocar.disabled = true;
            } else {
                botonConvocar.addEventListener("click", function () {
                    convocarJugador(index, botonConvocar);
                });
            }
            divSectionJugadores.appendChild(cartaJugador);
        });

        const botonVerEquipo = document.createElement("button");
        botonVerEquipo.textContent = "Ver Equipo";
        botonVerEquipo.id = "VerEquipo";

        const botonConfirmarEquipo = document.createElement("button");
        botonConfirmarEquipo.textContent = "Confirmar Equipo";
        botonConfirmarEquipo.id = "confirmar";

        const botonVolverAEmpezar = document.createElement("button");
        botonVolverAEmpezar.textContent = "Volver a empezar";
        botonVolverAEmpezar.id = "reset";

        seccionBotones.appendChild(botonVerEquipo);
        seccionBotones.appendChild(botonConfirmarEquipo);
        seccionBotones.appendChild(botonVolverAEmpezar);
        botonVolverAEmpezar.addEventListener("click", resetear);
        botonVerEquipo.addEventListener("click", mostrarEquipo);
        botonConfirmarEquipo.addEventListener("click", confirmarEquipo);
    }
}

function chequearEquipo(){
    let botonConvocar = document.getElementsByClassName("convocar")
    jugadoresElegidos.length >= 5 ? botonConvocar.disabled : botonConvocar.disabled = false 
}

function convocarJugador(idx, botonConvocar) {
    const jugador = jugadores[idx];
    if (!jugador.elegido && jugadoresElegidos.length < 5) {
        jugadoresElegidos.push(jugador);
        jugador.elegido = true;
        botonConvocar.disabled = true; 
    }
    if (jugadoresElegidos.length >= 5) {
        const botonesConvocar = document.querySelectorAll(".convocar");
        botonesConvocar.forEach((boton) => {
            boton.disabled = true;
        });
    }
    localStorage.setItem("jugadoresElegidos", JSON.stringify(jugadoresElegidos))
}

function resetear() {
    jugadores.forEach((jugador) => {
        jugador.elegido = false;
    });

    jugadoresElegidos = [];

    const botonesConvocar = document.querySelectorAll(".convocar");
    botonesConvocar.forEach((boton) => {
        boton.disabled = false;
    });

    localStorage.removeItem("jugadoresElegidos");

    const equipoInfo = document.getElementById("equipo-info");
    equipoInfo.innerHTML = "";
}
function mostrarEquipo() {
    if (jugadoresElegidos.length === 0){
        alert ("No hay jugadores convocados aún")
    }
    else {
    const equipoInfo = document.getElementById("equipo-info");
    equipoInfo.innerHTML = "";
    const listaJugadores = document.createElement("ul");
    jugadoresElegidos.forEach(function (jugador) {
        const jugadorItem = document.createElement("li");
        jugadorItem.textContent = `${jugador.nombre} (${jugador.posicion}) - ${jugador.equipo}`;
        listaJugadores.appendChild(jugadorItem);
    });
    equipoInfo.appendChild(listaJugadores);
}
}
function confirmarEquipo(){
    
    
    if (jugadoresElegidos.length < 5){
        alert("Elige 5 jugadores para tu equipo")
    } else {
    divSectionJugadores.style.display = "none"
    nombreUsuario.style.display = "none"
    seccionBotones.style.display= "none"
    const equipoInfo = document.getElementById("equipo-info");
    equipoInfo.innerHTML = "Es el momento de la verdad, elige donde patear cada penal";
    const listaJugadores = document.createElement("ul");
    jugadoresElegidos.forEach(function (jugador) {
        const jugadorItem = document.createElement("li");
        jugadorItem.textContent = `${jugador.nombre}`;
        const botonIzquierda = document.createElement("button")
        botonIzquierda.className = "boton-patear"
        botonIzquierda.innerText = "Izquierda"
        jugadorItem.appendChild(botonIzquierda)
        const botonMedio = document.createElement("button")
        botonMedio.className = "boton-patear"
        botonMedio.innerText = "Medio"
        jugadorItem.appendChild(botonMedio)
        const botonDerecha = document.createElement("button") 
        botonDerecha.className = "boton-patear"
        botonDerecha.innerText = "Derecha"
        jugadorItem.appendChild(botonDerecha)
        listaJugadores.appendChild(jugadorItem);
    });
    equipoInfo.appendChild(listaJugadores);
    alert("Equipo confirmado")
} 
}


paginaInicial()
git status