//Elementos
const carrito = [];
let total;
let articuloCartas = document.getElementById("cartas");
let carritoStorage =JSON.stringify(localStorage.getItem("carrito"));

function stockProductos(){
    //cartas
    for ( const bebida of bebidas){
        articuloCartas.innerHTML+=`
            <div class="card col-md-3 col-sm-12 py-3 px-3">
                <img src=${bebida.foto} class="card-img-top" alt="...">
                <div class="card-body text-light bg-dark">
                    <h5 class="card-title">${bebida.marca}</h5>
                    <p class="card-text">${bebida.tipo}</p>
                    <p class="card-text">$ ${bebida.precio}</p>
                    <button id="btn${bebida.id}" class="btn btn-warning">Comprar</button>
                </div>
            </div>
        `;
    }

    //Eventos
    bebidas.forEach(bebida => {
        //Evento por boton
        document.getElementById(`btn${bebida.id}`).addEventListener("click",function(){
            agregarAlCarrito(bebida);
        });
    });
} 

//lamar a la funcion
stockProductos();


//Agregar producto compra
function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    //avisar que se agreda al carrito
/* alert("Producto: "+productoComprado.marca+" agregado al carrito!");*/
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
    infoTotal.innerText="Total a pagar con IVA incluido: $"+total*1.21;
}

// variables para implementar cambios de fondo
let boton = document.getElementById("version");
let fondo = document.getElementById("fondo");
let cambio = localStorage.getItem("cambio");

//primer cambio
if(cambio != null){
    document.body.className=cambio;
    fondo.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
    if(cambio=="light"){
        boton.innerText="Dark Mode";
    }else{
        boton.innerText="Light Mode";
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
        boton.innerText="Light Mode";
        cambio="dark";//clase final
    }else{
        document.body.className="light";
        fondo.classList.remove("dark");
        fondo.classList.add("light");
        boton.innerText="Dark Mode";
        cambio="light";
    }
    localStorage.setItem("fondo",cambio); //guarda y superpone
}


// localstorage

//Tomar el array en el localstorage
localStorage.setItem("bebidas",bebidas);

const bebidaJson = JSON.stringify(bebidas);
localStorage.setItem("bebidas",bebidaJson);

//convertir a objeto
let bebidaStorage = localStorage.getItem("bebidas");
const objetoJson = JSON.parse (bebidaStorage);


