document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------
    // SALUDO DINÁMICO EN INICIO
    // ------------------------------
    const saludo = document.getElementById("saludo");
    if (saludo) {
        const hora = new Date().getHours();
        let mensaje;
        if (hora >= 5 && hora < 12) {
            mensaje = "¡Buenos días!\nGracias por visitarnos.";
        } else if (hora >= 12 && hora < 18) {
            mensaje = "¡Buenas tardes!\nDisfruta tu recorrido por la galería.";
        } else if (hora >= 18 && hora <= 23) {
            mensaje = "¡Buenas noches!\nEsperamos que encuentres inspiración.";
        } else {
            mensaje = "¡Hola noctámbulo!\nBienvenido a nuestra galería 24/7.";
        }
        saludo.textContent = mensaje;
    }

    // ------------------------------
    // REDIRECCIÓN DE BOTONES "COMPRAR"
    // ------------------------------
    function redireccionarAContacto() {
        window.location.href = "contacto.html";
    }

    ["comprarLouis", "comprarVicent", "comprarEdvard"].forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.addEventListener("click", redireccionarAContacto);
        }
    });

    // ------------------------------
    // FUNCIONALIDAD MODAL EN GALERÍA
    // ------------------------------
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close");

    function abrirModal(src, alt) {
        if (modal && modalImg && modalDesc) {
            modal.style.display = "block";
            modalImg.src = src;
            modalDesc.textContent = alt;
        }
    }

    function cerrarModal() {
        if (modal) modal.style.display = "none";
    }

    if (closeBtn) {
        closeBtn.onclick = cerrarModal;
    }

    window.onclick = function (e) {
        if (e.target === modal) cerrarModal();
    };

    // ------------------------------
    // GALERÍA - ELIMINAR IMAGEN
    // ------------------------------
    document.querySelectorAll("#galeria .imagen-container").forEach(div => {
        const img = div.querySelector("img");
        const btn = div.querySelector(".btn-eliminar");

        if (img) {
            img.onclick = () => abrirModal(img.src, img.alt);
        }

        if (btn) {
            btn.onclick = () => div.remove();
        }
    });

    // ------------------------------
    // FORMULARIO DE CONTACTO
    // ------------------------------
    const form = document.getElementById("formulario-contacto");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const comentario = document.getElementById("comentario");
    const solicitud = document.getElementById("solicitud");
    const mensajeDiv = document.getElementById("mensaje-confirmacion");

    function mostrarMensaje(texto, tipo) {
        if (mensajeDiv) {
            mensajeDiv.textContent = texto;
            mensajeDiv.style.color = tipo === "error" ? "red" : "green";

            // Ocultar mensaje luego de unos segundos
            setTimeout(() => {
                mensajeDiv.textContent = "";
            }, 4000);
        }
    }

    if (comentario && solicitud) {
        comentario.addEventListener("input", () => {
            const texto = comentario.value.toLowerCase();
            if (texto.includes("compra")) {
                solicitud.value = "Compra";
            } else if (texto.includes("venta")) {
                solicitud.value = "Venta";
            }
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!nombre.value.trim() || !email.value.trim() || !comentario.value.trim()) {
                mostrarMensaje("Todos los campos son obligatorios.", "error");
                return;
            }

            mostrarMensaje("Formulario enviado correctamente.", "exito");

            // Opcional: resetear el formulario
            // form.reset();
        });
    }
});
