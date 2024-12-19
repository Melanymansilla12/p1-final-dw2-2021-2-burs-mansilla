
let publicidades = [
    "2x1 en productos seleccionados de Natura",
    "20% de descuento pagando en efectivo",
    "Hasta 9 cuotas sin interés con bancos adheridos"
];

function callback(a, b) {
    console.log(a);
    console.log(b);
}

let timeout = setTimeout(callback, 5000, "Param 1", "Param 2");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", () => {
        clearTimeout(timeout);
    });

    let publicidad = publicidades[Math.floor(Math.random() * publicidades.length)];
    document.querySelector(".alert").innerHTML = publicidad;

    let timeout = setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 10000);

    let close = document.createElement("button");
    close.setAttribute("class", "btn btn-success");
    close.setAttribute("type", "button");
    close.innerText = "X";
    close.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        clearTimeout(timeout);
    });
    document.querySelector(".alert").append(close);

    const carrito = new Carrito();
    const botonLimpiar = document.getElementById('limpiar-carrito');
    botonLimpiar.addEventListener('click', () => {
        carrito.limpiarCarrito();
    });

    const botonCheckout = document.getElementById('checkout');
    botonCheckout.addEventListener('click', () => {
        mostrarFormularioCheckout();
    });

    const productos = [
        {
            id: 1,
            nombre: "Agua prebiótica mango rosa",
            descripcion: "Calma, refresca e hidrata. Repone sales y minerales naturales. Fórmula no grasa.",
            precio: 9512,
            imagen: "imagenes/producto-1.jpg",
            categoria: "Línea 'TODO DIA'"
        },
        {
            id: 2,
            nombre: "Jabones en barra puro vegetal mango rosa",
            descripcion: "Limpieza purificante y textura cremosa. Piel perfumada y protegida. Mantiene la hidratación natural de la piel.",
            precio: 7871,
            imagen: "imagenes/producto-2.jpg",
            categoria: "Línea 'TODO DIA'"
        },
        {
            id: 3,
            nombre: "Crema nutritiva dátiles y canela",
            descripcion: "Tecnología inteligente, piel profundamente nutrida. Acelera la renovación celular. Piel saludable e iluminada.",
            precio: 14240,
            imagen: "imagenes/producto-3.jpg",
            categoria: "Línea 'TODO DIA'"
        },
        {
            id: 4,
            nombre: "Perfume maracuyá",
            descripcion: "Cítrico floral. Maracuyá nocturno, Bergamota, Mandarina, Hierba limón. Vegano.",
            precio: 36020,
            imagen: "imagenes/producto-4.jpg",
            categoria: "Línea 'EKOS'"
        },
        {
            id: 5,
            nombre: "Crema para manos maracuyá",
            descripcion: "Calma, protege e hidrata. Combate indicadores de estrés cutáneo. Textura ligera. Vegano.",
            precio: 9580,
            imagen: "imagenes/producto-5.jpg",
            categoria: "Línea 'EKOS'"
        },
        {
            id: 6,
            nombre: "Jabón líquido exfoliante",
            descripcion: "Este jabón líquido corporal con partículas exfoliantes hechas con semillas naturales del maracuyá, exfolia suavemente la piel, dejándola limpia, perfumada y renovada.",
            precio: 7930,
            imagen: "imagenes/producto-6.jpg",
            categoria: "Línea 'EKOS'"
        },
        {
            id: 7,
            nombre: "Clásico Femenino",
            descripcion: "Deslumbrante explosión cítrica de bergamota y naranja, con notas femeninas de jazmín.",
            precio: 34741,
            imagen: "imagenes/producto-7.jpg",
            categoria: "Línea 'KAIAK'"
        },
        {
            id: 8,
            nombre: "Clásico Masculino",
            descripcion: "Una fragancia acuática. Una combinación icónica de notas aromáticas, cítricas y acuosas, que aportan una poderosa frescura.",
            precio: 34741,
            imagen: "imagenes/producto-8.jpg",
            categoria: "Línea 'KAIAK'"
        },
        {
            id: 9,
            nombre: "Urbe Masculino",
            descripcion: "El inusual contraste entre la frescura acuática y la calidez de la copaiba, un ingrediente de la biodiversidad brasileña.",
            precio: 49630,
            imagen: "imagenes/producto-9.jpg",
            categoria: "Línea 'KAIAK'"
        }
    ];

    function mostrarProductos(listaProductos) {
        let contenedor = document.getElementById('productos');
        contenedor.innerHTML = '';

        listaProductos.forEach(producto => {
            let div = document.createElement('div');
            div.setAttribute('class', 'producto');

            let img = document.createElement('img');
            img.setAttribute('src', producto.imagen);
            img.setAttribute('alt', producto.nombre);
            img.setAttribute('class', 'producto-img');

            let nombre = document.createElement('h3');
            nombre.setAttribute('class', 'producto-nombre');
            nombre.innerText = producto.nombre;

            let precio = document.createElement('p');
            precio.setAttribute('class', 'producto-precio');
            precio.innerText = `$${producto.precio}`;

            let boton = document.createElement('button');
            boton.setAttribute('class', 'btn-agregar');
            boton.innerText = 'Agregar al carrito';
            boton.addEventListener('click', () => {
                carrito.agregarProducto(producto);
                carrito.actualizarCarrito();
            });

            let botonDescripcion = document.createElement('button');
            botonDescripcion.setAttribute('class', 'btn-descripcion');
            botonDescripcion.innerText = 'Ver descripción';
            botonDescripcion.addEventListener('click', () => {
                mostrarModalDescripcion(producto);
            });

            div.appendChild(img);
            div.appendChild(nombre);
            div.appendChild(precio);
            div.appendChild(boton);
            div.appendChild(botonDescripcion);

            contenedor.appendChild(div);
        });
    }

    mostrarProductos(productos);

    const selectCategoria = document.getElementById('categoria');
    const selectOrdenar = document.getElementById('ordenar');

    selectCategoria.addEventListener('input', filtrosProductos);
    selectOrdenar.addEventListener('input', filtrosProductos);

    function filtrosProductos() {
        const categoriaSeleccionada = selectCategoria.value;
        let productosFiltrados;

        if (categoriaSeleccionada === 'todos') {
            productosFiltrados = productos;
        } else {
            productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
        }

        const ordenSeleccionado = selectOrdenar.value;

        if (ordenSeleccionado === 'menor-mayor') {
            productosFiltrados.sort((a, b) => a.precio - b.precio);
        } else if (ordenSeleccionado === 'mayor-menor') {
            productosFiltrados.sort((a, b) => b.precio - a.precio);
        }

        mostrarProductos(productosFiltrados);
    }

    function mostrarModalDescripcion(producto) {
        const modal = document.createElement('div');
        modal.classList.add('modal-descripcion');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const nombreProducto = document.createElement('h2');
        nombreProducto.textContent = producto.nombre;

        const descripcionProducto = document.createElement('p');
        descripcionProducto.textContent = producto.descripcion;

        const cerrarModal = document.createElement('button');
        cerrarModal.textContent = 'Cerrar';
        cerrarModal.addEventListener('click', () => {
            modal.remove();
        });

        modalContent.appendChild(nombreProducto);
        modalContent.appendChild(descripcionProducto);
        modalContent.appendChild(cerrarModal);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    function createWarning(msg) {
        let div = document.createElement("div");
        div.setAttribute("class", "alert alert-warning");
        div.setAttribute("role", "alert");
        div.innerText = msg;
    
        const formulario = document.getElementById('formulario-checkout');
        formulario.prepend(div);
    }

    function deleteWarning() {
        let warning = document.querySelector(".alert-warning");
        if (warning) {
            warning.remove();
        }
    }

    function procesarCompra(productos, nombre, telefono, direccion, email, metodoPago) {
        deleteWarning();
    
        if (!nombre || !telefono || !direccion || !email || !metodoPago) {
            createWarning("Por favor complete todos los campos.");
            return;
        }
    
        const total = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
    
        createWarning(`¡Gracias por tu compra, ${nombre}!\nTu pedido será enviado a: ${direccion}\nMétodo de pago: ${metodoPago}\nTotal: $${total}\nCorreo de confirmación: ${email}`);
    
        carrito.limpiarCarrito();
    
        setTimeout(() => {
            location.reload();
        }, 7000); 
    }
    
    function mostrarFormularioCheckout() {
        const carrito = new Carrito();
        const productosEnCarrito = carrito.productos;
    
        const formulario = document.getElementById('formulario-checkout');
        formulario.innerHTML = '';  
    
        const contenedor = document.createElement('div');
        contenedor.setAttribute('class', 'container');
    
        const titulo = document.createElement('h2');
        titulo.classList.add('mb-4');
        titulo.textContent = 'Formulario de Compra';
    
        const form = document.createElement('form');
    
        const nombreLabel = document.createElement('label');
        nombreLabel.classList.add('form-label');
        nombreLabel.textContent = 'Nombre Completo:';
        const nombreInput = document.createElement('input');
        nombreInput.setAttribute('type', 'text');
        nombreInput.setAttribute('id', 'nombre');
        nombreInput.setAttribute('class', 'form-control mb-3');
    
        const telefonoLabel = document.createElement('label');
        telefonoLabel.classList.add('form-label');
        telefonoLabel.textContent = 'Teléfono:';
        const telefonoInput = document.createElement('input');
        telefonoInput.setAttribute('type', 'number');
        telefonoInput.setAttribute('id', 'telefono');
        telefonoInput.setAttribute('class', 'form-control mb-3');
        telefonoInput.setAttribute('placeholder', 'Ingrese su teléfono');
    
        const direccionLabel = document.createElement('label');
        direccionLabel.classList.add('form-label');
        direccionLabel.textContent = 'Dirección:';
        const direccionInput = document.createElement('input');
        direccionInput.setAttribute('type', 'text');
        direccionInput.setAttribute('id', 'direccion');
        direccionInput.setAttribute('class', 'form-control mb-3');
        direccionInput.setAttribute('placeholder', 'Ingrese su dirección');
    
        const emailLabel = document.createElement('label');
        emailLabel.classList.add('form-label');
        emailLabel.textContent = 'Correo Electrónico:';
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('class', 'form-control mb-3');
    
        const metodoPagoLabel = document.createElement('label');
        metodoPagoLabel.classList.add('form-label');
        metodoPagoLabel.textContent = 'Método de Pago:';
        const metodoPagoInput = document.createElement('select');
        metodoPagoInput.setAttribute('id', 'metodo-pago');
        metodoPagoInput.setAttribute('class', 'form-select mb-3');
    
        const opciones = [
            { value: 'tarjeta', texto: 'Tarjeta de Crédito' },
            { value: 'efectivo', texto: 'Efectivo' },
            { value: 'transferencia', texto: 'Transferencia Bancaria' }
        ];
    
        opciones.forEach(opcion => {
            const option = document.createElement('option');
            option.setAttribute('value', opcion.value);
            option.textContent = opcion.texto;
            metodoPagoInput.appendChild(option);
        });
    
        const botonFinalizar = document.createElement('button');
        botonFinalizar.setAttribute('type', 'submit');
        botonFinalizar.setAttribute('class', 'btn btn-primary botonenviar');
        botonFinalizar.textContent = 'Finalizar Compra';
        botonFinalizar.addEventListener('click', (e) => {
            e.preventDefault();
            procesarCompra(productosEnCarrito, nombreInput.value, telefonoInput.value, direccionInput.value, emailInput.value, metodoPagoInput.value);
        });
    
        form.appendChild(nombreLabel);
        form.appendChild(nombreInput);
        form.appendChild(telefonoLabel);
        form.appendChild(telefonoInput);
        form.appendChild(direccionLabel);
        form.appendChild(direccionInput);
        form.appendChild(emailLabel);
        form.appendChild(emailInput);
        form.appendChild(metodoPagoLabel);
        form.appendChild(metodoPagoInput);
        form.appendChild(botonFinalizar);
    
        contenedor.appendChild(titulo);
        contenedor.appendChild(form);
    
        formulario.appendChild(contenedor);
    }
    
});
