const formulario = document.getElementById("agregar-gasto");
const listadoGastos = document.querySelector("#gastos ul");
const total = document.getElementById("total");
const restante = document.getElementById("restante");
let ArrayListado = [];


class nuevoGasto{
    constructor (gasto, cantidad, dataId) {
        this.gasto = gasto; 
        this.cantidad = cantidad;
        this.dataId = dataId
    }
   
}

class Presupuesto {
  constructor(dinero) {
    this.dinero = dinero;
  }

  actulizarDatos(gasto, cantidad, dataId){

    if ((total.textContent * 0 ) <= restante.textContent){
        restante.innerText -= cantidad;
        const GatosArray = new nuevoGasto(gasto, cantidad, dataId)
        ArrayListado.push(GatosArray);
        ui.annadirGasto()
    }

    ui.comprobarRestante()

  



  }
  

}

class UI {
  preguntarPresupuesto() {
    let presupuesto = window.prompt("Cual es tu presupuesto");

    const regex = /^\d+$/;

    if (!presupuesto.match(regex)) {
      ui.preguntarPresupuesto();
      return;
    }

    window.presu = new Presupuesto(Number(presupuesto));
    total.innerText = presu.dinero; 
    restante.innerText = presu.dinero; 
  }
  mensajeError() {
    const mensaje = "Ambos campos son obligatorios";
    const div = document.createElement("div");
    div.innerText = mensaje;
    div.classList.add("text-center", "alert", "alert-danger");

    formulario.before(div);

    setTimeout(() => {
      formulario.parentElement.children[1].remove();
    }, 4000);
  }

  annadirGasto(){
    listadoGastos.innerHTML = ''

    ArrayListado.forEach(gasto => {
        const crearLi = document.createElement('li'); 
        crearLi.innerHTML = `${gasto.gasto} <span class='badge badge-primary badge-pill'>$ ${gasto.cantidad} </span> <button onclick='ui.borrarListado(event)' class="btn btn-danger borrar-gasto">Borrar</button>`;
        crearLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center') 
        crearLi.setAttribute('data-id', gasto.dataId)
        listadoGastos.appendChild(crearLi)
        })

  }
  borrarListado(e){
    let edata = e.target.parentElement.getAttribute('data-id'); 
    ArrayListado.forEach((gastos)=>{
      if (gastos.dataId == edata){
        restante.textContent = Number(restante.textContent) + Number(gastos.cantidad)
      }
    })

    ArrayListado = ArrayListado.filter(nuevoGasto => nuevoGasto.dataId != edata);

    this.annadirGasto();
    this.comprobarRestante();

  }
  comprobarRestante(){

    if ((total.textContent * 0 ) >= restante.textContent){
        restante.parentElement.parentElement.style.backgroundColor = 'red';
    } else if ((total.textContent * 0.25 ) >= restante.textContent){
        restante.parentElement.parentElement.style.backgroundColor = 'yellow';
    } else if ((total.textContent * 0.5 ) >= restante.textContent){
        restante.parentElement.parentElement.style.backgroundColor = 'orange';
    } else {
      restante.parentElement.parentElement.style.backgroundColor = '#d4edda';
    }}

}

const ui = new UI();

function obtenerDatos(e) {
  e.preventDefault();

  const inputGatos = e.target.querySelector("#gasto").value;
  const inputCantidad = e.target.querySelector("#cantidad").value;
  let dataId = Math.round(Math.random() * 10000000)

  if (!inputCantidad || !inputGatos) {
    ui.mensajeError();
    return;
  }



  presu.actulizarDatos(inputGatos, inputCantidad, dataId)
  
//   console.log(inputGatos, inputCantidad);
total.value = ''; 
restante.value = '';

}

ui.preguntarPresupuesto();

formulario.addEventListener("submit", obtenerDatos);

formulario.querySelector("#cantidad").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
});


function hola(){
  console.log('hola')
}