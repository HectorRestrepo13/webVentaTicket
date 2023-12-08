let SelecionCuidad = document.getElementById("SelecionCuidad");
let selecionarClase = document.getElementById("selecionarClase");
let cantidadTicket = document.getElementById("cantidadTicket");
let PesoMaletas = document.getElementById("PesoMaletas");
let checkbox1 = document.getElementById("checkbox1");
let checkbox2 = document.getElementById("checkbox2");
let fechaSalida = document.getElementById("fechaSalida");
let fechaDevuelta = document.getElementById("fechaDevuelta");
let facturaTotalPagar = document.getElementById("facturaTotalPagar");
let btn_pagar = document.getElementById("btn_pagar");
let nombreCliente = document.getElementById("nombreCliente");
let cedulaCliente = document.getElementById("cedulaCliente");

let facturaFechaRegreso = document.getElementById("facturaFechaRegreso");
let facturaFechaIda = document.getElementById("facturaFechaIda");
let facturaExcede = document.getElementById("facturaExcede");
let facturaPagarExtraPeso = document.getElementById("facturaPagarExtraPeso");
let facturaCantidadPagar = document.getElementById("facturaCantidadPagar");
let facturaCantidadPasajeros = document.getElementById(
  "facturaCantidadPasajeros"
);
let facturaClase = document.getElementById("facturaClase");
let facturaPesoMaleta = document.getElementById("facturaPesoMaleta");

//estas son las variables donde voy a ir guardando todo
let valorPasaje = 0;
let pesoMaletasQuePuedeLlevar = 0;
let pesoSobrante = 0;
let valorCobrarPorKilo = 0;
let totalPagar = 0;
//este es el evento del input donde seleciona la cantidad de ticket se ejecuta al salirse del input
cantidadTicket.addEventListener("blur", () => {
  if (checkbox1.checked || checkbox2.checked) {
    if (SelecionCuidad.value != "Selecione Destino") {
      if (selecionarClase.value != "Selecione La Clase") {
        //aca voy a comenzar a sumar dependiendo de lo que alla selecionado en cuidad
        if (SelecionCuidad.value == "medellin") {
          valorPasaje = 100 * cantidadTicket.value;
        } else if (SelecionCuidad.value == "cali") {
          valorPasaje = 50 * cantidadTicket.value;
        } else if (SelecionCuidad.value == "barranquilla") {
          valorPasaje = 250 * cantidadTicket.value;
        } else if (SelecionCuidad.value == "pereira") {
          valorPasaje = 15 * cantidadTicket.value;
        } else if (SelecionCuidad.value == "bogota") {
          valorPasaje = 80 * cantidadTicket.value;
        }
        //--------------------------------------------------------------
        //aca le voy a sumar dependiendo de la clase que escogio
        if (selecionarClase.value == "ejecutivo") {
          valorPasaje = valorPasaje + 20 * cantidadTicket.value;
        } else if (selecionarClase.value == "vip") {
          valorPasaje = valorPasaje + 40 * cantidadTicket.value;
        }
        //--------------------------------------------------------------
        //aca voy a poner el peso que puede llevar dependiente de cuantos ticket compro
        pesoMaletasQuePuedeLlevar = 50 * cantidadTicket.value;
        //aca voy a mirar si esocgio ida y vuelta para sumarle por 2
        if (checkbox2.checked) {
          valorPasaje = valorPasaje * 2;
        }
        //aca voy a colocar el Total Apagar
        totalPagar = valorCobrarPorKilo + valorPasaje;
        facturaTotalPagar.innerHTML = `<p>Total Apagar: $${totalPagar}</p>`;
        //aca voy acomenzar a mandar todo para la factura
        facturaPesoMaleta.innerHTML = `<p>Peso total que pueden llevar :${pesoMaletasQuePuedeLlevar} KLG</p>`;
        facturaCantidadPagar.innerHTML = `<p>Valor del vuelo: $${valorPasaje}</p>`;
        facturaCantidadPasajeros.innerHTML = `<p> Total de Ticket: ${cantidadTicket.value}</p>`;
        facturaClase.innerHTML = `<p>Clase: ${selecionarClase.value}</p>`;
      } else {
        alert("Selecione por favor una Clase");
        cantidadTicket.value = "";
      }
    } else {
      alert("Selecione por favor un Destino");
      cantidadTicket.value = "";
    }
  } else {
    alert("Selecione Si solo es Ida o ida y vuelta");
    cantidadTicket.value = "";
  }
});

