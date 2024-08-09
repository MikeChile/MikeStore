
// CREAMOS LA CLASE DEL PRODUCTO
class Producto {
    constructor(id, nombre, marca, precio, imagen, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
    }
}

// CREAMOS LOS OBJETOS - PRODUCTOS
let productos = [
    //CADA PRODUCTO TIENE LOS SIGUIENTES ATRIBUTOS: ID, NOMBRE, MARCA, PRECIO, IMAGEN, STOCK
    new Producto("#1", "Zapatillas Blancas Modern", "Modern", 45000, "https://i.ibb.co/bQ5t8bR/product-5.jpg", 100),
    new Producto("#2", "Polera Negra Puma Lineal", "Puma", 15000, "https://i.ibb.co/vVpTyBD/product-6.jpg", 100),
    new Producto("#3", "Calcetines HRX varios colores", "HRX", 6000, "https://i.ibb.co/hR5FGwH/product-7.jpg", 100),
    new Producto("#4", "Reloj Fossil Black m5", "Fossil", 95000, "https://i.ibb.co/QfCgdXZ/product-8.jpg", 100),
    new Producto("#5", "Reloj Casual Roadster", "Roadster", 72000, "https://i.ibb.co/nw5xZwk/product-9.jpg", 100),
    new Producto("#6", "Zapatillas Nom X Version", "Nom X", 35000, "https://i.ibb.co/9HCsmjf/product-10.jpg", 100),
    new Producto("#7", "Zapatillas Comodas Gris Nak", "Nak", 55000, "https://i.ibb.co/JQ2MBHR/product-11.jpg", 100),
    new Producto("#8", "Buzo Nike Marine Ajustado", "Nike", 25000, "https://i.ibb.co/nRZMs6Y/product-12.jpg", 100),
];

//MENU - AGREGAMOS UNOS ESTILOS AL MENU
var MenuItems = document.getElementById('MenuItems');
MenuItems.style.maxHeight = '200px';

function menutoggle() {
    if (MenuItems.style.maxHeight == '0px') {
        MenuItems.style.maxHeight = '200px';
    } else {
        MenuItems.style.maxHeight = '0px';
    }
}

//MOSTRAMOS LOS PRODUCTOS EN EL HTML
let html = "";
productos.forEach((producto) => {
    html += `
      <div class="col-4">
        <img src="${producto.imagen}" alt="" />
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio.toLocaleString('es-CL')}</p>
        <button class="custom-btn" onclick="addCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, ${producto.stock}, '${producto.imagen}')"><i class='bx bxs-cart-add'></i> Añadir al carrito</button>
      </div>
    `;
});

document.getElementById("listaProductos").innerHTML = html;

//CREAMOS LA CLASE CARRITO
class CarritoCompra {
    constructor() {
        this.productos = []; // Arreglo de productos
        this.cantidad = 0; // Cantidad total de productos
        this.precioTotal = 0; // Precio total de los productos
    }

    // Método para agregar un producto al carrito
    agregarProducto(id, nombre, precio, stock, imagen) {
        let producto = {
            id,
            nombre,
            precio,
            cantidad: 1,
            stock,
            imagen
        };

        // Verificamos si el producto ya existe en el carrito
        let existe = this.productos.find((p) => p.id === id);

        if (existe) {
            existe.cantidad++;
        } else {
            this.productos.push(producto);
        }

        this.cantidad++;
        this.precioTotal += precio;
    }

    // Método para eliminar un producto del carrito
    eliminarProducto(id) {
        let indice = this.productos.findIndex((p) => p.id === id);

        if (indice !== -1) {
            let producto = this.productos[indice];

            this.cantidad -= producto.cantidad;
            this.precioTotal -= producto.precio * producto.cantidad;

            this.productos.splice(indice, 1);
        }
        actualizarCarrito();
    }

    // Método para vaciar el carrito
    vaciarCarrito() {
        this.productos = [];
        this.cantidad = 0;
        this.precioTotal = 0;
        actualizarCarrito();
    }
}

let carrito = new CarritoCompra();

