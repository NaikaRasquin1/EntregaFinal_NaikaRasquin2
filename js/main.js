var precioDia = 1600;// temporal
var miliDia = 25000;// temporal 
const reservas = [];
const reservasConfirmadas = JSON.parse(localStorage.getItem("reservasConfirmadas")) || [];

// Elementos del DOM
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const numero = document.getElementById("telefono");
const entradaInput = document.getElementById("fechaEntrada");
const salidaInput = document.getElementById("fechaSalida");
const precioTotal = document.getElementById("total");
const formReserva = document.getElementById("formReserva");
let listaReservas = document.getElementById("listaReservas");

// Variables para validación
let nombreValido;
let apellidoValido;
let numeroValido;
let entradaValido 
let salidaValido;


function fechaFormateada(date) {
    if (date instanceof Date && !isNaN(date)) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        return ''; // or any default value you prefer for invalid dates
    }
}

document.addEventListener("DOMContentLoaded", function () {
    reservasInicio();
})
const reservasInicio = () => {
    if (reservasConfirmadas.length >= 1) {
        listaReservas.innerHTML = "";
        mostrarReservasConfirmadas();
    } else {
        let reservaNula = document.createElement("li");
        reservaNula.innerHTML = "Todavia no ha realizado su reserva";
        reservaNula.classList.add("datoReserva")
        listaReservas.appendChild(reservaNula);
    }
}


let botonReserva = document.getElementById("btn-reserva");
botonReserva.addEventListener("click", function (e) {
    e.preventDefault();
    if (nombreValido && numeroValido && entradaValido) {
        if (reservaVacia() && reservaConfirmadaVacia()) {
            crearReserva();
            mostrarReservas();
            precioReserva();
            limpiarForm(formReserva);
     

        } else {
            alert("Antes de realizar una nueva reserva borre su reserva anterior")
        }
    } else {
        validarEntrada();
        validarSalida();
        validarNombre();
        
        validarNumero();
        alert("Asegurese de completar correctamente los campos")
    }
})
const crearReserva = () => {

    let entrada = new Date(entradaInput.value);
    let salida = new Date(salidaInput.value);

    const reserva1 = new Reserva(nombre.value,apellido.value, numero.value, entrada, salida);

    reservas.push(reserva1);
}

const limpiarForm = (form) => {
    form.reset();
}

const mostrarReservas = () => {
    listaReservas.innerHTML = "";

    for (let i = 0; i < reservas.length; i++) {

        let ReservaNombre = document.createElement("li");
        ReservaNombre.classList.add("datoReserva")
        ReservaNombre.innerHTML = "NOMBRE: " + reservas[i].nombre;
        listaReservas.appendChild(ReservaNombre);

        let ReservaApellido = document.createElement("li");
        ReservaApellido.classList.add("datoReserva")
        ReservaApellido.innerHTML = "APELLIDO: " + reservas[i].apellido;
        listaReservas.appendChild(ReservaApellido);

        let ReservaNumero = document.createElement("li");
        ReservaNumero.classList.add("datoReserva")
        ReservaNumero.innerHTML = "NUMERO: " + reservas[i].numero;
        listaReservas.appendChild(ReservaNumero);

        let ReservaEntrada = document.createElement("li");
        ReservaEntrada.classList.add("datoReserva");
        let mostrarEntrada = fechaFormateada(reservas[i].entrada);
        ReservaEntrada.innerHTML = "ENTRADA : " + mostrarEntrada;
        listaReservas.appendChild(ReservaEntrada);
       
        let ReservaSalida = document.createElement("li");
        ReservaSalida.classList.add("datoReserva")
        let mostrarSalida = fechaFormateada(reservas[i].salida);
        ReservaSalida.innerHTML = "SALIDA: " + mostrarSalida;
        listaReservas.appendChild(ReservaSalida);


    }

        let botonesReservas = document.getElementById("botonesReservas");
        let borrarReservaBtn = document.createElement("button");
        borrarReservaBtn.innerHTML = "Eliminar Reserva";
        borrarReservaBtn.classList.add("eliminarReserva");
        botonesReservas.appendChild(borrarReservaBtn);
        borrarReservaBtn.addEventListener("click", function () {
        borrarReserva(0);
    })

        let confirmarReservaBtn = document.createElement("button");
        confirmarReservaBtn.innerHTML = "Confirmar Reserva";
        confirmarReservaBtn.classList.add("confirmarReserva");
        confirmarReservaBtn.addEventListener("click", function () {
        confirmarReserva();
    })
        botonesReservas.appendChild(confirmarReservaBtn);
}
    const precioReserva = () => {
    let diferenciaFechas = reservas[0].salida - reservas[0].entrada;
    let diasReserva = diferenciaFechas / miliDia;
    let totalReserva = diasReserva * precioDia;
    precioTotal.innerHTML = "El precio total de su reserva es: $" + totalReserva;
}


const borrarReserva = (index) => {

    Swal.fire({
        title: '¿Estas seguro que quieres borrar esta reserva?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: "red",
        cancelButtonText: `No`,
        customClass: {
            actions: "botonesAlerta"
        }
    }).then ((result) => {
        if (result.isConfirmed) {
            reservas.splice(index, 1);
            listaReservas.innerHTML = "";
            botonReserva.innerHTML = "";
            precioTotal.innerHTML = "";
            reservaVacia();
            reservasInicio();
        }
    })
}

