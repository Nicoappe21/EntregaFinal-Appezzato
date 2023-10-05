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
let goles = 0
let atajados = 0

const sectionBienvenido = document.getElementById("bienvenido")
let sectionJugadores = document.getElementById("jugadores")
let sectionBotones = document.getElementById("botones-lista")
const botonComenzar = document.getElementById("comenzar")
const usuarioInput = document.getElementById("usuario")
const divSectionJugadores= document.getElementById("div-jugadores")
let nombreUsuario = document.getElementById("titulo-jugadores");
const seccionBotones = document.querySelector(".botones-lista");


function recargarPagina() {
    localStorage.clear()
    location.reload();
}

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
        Swal.fire({
            title: "Error",
            text: "Elige un nombre para comenzar",
            icon: "error",
            confirmButtonText: `Aceptar`
        });
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
    chequearEquipo()
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

function chequearEquipo(){
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
        Swal.fire({
            title: "Error",
            text: "No hay jugadores convocados aún",
            icon: "error",
            confirmButtonText: `Aceptar`
        })
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

function deshabilitarBotonesDireccion(jugador) { 
            const izquierdaJugador = document.getElementById(`izquierda${jugador.nombre}`)
            izquierdaJugador.disabled = true
            const derechaJugador = document.getElementById(`derecha${jugador.nombre}`)
            derechaJugador.disabled = true
            const medioJugador = document.getElementById(`medio${jugador.nombre}`)
            medioJugador.disabled = true
        }

function patear(jugador, direccion) {
    const valorDireccion = {
    Derecha: 1,
    Centro: 2,
    Izquierda: 3,
    };
    const resultado = document.getElementById("resultado")
    console.log(resultado)
    const numeroRandom = Math.floor(Math.random() * 3) + 1;
    let fraseJugador= document.getElementById(`frase${jugador.nombre}`)
    if (valorDireccion[direccion] === numeroRandom) {
        fraseJugador.innerText = "Atajo el arquero!"
        deshabilitarBotonesDireccion(jugador)
        atajados++
        resultado.innerText = `Goles ${goles} - ${atajados} Atajados`
        chequearResultado() 
        
    } else {
        fraseJugador.innerText = "GOL!"
        deshabilitarBotonesDireccion(jugador) 
        goles++
        resultado.innerText = `Goles ${goles} - ${atajados} Atajados`
        chequearResultado() 
    }       
} 

function chequearResultado(){
    if (goles+atajados == 5 && goles > atajados){
        Swal.fire({
            title: `Ganaste ${goles} a ${atajados}`,
            text: "Somos los campeones! ",
            icon: "success",
            confirmButtonText: `Aceptar`
        })
    } else if(goles + atajados == 5 && goles< atajados) {
        Swal.fire({
            title: `Perdiste ${atajados} a ${goles}`,
            text: "Puedes intentarlo de nuevo",
            icon: "error",
            confirmButtonText: `Aceptar`
        })
    }
}

function confirmarEquipo() {
    if (jugadoresElegidos.length < 5) {
        Swal.fire({
            title: "Error",
            text: "Elige 5 jugadores para tu equipo",
            icon: "error",
            confirmButtonText: `Aceptar`
        })
    } else {
    divSectionJugadores.style.display = "none";
    nombreUsuario.style.display = "none";
    seccionBotones.style.display = "none";
    const equipoInfo = document.getElementById("equipo-info");
    equipoInfo.innerHTML = "¡ES HORA DE PATEAR! ELIGE DONDE PATEAR TU PENAL, SI CONVIERTES AL MENOS 3 PENALES, SERAS EL CAMPEÓN. ¡MUCHA SUERTE!";
    const listaJugadores = document.createElement("ul");
    jugadoresElegidos.forEach(function (jugador) {
        const jugadorItem = document.createElement("li");
        const botonIzquierda = document.createElement("button");
        const botonMedio = document.createElement("button");
        const botonDerecha = document.createElement("button");
        const fraseJugador = document.createElement("h2");
        fraseJugador.className = "frase-jugador"
        fraseJugador.id = `frase${jugador.nombre}`

        botonIzquierda.textContent = "Izquierda";
        botonIzquierda.className = `${jugador.nombre} boton-patear`;
        botonIzquierda.id =`izquierda${jugador.nombre}`
        botonIzquierda.addEventListener("click", function () {
            patear(jugador, "Izquierda"); 
        });

        botonMedio.textContent = "Medio";
        botonMedio.className = `${jugador.nombre} boton-patear`;
        botonMedio.id =`medio${jugador.nombre}`
        botonMedio.addEventListener("click", function () {
            patear(jugador, "Medio"); 
        });

        botonDerecha.textContent = "Derecha";
        botonDerecha.className = `${jugador.nombre} boton-patear`;
        botonDerecha.id =`derecha${jugador.nombre}`
        botonDerecha.addEventListener("click", function () {
            patear(jugador, "Derecha"); 
        });
        jugadorItem.textContent = `${jugador.nombre}`;
        jugadorItem.appendChild(botonIzquierda);
        jugadorItem.appendChild(botonMedio);
        jugadorItem.appendChild(botonDerecha);
        jugadorItem.appendChild(fraseJugador)
        listaJugadores.appendChild(jugadorItem);
    });
    const resultado = document.createElement("h1")
    resultado.id= "resultado"
    resultado.innerText = `Goles ${goles} - ${atajados} Atajados ` 
    const botonReiniciar = document.createElement("button")
    botonReiniciar.className = "boton-reiniciar"
    botonReiniciar.textContent = `Reiniciar`
    botonReiniciar.addEventListener(`click`,recargarPagina)
    equipoInfo.appendChild(listaJugadores);
    equipoInfo.appendChild(resultado)
    equipoInfo.appendChild(botonReiniciar);
    Swal.fire({
        title: "Vamos!",
        text: "Tus pateadores estan listos",
        icon: "success",
        confirmButtonText: `Aceptar`
    });
    }
}

paginaInicial()
