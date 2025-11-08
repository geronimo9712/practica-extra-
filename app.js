window.addEventListener("load", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 120; // Dejar espacio para los controles

    let dibujando = false;
    let color = document.getElementById("color").value;
    let grosor = document.getElementById("grosor").value;

    // Eventos de controles
    document.getElementById("color").addEventListener("change", e => {
        color = e.target.value;
    });

    document.getElementById("grosor").addEventListener("input", e => {
        grosor = e.target.value;
    });

    document.getElementById("limpiar").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Evento touchstart
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Evita scroll o zoom
        let toque = e.touches[0];
        ctx.beginPath();
        ctx.moveTo(toque.clientX, toque.clientY - 120); // Ajuste por el espacio superior
        dibujando = true;
    });

    // Evento touchmove
    canvas.addEventListener("touchmove", (e) => {
        if (!dibujando) return;
        e.preventDefault();
        let toque = e.touches[0];
        ctx.lineTo(toque.clientX, toque.clientY - 120);
        ctx.strokeStyle = color;
        ctx.lineWidth = grosor;
        ctx.lineCap = "round";
        ctx.stroke();
    });

    // Evento touchend
    canvas.addEventListener("touchend", () => {
        dibujando = false;
    });
});
