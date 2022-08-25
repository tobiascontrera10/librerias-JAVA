Toastify({

    text: "Bienvenido a ZapAR",
    position: "center",
    duration: 1500
    
    }).showToast();



//Declaración de la clase
class Zapatillas{
    constructor(id, marca, modelo, talle, color, precio){
        this.id = id,
        this.marca = marca,
        this.modelo = modelo,
        this.talle = talle,
        this.color = color,
        this.precio = precio
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributo
const zapas1 = new Zapatillas(1, "nike", "Jordan 1", 41, "rojos", 40000)
const zapas2 = new Zapatillas(2, "adidas", "Forum", 38, "blancos", 38000)
const zapas3 = new Zapatillas(3, "adidas", "NMD", 38, "negro y azul", 38000)
const zapas4 = new Zapatillas(4, "nike", "Jordan 4", 43, "azul", 58000)
const zapas5 = new Zapatillas(5, "vans", "Ultrarange", 41, "negras", 18000)
const zapas6 = new Zapatillas(6, "New balance", "550", 36, "blancas", 19000)


//Declarar arrays 
let estanteria = []
let productosEnCarrito = []

//Elementos DOM 
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let acumulador
let divProductos = document.getElementById("productos")
divProductos.setAttribute("class", "productosEstilos")
//Capturamos btn mostrar catalogo y pasamos eventos con function correspondiente
let mostrarCatalogoBtn = document.getElementById("verCatalogo")
mostrarCatalogoBtn.addEventListener("click", mostrarCatalogo)

//Capturamos btn ocultar catalogo y pasamos eventos con function correspondiente
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
ocultarCatalogoBtn.onclick = ocultarCatalogo

//Capturo guardarLibro boton y asignamos evento
const guardarLibroBtn = document.getElementById("guardarLibroBtn")
guardarLibroBtn.addEventListener("click", guardarLibro)

//Evento botonCarrito
botonCarrito.addEventListener('click', () => {

    

    cargarProductosCarrito(productosEnCarrito)
    
})

//lógica iniciar array estantería
if(localStorage.getItem("estanteria")){
    //array que declaramos vacio
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
    console.log(estanteria)
}else{
    console.log(`primera vez que carga Estanteria`)
    estanteria.push(zapas1 ,zapas2 ,zapas3 ,zapas4 ,zapas5 ,zapas6 )
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
console.log(estanteria)
//lógica iniciar array carrito
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    console.log(`primera vez`)
    localStorage.setItem("carrito", [])
    // console.log(productosEnCarrito)
} 
//Plantillas

function mostrarCatalogo(){
    divProductos.innerHTML = ""
    estanteria.forEach((zapas)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<article id="${zapas.id}" class="card">
                                        <h3 class="tituloCard">${zapas.marca}</h3>
                                        <h4 class="tituloCard2">${zapas.modelo}</h4>
                                        <div class="content">
                                            <p class="autorCard">Talle:${zapas.talle} | Color:${zapas.color} </p>
                                            <p class="precioCard">Precio: ${zapas.precio}</p>
                                            <button id="agregarBtn${zapas.id}">Agregar al carrito</button>
                                        </div>
                                    </article>`
        divProductos.appendChild(nuevoProducto)
        
        //código btnAgregar
        let btnAgregar = document.getElementById(`agregarBtn${zapas.id}`)
        console.log(btnAgregar);
        //invocar agregarAlCarrito
        btnAgregar.addEventListener("click", () =>{agregarAlCarrito(zapas)})
        }) 
       
    }



function agregarAlCarrito(zapas){       
    console.log(`El calzado ${zapas.marca} modelo ${zapas.marca} ha sido agregado. N° identificación: ${zapas.id}`)

    let ZapasAgregada = productosEnCarrito.indexOf(zapas)
    console.log(ZapasAgregada)
    console.log(productosEnCarrito);
    if (ZapasAgregada == -1){
        productosEnCarrito.push(zapas)
        console.log(productosEnCarrito);
        //Cargar al storage
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)) 
        Swal.fire({
            title: 'Usted acaba de agregar un calzado a su carrito!',
            icon: 'success',  
            confirmButtonText: 'confirmar'
        })
        
        
    }else{
        console.log(`El calzado ${zapas.id} ya se encuentra en el carrito`)
        
    }
}
function ocultarCatalogo(){
    divProductos.innerHTML =""
}

// inputs :
function guardarLibro(){
    let marcaInput = document.getElementById("marcaInput")
    let modeloInput = document.getElementById("modeloInput")
    let talleInput = document.getElementById("talleInput")
    let colorInput = document.getElementById("colorInput")
    let precioImput = document.getElementById("precioImput")

    let calzadoPublicado = new Zapatillas(estanteria.length+1, marcaInput.value, modeloInput.value, talleInput.value, colorInput.value,precioImput.value )
    console.log(calzadoPublicado)
    //Push de libroCreado al array
    estanteria.push(calzadoPublicado)
    //guardar en el storage a ESTANTERIA
    //clave "estanteria"
    localStorage.setItem("estanteria", JSON.stringify(estanteria))

}
function cargarProductosCarrito(productosDelStorage) {

    modalBody.innerHTML = " "  
    productosDelStorage.forEach((productoCarrito) => {
        
        modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                <img class="card-img-top" src="${productoCarrito.marca}" alt="${productoCarrito.modelo}">
                <div class="card-body">
                        <h4 class="card-title">${productoCarrito.color}</h4>
                    
                        <p class="card-text">$${productoCarrito.precio}</p> 
                        <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
                </div>    
            
            
            </div>
    `
})
//FUnction del total
//productosEnCarritos
compraTotal(productosDelStorage)
}

function compraTotal(productosTotal) {
    acumulador = 0;
    //recorrer productosTotal
    productosTotal.forEach((productoCarrito)=>{
        acumulador += productoCarrito.precio 
    })
    console.log(acumulador)
    //if acumularo = 0 o !=
    if(acumulador == 0){
        parrafoCompra.innerHTML = `<p>No hay productos en el carrito</p>`
    }else{
        parrafoCompra.innerHTML = `Importe de su compra ${acumulador}`
    }
   
}

