class Jugador{
    constructor(nombre,posicion,equipo){
        this.nombre = nombre;
        this.posicion = posicion;
        this.equipo = equipo
    }
}
const jugadores= [
    {
        nombre: `L.Messi`,
        posicion: `Delantero`,
        equipo: `Inter Miami`,
        elegido: false
    },
    {
        nombre: `J.Alvarez`,
        posicion: `Delantero`,
        equipo: `Manchester City`,
        elegido: false
    },
    {
        nombre: `E.Fernandez`,
        posicion: `Mediocampista`,
        equipo: `Chelsea`,
        elegido: false
    },
    {
        nombre: `R.De Paul`,
        posicion: `Mediocampista`,
        equipo: `Atletico Madrid`,
        elegido: false
    },
    {
        nombre: `A.MacAllister`,
        posicion: `Mediocampista`,
        equipo: `Liverpool`,
        elegido: false
    },
    {
        nombre: `C.Romero`,
        posicion: `Defensor`,
        equipo: `Tottenham`,
        elegido: false
    },
    {
        nombre: `E.Martinez`,
        posicion: `Arquero`,
        equipo: `Aston Villa`,
        elegido: false
    },
    {
        nombre: `N.Tagliafico`,
        posicion: `Defensor`,
        equipo: `O.Marsella`,
        elegido: false
    },
    {
        nombre: `N.Molina`,
        posicion: `Defensor`,
        equipo: `Atletico Madrid`,
        elegido: false
    },
    {
        nombre: `A.Di Maria`,
        posicion: `Delantero`,
        equipo: `Benfica`,
        elegido: false
    },
]
let jugadoresElegidos= []
let jugadoresRivales= []



let sectionBienvenido = document.getElementById("bienvenido")
let sectionJugadores = document.getElementById("jugadores")
let sectionBotones = document.getElementById("botones-lista")
const botonComenzar = document.getElementById("comenzar")
const usuarioInput = document.getElementById("usuario")
const divSectionJugadores= document.getElementById("div-jugadores")




function paginaInicial() {
    botonComenzar.addEventListener("click", iniciarJuego);
    const equipoStorage = localStorage.getItem("jugadoresElegidos");
    if (equipoStorage) {
        jugadoresElegidos = JSON.parse(equipoStorage);
        jugadoresElegidos.forEach((jugador) => {
            const idx = jugadores.findIndex((item) => item.nombre === jugador.nombre);
            if (idx !== -1) {
                const botonConvocar = document.querySelectorAll(".convocar")[idx];
                botonConvocar.disabled = true;
            }
        });
    }
}

function chequearEquipo(){
    let botonConvocar = document.getElementsByClassName("convocar")
    jugadoresElegidos.length < 4 ? botonConvocar.disabled : botonConvocar.disabled = false 
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
    const equipoInfo = document.getElementById("equipo-info");
    equipoInfo.innerHTML = "ESTE ES TU EQUIPO";
    const listaJugadores = document.createElement("ul");
    jugadoresElegidos.forEach(function (jugador) {
        const jugadorItem = document.createElement("li");
        jugadorItem.textContent = `${jugador.nombre} (${jugador.posicion}) - ${jugador.equipo}`;
        listaJugadores.appendChild(jugadorItem);
    });
    equipoInfo.appendChild(listaJugadores);
    alert("Equipo confirmado")
} 
}
function iniciarJuego() {
    let usuario = usuarioInput.value;
    if (usuario === "") {
        alert("Escribe un nombre para comenzar");
    } else {
        sectionBienvenido.style.display = "none";
        let nombreUsuario = document.getElementById("titulo-jugadores");
        nombreUsuario.innerText = ` Bienvenido ${usuario}, ahora eres el DT, elige a tus 5 jugadores`;

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

        const seccionBotones = document.querySelector(".botones-lista");

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

paginaInicial()