//AÑADIR CARRITO
function addCarrito(id, nombre, precio, stock, imagen) {
    carrito.agregarProducto(id, nombre, precio, stock, imagen);
    console.log("Carrito actual:");
    console.log(carrito);

    Toastify({
        text: `Producto ${nombre} agregado al carrito!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff523b, #a41805)",
        },
    }).showToast();

    actualizarCarrito();
}

//ACTUALIZAR CARRITO
function actualizarCarrito() {
    let html = "";
    let precioTotal = 0;
    carrito.productos.forEach((producto) => {
        html += `
            <div class="producto">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="width:100px;">
                    </div>
                    <div class="col-12 col-md-8">
                        <h6>${producto.nombre}</h6>
                        <p>Precio: $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</p>
                    </div>
                </div>
                <div class="row justify-content-center mt-2">
                    <div class="col-12 text-center">
                        <div class="cantidad-contenedor">
                            <button class="btn btn-secondary" onclick="disminuirCantidad('${producto.id}')">-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="btn btn-secondary" onclick="aumentarCantidad('${producto.id}')">+</button>
                            <button class="btn btn-danger" onclick="carrito.eliminarProducto('${producto.id}')"><i class='bx bxs-cart-download' ></i> Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        precioTotal += producto.precio * producto.cantidad;
    });

    // Botón para vaciar el carrito solo si el carrito no está vacío
    if (carrito.productos.length > 0) {
        html += `
            <div class="total">
                <button class="btn btn-warning" onclick="carrito.vaciarCarrito()"><i class='bx bxs-cart-download' ></i> Vaciar carrito</button>
                <p>Precio total: $${(carrito.precioTotal).toLocaleString('es-CL')}</p>
            </div>
        `;
    } else {
        html += `
            <div class="total">
                <p>Carrito vacío</p>
            </div>
        `;
    }

    let cantidadProductos = carrito.productos.length;
    let spanCantidad = document.getElementById('cantidad-productos-carrito');
    
    if (cantidadProductos > 0) {
        spanCantidad.innerText = cantidadProductos;
        spanCantidad.style.display = 'inline-block'; // Muestra el span
    } else {
        spanCantidad.style.display = 'none'; // Oculta el span
    }

    document.getElementById("carrito-contenedor").innerHTML = html;
}

//BAJAR CANTIDAD DE UN PRODUCTO
function disminuirCantidad(id) {
    let producto = carrito.productos.find((p) => p.id === id);
    if (producto.cantidad > 0) {
        producto.cantidad--;
        carrito.precioTotal -= producto.precio; // Resta el precio del producto del precio total
        actualizarCarrito();
    }
}

//SUBIR CANTIDAD DE UN PRODUCTO
function aumentarCantidad(id) {
    let producto = carrito.productos.find((p) => p.id === id);
    if (producto.cantidad < producto.stock) {
        producto.cantidad++;
        carrito.precioTotal += producto.precio; // Suma el precio del producto al precio total
        actualizarCarrito();
    }
}

//FINALIZAR COMPRA
function finalizar_compra() {
    console.log(`finalizando compra`);
    // Abrir notificación para elegir método de pago
    $('#notificacion-pago').modal('show');
}

//PAGAR
function pagar() {
    // Obtener el método de pago seleccionado
    let metodoPago = document.getElementById('metodo-pago').value;

    // Realizar la acción de pago según el método seleccionado
    switch (metodoPago) {
        case 'efectivo':
            // Pago en efectivo
            break;
        case 'tarjeta':
            // Pago con tarjeta de crédito
            break;
        case 'transferencia':
            // Pago por transferencia bancaria
            break;
    }

    // Cerrar notificación
    document.getElementById('notificacion-pago').style.display = 'none';

    // Mostrar notificación de compra exitosa
    let html = `
        <div class="modal fade show" id="notificacion-compra" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="row" style="width: 100%;">
                            <div class="col-6">
                                <h5 class="modal-title">Compra exitosa!</h5>
                            </div>
                            <div class="col-6">
                                <div class="logo">
                                    <a href="index.html">
                                        <i class='bx bx-shopping-bag'></i>
                                        Mike<span>Store</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <p>Método de pago: ${metodoPago}</p>
                        <p>Detalle de la compra:</p>
                            `;
                            carrito.productos.forEach((producto) => {
                                html += `<div class="row"> 
                                    <div class="col">
                                        <ul>
                                            <li>${producto.nombre} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</li>
                                        </ul>
                                    </div>
                                </div>
                                    
                                `;
                            });
                            html += `
                        
                        <p>Total: $${carrito.precioTotal.toLocaleString('es-CL')}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="cerrarNotificacionCompra()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('notificacion-compra-contenedor').innerHTML = html;
    document.getElementById('notificacion-compra').style.display = 'block';

    // Vaciar carrito
    carrito.vaciarCarrito();
}

//CERRAMOS TODO
function cerrarNotificacionCompra() {
    location.reload(true);
}