let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#contenedor-carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorComprar = document.querySelector("#carrito-compra");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector(".carrito-total-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-comprar");

function cargarProductosCarrito () {
    if(productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
    
        contenedorProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto")
            div.innerHTML = `  
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <P>$${producto.precio * producto.cantidad}</P>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
            contenedorProductos.append(div);
        });
    
        
    
    }else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorComprar.classList.add("disabled");
    };

    actualizarBotonesEliminar();
    actualizarTotal();
};


cargarProductosCarrito ();


function actualizarBotonesEliminar(){

    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });

};

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado !",
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
        onClick: function(){} // Callback after click
      }).showToast();


    const Boton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === Boton);
    const index = productosEnCarrito.findIndex(producto => producto.id === Boton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito ();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito ();
};

function actualizarTotal(){
    const TotalProductos = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 );
    total.innerText = `$${TotalProductos}`;
};


botonComprar.addEventListener("click", ComprarCarrito)
function ComprarCarrito(){

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra Realizada !',
        showConfirmButton: false,
        timer: 1500
      })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorComprar.classList.remove("disabled");
};