const confirmarReserva = () => {
    Swal.fire({
        title: '¿Estas seguro que quieres confirmar esta reserva?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: "green",
        cancelButtonText: `No`,
        customClass: {
            actions: "botonesAlerta"
        }
    }).then ((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("reservasConfirmadas", JSON.stringify(reservas));
            Swal.fire ({
                title: "Su reserva fue confirmada con exito",
                icon: "success",
                confirmButtonColor: "green",
            }).then (() => {
                window.location.reload();
            })
        }
    })
}

///Funciones de validacion de inputs
nombre.addEventListener("change", function () {
    validarNombre();
});

apellido.addEventListener("change", function () {
    validarApellido();
});

numero.addEventListener("change", function () {
    validarNumero();
})
entradaInput.addEventListener("change", function () {
    validarEntrada();
})
const validarNumero = () => {
    let regexNumero = /^\+?\d{10,13}$/;
    let numeroTest = regexNumero.test(numero.value);
    if (!numeroTest) {
        numero.classList.add("noValid");
        numeroValido = false;
    } else {
        numero.classList.remove("noValid");
        numeroValido = true;
    }
}

const validarNombre = () => {

    let regexNombre = /^[a-zA-Z]+\s?[a-zA-Z]*$/;
    let nombreTest = regexNombre.test(nombre.value);
    if (!nombreTest) {
        nombre.classList.add("noValid");
        nombreValido = false;
    } else {
        nombre.classList.remove("noValid");
        nombreValido = true;
    }

}

const validarApellido = () => {

    let regexApellido = /^[a-zA-Z]+\s?[a-zA-Z]*$/;
    let apellidoTest = regexApellido.test(apellido.value);
    if (!apellidoTest) {
        apellido.classList.add("noValid");
        apellidoValido = false;
    } else {
        apellido.classList.remove("noValid");
        apellidoValido = true;
    }

}

const validarEntrada = () => {
    let regexEntrada = /^\d{4}-\d{2}-\d{2}$/;
    let entradaTest = regexEntrada.test(entradaInput.value);
    if (!entradaTest) {
        entradaInput.classList.add("noValid");
        entradaValido = false;
    } else {
        entradaInput.classList.remove("noValid");
        entradaValido = true;
    }
}

const validarSalida = () => {
    let regexSalida = /^\d{4}-\d{2}-\d{2}$/;
    let salidaTest = regexSalida.test(salidaInput.value);
    if (!salidaTest) {
        salidaInput.classList.add("noValid");
        salidaValido = false;
    } else {
        salidaInput.classList.remove("noValid");
        salidaValido = true;
    }
}

/// Validacion reserva vacia

const reservaVacia = () => {
    let reservaStatus;
    if (reservas.length >= 1) {
        reservaStatus = false;
    } else {
        reservaStatus = true;
    } return reservaStatus;
}
const reservaConfirmadaVacia = () => {
    let reservaStatus2;
    if (reservasConfirmadas.length >= 1) {
        reservaStatus2 = false;
    }else {
        reservaStatus2 = true;
    } return reservaStatus2;
}

/// Mostrando reservas confirmadas
const mostrarReservasConfirmadas = () => {
    listaReservas.innerHTML = "";

    for (let i = 0; i < reservasConfirmadas.length; i++) {

        let ReservaNombre = document.createElement("li");
        ReservaNombre.classList.add("datoReserva")
        ReservaNombre.innerHTML = "NOMBRE: " + reservasConfirmadas[i].nombre;
        listaReservas.appendChild(ReservaNombre);

        let ReservaApellido = document.createElement("li");
        ReservaApellido.classList.add("datoReserva")
        ReservaApellido.innerHTML = "APELLIDO: " + reservasConfirmadas[i].apellido;
        listaReservas.appendChild(ReservaApellido);

        let ReservaNumero = document.createElement("li");
        ReservaNumero.classList.add("datoReserva")
        ReservaNumero.innerHTML = "NUMERO: " + reservasConfirmadas[i].numero;
        listaReservas.appendChild(ReservaNumero);

        let ReservaEntrada = document.createElement("li");
        ReservaEntrada.classList.add("datoReserva");
        let entradaSinFormatear = new Date (reservasConfirmadas[i].entrada)
        let mostrarEntradaConfirmada = fechaFormateada(entradaSinFormatear);
        ReservaEntrada.innerHTML = "ENTRADA : " + mostrarEntradaConfirmada;
        listaReservas.appendChild(ReservaEntrada);

        let ReservaSalida = document.createElement("li");
        ReservaSalida.classList.add("datoReserva");
        let salidaSinFormatear = new Date (reservasConfirmadas[i].salida)
        let mostrarSalidaConfirmada = fechaFormateada(salidaSinFormatear);
        ReservaSalida.innerHTML = "SALIDA: " + mostrarSalidaConfirmada;
        listaReservas.appendChild(ReservaSalida);

       
        

    }

    let botonesReservas = document.getElementById("botonesReservas");
    let borrarReservaBtn = document.createElement("button");
    borrarReservaBtn.innerHTML = "Eliminar Reserva";
    borrarReservaBtn.classList.add("eliminarReserva");
    botonesReservas.appendChild(borrarReservaBtn);
    borrarReservaBtn.addEventListener("click", function () {
        borrarReservaConfirmada(0);
    })

    
}

const borrarReservaConfirmada = (index) => {
    Swal.fire({
        title: '¿Estas seguro que quieres borrar esta reserva?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: "red",
        cancelButtonText: `No`,
        customClass: {
            actions: "botonesAlerta"
        }
    }).then ((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("reservasConfirmadas")
            listaReservas.innerHTML = "";
            botonReserva.innerHTML = "";
            precioTotal.innerHTML = "";
            location.reload();
        }
    })
}