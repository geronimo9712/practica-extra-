window.addEventListener("load", () => {
    const canvas = document.getElementById("dibujo");
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas
    function ajustarTamaño() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 120; // dejar espacio para los controles
    }
    ajustarTamaño();
    window.addEventListener("resize", ajustarTamaño);

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

    // Limpiar canvas
    document.getElementById("limpiar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Dibujar al tocar
    canvas.addEventListener("touchstart", e => {
        e.preventDefault();
        const toque = e.touches[0];
        ctx.beginPath();
        ctx.moveTo(toque.clientX, toque.clientY - 120);
        dibujando = true;
    });

    canvas.addEventListener("touchmove", e => {
        if (!dibujando) return;
        e.preventDefault();
        const toque = e.touches[0];
        ctx.lineTo(toque.clientX, toque.clientY - 120);
        ctx.strokeStyle = color;
        ctx.lineWidth = grosor;
        ctx.lineCap = "round";
        ctx.stroke();
    });

    canvas.addEventListener("touchend", () => {
        dibujando = false;
        ctx.closePath();
    });
});

