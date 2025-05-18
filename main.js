// Buscador de productos
document.getElementById('input-buscar').addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.grid-productos .producto').forEach(prod => {
      prod.style.display = prod.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
  });
  
  // Scroll to top
  window.addEventListener('scroll', () => {
    document.getElementById('scrollTop').style.display =
      window.scrollY > 300 ? 'block' : 'none';
  });
  document.getElementById('scrollTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // CARRITO AVANZADO
  let carrito = [];
  const panel = document.getElementById('carrito-panel');
  const abrir = document.getElementById('abrir-carrito');
  const cerrar = document.getElementById('cerrar-carrito');
  const lista = document.getElementById('carrito-items');
  const totalSpan = document.getElementById('total');
  const contador = document.getElementById('contador-carrito');
  
  abrir.addEventListener('click', (e) => {
    e.preventDefault();
    actualizarCarrito();
    panel.classList.add('abierto');
  });
  
  cerrar.addEventListener('click', () => {
    panel.classList.remove('abierto');
  });
  
  function agregarAlCarrito(nombre, precio, imagen) {
    const idx = carrito.findIndex(item => item.nombre === nombre);
    if (idx >= 0) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1, imagen });
    }
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((item, i) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:9px;">
          <img src="${item.imagen}" alt="${item.nombre}" style="width:44px;border-radius:9px;">
          <div style="flex:1;">
            <b>${item.nombre}</b><br>
            $${item.precio} x 
            <button onclick="restarCantidad(${i})" style="font-weight:bold;">-</button>
            ${item.cantidad}
            <button onclick="sumarCantidad(${i})" style="font-weight:bold;">+</button>
            = <b>$${subtotal}</b>
          </div>
          <button onclick="eliminarDelCarrito(${i})" style="background:#ff005a;color:#fff;border:none;border-radius:50%;width:28px;height:28px;font-weight:bold;">&times;</button>
        </div>
      `;
      lista.appendChild(li);
    });
    totalSpan.textContent = total;
    contador.textContent = carrito.reduce((a, b) => a + b.cantidad, 0);
  }
  
  function sumarCantidad(index) {
    carrito[index].cantidad += 1;
    actualizarCarrito();
  }
  
  function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
    actualizarCarrito();
  }
  
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }
  
  // NUEVAS FUNCIONES FINALIZAR Y EMAIL
  function finalizarCompra() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    // Armamos el mensaje para WhatsApp
    const resumen = "¡Hola! Quiero hacer una compra en Joyassnela:%0A" +
      carrito.map(i => `${i.nombre} x${i.cantidad}`).join('%0A') +
      `%0ATotal: $${carrito.reduce((t, i) => t + i.precio * i.cantidad, 0)}`;
    // Teléfono destino
    const telefono = "5491126103231";
    window.open(`https://wa.me/${telefono}?text=${resumen}`, "_blank");
    // Limpiar carrito y cerrar panel
    carrito = [];
    actualizarCarrito();
    panel.classList.remove('abierto');
  }
  function enviarPorEmail() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    // Resumen de pedido
    const subject = encodeURIComponent("Nueva compra en Joyassnela");
    const cuerpo = encodeURIComponent(
      "¡Hola! Quiero hacer una compra en Joyassnela:\n" +
      carrito.map(i => `${i.nombre} x${i.cantidad}`).join('\n') +
      `\nTotal: $${carrito.reduce((t, i) => t + i.precio * i.cantidad, 0)}`
    );
    // Cambiá el email por el tuyo
    window.open(`mailto:joyasnela@gmail.com?subject=${subject}&body=${cuerpo}`);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.getElementById('carrusel-contenido');
    // Si hay pocos productos, duplicá para que no haya "vacío"
    if (carrusel && carrusel.children.length < 7) {
      carrusel.innerHTML += carrusel.innerHTML;
    }
  });
  