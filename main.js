const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".lista-menu");
let botonesAgregar = document.querySelectorAll(".producto-boton");
let productos;
const numerito = document.querySelector("#numerito")

function cargarProducto(){
    contenedorProductos.innerHTML = "";
    fetch('https://raw.githubusercontent.com/MoreiraGaston2021/json/main/data.json')
    .then(response  => response .json())
    .then(data => { 
        productos = data;
        productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-boton" id=${producto.id}>Agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);
    });
    
    actualizarBotonesAgregar();
    })
    .catch(error => {
    console.log('Error al cargar el archivo JSON:', error);
})
     
};

cargarProducto();


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-boton");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });

}

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
    productoEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito() 
}else{
    productoEnCarrito = [];
}


function agregarAlCarrito(e) {

    Toastify({
        text: "Producto Agregado !",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, 0)",
        },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.target.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productoEnCarrito.some(producto => producto.id === idBoton)){
        const index = productoEnCarrito.findIndex(producto => producto.id === idBoton)
        productoEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado); 
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
}

function actualizarNumerito() {
    let numero = productoEnCarrito.reduce((acc, producto ) => acc + producto.cantidad, 0 )
    numerito.innerHTML = numero;
}