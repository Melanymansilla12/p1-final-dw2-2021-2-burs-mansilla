class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('carrito')) || [];
        this.actualizarCarrito();
        this.configurarBotonMostrar();
    }

    agregarProducto(producto) {
        const prod = this.productos.find(p => p.id === producto.id);
        if (prod) {
            prod.cantidad++;
        } else {
            this.productos.push({ ...producto, cantidad: 1 });
        }
        this.guardar();
        this.actualizarCarrito();
    }

    quitarUnProducto(id) {
        const prod = this.productos.find(p => p.id === id);
        if (prod) {
            prod.cantidad--;
            if (prod.cantidad === 0) {
                this.quitarProducto(id);
            } else {
                this.guardar();
                this.actualizarCarrito();
                this.mostrarDetalle();
            }
        }
    }

    quitarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.guardar();
        this.actualizarCarrito();
        this.mostrarDetalle();
    }

    actualizarCarrito() {
        const cantidadItems = document.getElementById('items-cantidad');
        const totalCarrito = document.getElementById('carrito-total');
        const cantidadTotal = this.productos.reduce((acc, item) => acc + item.cantidad, 0);
        const precioTotal = this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        cantidadItems.textContent = cantidadTotal;
        totalCarrito.textContent = precioTotal.toFixed(2);
    }

    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    limpiarCarrito() {
        localStorage.removeItem('carrito');
        this.productos = [];
        this.actualizarCarrito();
        this.mostrarDetalle();
    }

    configurarBotonMostrar() {
        const botonMostrar = document.getElementById('mostrar-carrito');
        botonMostrar.addEventListener('click', () => this.mostrarDetalle());
    }

    mostrarDetalle() {
        const contenedor = document.getElementById('detalle-carrito');
        contenedor.innerHTML = '';

        if (this.productos.length === 0) {
            contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
            return;
        }

        this.productos.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('detalle-item');

            const nombre = document.createElement('p');
            nombre.textContent = `${producto.nombre} (x${producto.cantidad})`;

            const subtotal = document.createElement('p');
            subtotal.textContent = `Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}`;

            const botonQuitarUno = document.createElement('button');
            botonQuitarUno.textContent = 'Quitar uno';
            botonQuitarUno.classList.add('btn', 'btn-sm', 'btn-secondary');
            botonQuitarUno.addEventListener('click', () => this.quitarUnProducto(producto.id));

            const botonQuitarTodo = document.createElement('button');
            botonQuitarTodo.textContent = 'Quitar producto';
            botonQuitarTodo.classList.add('btn', 'btn-sm', 'btn-danger');
            botonQuitarTodo.addEventListener('click', () => this.quitarProducto(producto.id));

            item.appendChild(nombre);
            item.appendChild(subtotal);
            item.appendChild(botonQuitarUno);
            item.appendChild(botonQuitarTodo);
            contenedor.appendChild(item);
        });
    }
}