window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Ajusta el tamaño del canvas al tamaño de la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let dibujando = false;
    let color = document.getElementById("color").value;
    let grosor = document.getElementById("grosor").value;

    // Actualizar color y grosor
    document.getElementById("color").addEventListener("change", e => {
        color = e.target.value;
    });

    document.getElementById("grosor").addEventListener("input", e => {
        grosor = e.target.value;
    });

    // Botón para limpiar
    document.getElementById("limpiar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Empieza a dibujar con el toque
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Evita que se haga scroll al tocar
        const toque = e.touches[0];
        ctx.beginPath();
        ctx.moveTo(toque.clientX, toque.clientY);
        dibujando = true;
    });

    // Dibuja mientras el dedo se mueve
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!dibujando) return;
        const toque = e.touches[0];
        ctx.lineTo(toque.clientX, toque.clientY);
        ctx.strokeStyle = color;
        ctx.lineWidth = grosor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    });

    // Detiene el dibujo cuando se levanta el dedo
    canvas.addEventListener("touchend", (e) => {
        e.preventDefault();
        dibujando = false;
    });
});