//aca voy hacer un evento que se ejecute al salirse del input del peso de las maletas
PesoMaletas.addEventListener("blur", () => {
  if (cantidadTicket.value != "") {
    if (PesoMaletas.value > pesoMaletasQuePuedeLlevar) {
      if (PesoMaletas.value >= pesoMaletasQuePuedeLlevar) {
        pesoSobrante = PesoMaletas.value - pesoMaletasQuePuedeLlevar;
      } else {
        pesoSobrante = pesoMaletasQuePuedeLlevar - PesoMaletas.value;
      }
      valorCobrarPorKilo = 15 * pesoSobrante;
      facturaExcede.innerHTML = `<p>Peso excedido : ${pesoSobrante} KLG</p>`;
      facturaPagarExtraPeso.innerHTML = `Valor extra por peso de maleta: $${valorCobrarPorKilo}.000</p>`;
    } else {
      valorCobrarPorKilo = 0;
      facturaExcede.innerHTML = `<p>Peso excedido :0 KLG</p>`;
      facturaPagarExtraPeso.innerHTML = `Valor extra por peso de maleta: $0.000</p>`;
    }
    //aca voy a colocar el Total Apagar
    totalPagar = valorCobrarPorKilo + valorPasaje;
    facturaTotalPagar.innerHTML = `<p>Total Apagar: $${totalPagar}</p>`;
  } else {
    alert("Ingrese Primero cuantos Ticket va comprar");
    PesoMaletas.value = "";
  }
});

function deseleccionarOtro(checkbox, numero) {
  // Obtener la lista de todos los checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Desmarcar todos los checkboxes que no sean el actual
  checkboxes.forEach(function (cb) {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });

  //aca voy a mirar si lo tiene en solo ida para ver si le sumo o le resto
  if (checkbox1.checked) {
    valorPasaje = valorPasaje / 2;
  } else if (checkbox2.checked) {
    valorPasaje = valorPasaje * 2;
  }
  if (numero == 1) {
    document.getElementById("fechaDevuelta").setAttribute("disabled", true);
    facturaFechaRegreso.innerHTML = "";
    fechaDevuelta.value = "";
    facturaCantidadPagar.innerHTML = `<p>Valor del vuelo: $${valorPasaje}</p>`;
  } else {
    document.getElementById("fechaDevuelta").removeAttribute("disabled");
    facturaCantidadPagar.innerHTML = `<p>Valor del vuelo: $${valorPasaje}</p>`;
  }
}

fechaSalida.addEventListener("blur", () => {
  facturaFechaIda.innerHTML = `<p>Fecha de Vuelo:  ${fechaSalida.value}</p>`;
});
fechaDevuelta.addEventListener("blur", () => {
  facturaFechaRegreso.innerHTML = `<p>Fecha de Regreso:  ${fechaDevuelta.value}</p>`;
});

//aca voy hacer un evento por si cambia de cuidad
SelecionCuidad.addEventListener("blur", () => {
  if (cantidadTicket.value != "") {
    if (checkbox1.checked || checkbox2.checked) {
      if (SelecionCuidad.value != "Selecione Destino") {
        if (selecionarClase.value != "Selecione La Clase") {
          //aca voy a comenzar a sumar dependiendo de lo que alla selecionado en cuidad
          if (SelecionCuidad.value == "medellin") {
            valorPasaje = 100 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "cali") {
            valorPasaje = 50 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "barranquilla") {
            valorPasaje = 250 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "pereira") {
            valorPasaje = 15 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "bogota") {
            valorPasaje = 80 * cantidadTicket.value;
          }
          //--------------------------------------------------------------
          //aca le voy a sumar dependiendo de la clase que escogio
          if (selecionarClase.value == "ejecutivo") {
            valorPasaje = valorPasaje + 20 * cantidadTicket.value;
          } else if (selecionarClase.value == "vip") {
            valorPasaje = valorPasaje + 40 * cantidadTicket.value;
          }
          //--------------------------------------------------------------
          //aca voy a poner el peso que puede llevar dependiente de cuantos ticket compro
          pesoMaletasQuePuedeLlevar = 50 * cantidadTicket.value;
          //aca voy a mirar si esocgio ida y vuelta para sumarle por 2
          if (checkbox2.checked) {
            valorPasaje = valorPasaje * 2;
          }
          //aca voy a colocar el Total Apagar
          totalPagar = valorCobrarPorKilo + valorPasaje;
          facturaTotalPagar.innerHTML = `<p>Total Apagar: $${totalPagar}</p>`;
          //aca voy acomenzar a mandar todo para la factura
          facturaPesoMaleta.innerHTML = `<p>Peso total que pueden llevar :${pesoMaletasQuePuedeLlevar} KLG</p>`;
          facturaCantidadPagar.innerHTML = `<p>Valor del vuelo: $${valorPasaje}</p>`;
          facturaCantidadPasajeros.innerHTML = `<p> Total de Ticket: ${cantidadTicket.value}</p>`;
          facturaClase.innerHTML = `<p>Clase: ${selecionarClase.value}</p>`;
        } else {
          alert("Selecione por favor una Clase");
          cantidadTicket.value = "";
        }
      } else {
        alert("Selecione por favor un Destino");
        cantidadTicket.value = "";
      }
    } else {
      alert("Selecione Si solo es Ida o ida y vuelta");
      cantidadTicket.value = "";
    }
  }
});

