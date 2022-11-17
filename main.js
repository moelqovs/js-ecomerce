//Elementos y variables
//Json
let bebidasJSON=[];
let valorDolar;
//Variable para productos y total acumulado
let articuloCartas = document.getElementById("cartas");
let total;
//variables tabla carrito
let finalizarCompra = document.getElementById("comprar");
let eliminarCompra = document.getElementById("eliminar");
let tabla = document.getElementById("tabla");
//Storage carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// variables para implementar cambios de fondo
let boton = document.getElementById("version");
let fondo = document.getElementById("fondo");
let cambio = localStorage.getItem("cambio");


//tomar carrito abandonado
(carrito.length != 0)&&carritoPendiente();
apiDolar();


//Funcion para mostrar el carrito pendiente de compra
function carritoPendiente(){
    for (const bebida of carrito){
        document.getElementById("tabla").innerHTML+=`
        <tr>
            <td><img src=${bebida.imagen}></td>
            <td>${bebida.marca}</td>
            <td>${bebida.tipo}</td>
            <td>$ ${bebida.precio}</td>
        </tr>
        `; 
    }
    //total acumulado del carrito
    total = carrito.reduce((acumulador,bebida)=>acumulador+bebida.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="TTotal Carrito: $ "+total;
}


//Funcion para llamar archivo json local y Api Dolar
async function stockJSON() {
    const URLJSON="./assets/bebidas.json";
    const tomarRespuesta = await fetch(URLJSON);
    const data = await tomarRespuesta.json();
    bebidasJSON = data;
    //llamar cartas bebidas
    stockProductos();
}


//obtener la cotizacion del Dolar y del Json
function apiDolar(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
    fetch(URLDOLAR)
        .then( respuesta => respuesta.json())
        .then( cotizaciones => {
            const dolar = cotizaciones.blue;
            document.getElementById("dolar").innerHTML+=`
                <p>Dolar Compra: $ ${dolar.value_buy}</p>
                <p>Dolar Venta: $ ${dolar.value_sell}</p>
            `;
            valorDolar=dolar.value_buy;
            stockJSON();
        });
}


//Stock de Licores en cartas
function stockProductos(){
    //cartas
    for ( const bebida of bebidasJSON){
        articuloCartas.innerHTML+=`
            <div class="card col-md-3 col-sm-12 py-3 px-3">
                <img src=${bebida.foto} class="card-img-top" alt="...">
                <div class="card-body text-light bg-dark">
                    <h5 class="card-title">${bebida.marca}</h5>
                    <p class="card-text">${bebida.tipo}</p>
                    <p class="card-text">$ ${bebida.precio} Pesos</p>
                    <p class="card-text">$ ${(bebida.precio/valorDolar).toFixed(2)} USD</p>
                    <button id="btn${bebida.id}" class="btn btn-warning">Comprar</button>
                </div>
            </div>
        `;
    }

    //Eventos
    bebidasJSON.forEach(bebida => {
        //Evento por boton para tomar producto y agregar al carrito
        document.getElementById(`btn${bebida.id}`).addEventListener("click",function(){
            agregarAlCarrito(bebida);
        });
    });
} 

//llamando la Funcion
stockProductos();


//Agregar producto compra
function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    //avisar que se agreda al carrito
Swal.fire({
    title: productoComprado.marca,
    text: 'Agregado al carrito!',
    imageUrl: productoComprado.foto,
    imageWidth: 100,
    imageHeight: 200,
    color: '#ffaa00',
    position: 'center',
    imageAlt: productoComprado.marca,
    });
     //agregar en tabla
    let tablaCarrito = document.getElementById("tabla");
        tablaCarrito.innerHTML+=`
            <tr>
                <td><img src=${productoComprado.imagen}></td>
                <td>${productoComprado.marca}</td>
                <td>${productoComprado.tipo}</td>
                <td>$ ${productoComprado.precio}</td>
            </tr>
    `;
    //total acumulado del carrito
    total = carrito.reduce((acumulador,bebida)=>acumulador+bebida.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total Carrito: $"+total;
    //Guardar Local Storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


//finalizar la compra del carrito
finalizarCompra.onclick = () => {
    //Vaciar carrito
    if (carrito.length == 0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            iconColor:'#9d0208',
            color: '#0b090a',
            background:'#ffc300',
            title: 'El carrito se encuentra vacío',
            showConfirmButton: false,
            timer: 3000
        });
    }else{
    carrito = [];
    document.getElementById("tabla").innerHTML="";
    carrito.splice(carrito.length,0);
        Swal.fire({
            position: 'center',
            icon: 'success',
            iconColor:'#f8f9fa',
            color: '#0b090a',
            background:'#ffc300',
            title: 'Felicitaciones! Tu compra ha sido realizada',
            showConfirmButton: false,
            timer: 3000
        });
        //Storage
        localStorage.removeItem('carrito');
    };
}


    //Eliminar la compra del carrito
    eliminarCompra.onclick = () => {
        if (carrito.length == 0){
            Swal.fire({
                position: 'center',
                icon: 'success',
                iconColor:'#f8f9fa',
                color: '#0b090a',
                background:'#ffc300',
                title: 'El carrito se encuentra vacío',
                showConfirmButton: false,
                timer: 3000
            });
    }else{
    carrito = [];
    document.getElementById("tabla").innerHTML="";
    ///borrar el total
    carrito.splice(carrito.length,0);
        Swal.fire({
            position: 'center',
            icon: 'success',
            iconColor:'#9d0208',
            color: '#0b090a',
            background:'#ffc300',
            title: 'Carrito Eliminado',
            showConfirmButton: false,
            timer: 3000
        });
        //Vaciar Local Storage
        localStorage.removeItem('carrito');
    };
}

//Cambio de Fondo 

//primer cambio de modo
if(cambio != null){
    document.body.className=cambio;
    fondo.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
    if(cambio=="light"){
        boton.innerText="Absolut Dark";
    }else{
        boton.innerText="bsolut Light";
    }
}else{
    cambio="light";
}


//Cambios de fondo
boton.onclick = () => {
    if(cambio=="light"){
        document.body.className="dark";
        fondo.classList.remove("light"); 
        fondo.classList.add("dark");
        boton.innerText="Absolut Light";
        cambio="dark";//clase final
    }else{
        document.body.className="light";
        fondo.classList.remove("dark");
        fondo.classList.add("light");
        boton.innerText="Absolut Dark";
        cambio="light";
    }
    localStorage.setItem("fondo",cambio); //guarda y superpone
}