//aca voy hacer un evento por si cambia de Clase
selecionarClase.addEventListener("blur", () => {
  if (cantidadTicket.value != "") {
    if (checkbox1.checked || checkbox2.checked) {
      if (SelecionCuidad.value != "Selecione Destino") {
        if (selecionarClase.value != "Selecione La Clase") {
          //aca voy a comenzar a sumar dependiendo de lo que alla selecionado en cuidad
          if (SelecionCuidad.value == "medellin") {
            valorPasaje = 100 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "cali") {
            valorPasaje = 50 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "barranquilla") {
            valorPasaje = 250 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "pereira") {
            valorPasaje = 15 * cantidadTicket.value;
          } else if (SelecionCuidad.value == "bogota") {
            valorPasaje = 80 * cantidadTicket.value;
          }
          //--------------------------------------------------------------
          //aca le voy a sumar dependiendo de la clase que escogio
          if (selecionarClase.value == "ejecutivo") {
            valorPasaje = valorPasaje + 20 * cantidadTicket.value;
          } else if (selecionarClase.value == "vip") {
            valorPasaje = valorPasaje + 40 * cantidadTicket.value;
          }
          //--------------------------------------------------------------
          //aca voy a poner el peso que puede llevar dependiente de cuantos ticket compro
          pesoMaletasQuePuedeLlevar = 50 * cantidadTicket.value;
          //aca voy a mirar si esocgio ida y vuelta para sumarle por 2
          if (checkbox2.checked) {
            valorPasaje = valorPasaje * 2;
          }
          //aca voy a colocar el Total Apagar
          totalPagar = valorCobrarPorKilo + valorPasaje;
          facturaTotalPagar.innerHTML = `<p>Total Apagar: $${totalPagar}</p>`;
          //aca voy acomenzar a mandar todo para la factura
          facturaPesoMaleta.innerHTML = `<p>Peso total que pueden llevar :${pesoMaletasQuePuedeLlevar} KLG</p>`;
          facturaCantidadPagar.innerHTML = `<p>Valor del vuelo: $${valorPasaje}</p>`;
          facturaCantidadPasajeros.innerHTML = `<p> Total de Ticket: ${cantidadTicket.value}</p>`;
          facturaClase.innerHTML = `<p>Clase: ${selecionarClase.value}</p>`;
        } else {
          alert("Selecione por favor una Clase");
          cantidadTicket.value = "";
        }
      } else {
        alert("Selecione por favor un Destino");
        cantidadTicket.value = "";
      }
    } else {
      alert("Selecione Si solo es Ida o ida y vuelta");
      cantidadTicket.value = "";
    }
  }
});

let localStore = window.localStorage;

//aca voy hacer el evento del darle clic al boton se mande al local store
btn_pagar.addEventListener("click", () => {
  let llaves = Object.keys(localStore);
  if (
    nombreCliente.value.length > 0 &&
    cedulaCliente.value.length > 0 &&
    cantidadTicket.value.length > 0 &&
    fechaSalida.value.length > 0
  ) {
    let descrip = {
      Nombre: nombreCliente.value,
      Cedula: cedulaCliente.value,
      TotalTicket: cantidadTicket.value,
      valorVuelo: valorPasaje,
      fechaVuelo: fechaSalida.value,
      TotalVuelo: totalPagar,
      Clase: selecionarClase.value,
    };

    if (llaves.length == 0) {
      localStore.setItem(1, JSON.stringify(descrip));
    } else {
      llaves = Object.keys(localStore);
      let ultimaLLave = parseInt(llaves.length) + 1;
      console.log(llaves.length);
      console.log(ultimaLLave);

      localStore.setItem(ultimaLLave, JSON.stringify(descrip));
    }
  } else {
    alert("Faltan Datos por llenar");
  }
});
