window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const uiColor = document.getElementById('color');
  const uiGrosor = document.getElementById('grosor');
  const btnLimpiar = document.getElementById('limpiar');
  const coordsEl = document.getElementById('coords');
  const ctx = canvas.getContext('2d');

  // Ajustar tamaño del canvas al tamaño real y DPR (evita coordenadas distorsionadas)
  function resizeCanvas(){
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // mapear coordenadas CSS a pixeles reales
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }

  // Inicialmente setear el CSS size (es necesario para que getBoundingClientRect tenga valores)
  function setCssFullScreen(){
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  setCssFullScreen();
  resizeCanvas();
  window.addEventListener('resize', () => { setCssFullScreen(); resizeCanvas(); });

  let dibujando = false;
  let lastX = 0;
  let lastY = 0;

  function getTouchPos(touch) {
    // Convertir client coords a coords locales del canvas usando bounding rect
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    return { x, y };
  }

  function actualizarCoordsDisplay(x,y){
    coordsEl.textContent = `x: ${Math.round(x)} y: ${Math.round(y)}`;
  }

  // limpiar
  btnLimpiar.addEventListener('click', () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
  });

  // Touch handlers
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // evita scroll/gestos del navegador
    const t = e.changedTouches[0];
    const p = getTouchPos(t);
    lastX = p.x;
    lastY = p.y;
    dibujando = true;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    actualizarCoordsDisplay(lastX, lastY);
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (!dibujando) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    const p = getTouchPos(t);
    // dibujar segmento
    ctx.strokeStyle = uiColor.value;
    ctx.lineWidth = Number(uiGrosor.value);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
    actualizarCoordsDisplay(lastX, lastY);
  }, { passive: false });

  canvas.addEventListener('touchend', (e) => {
    if (!dibujando) return;
    e.preventDefault();
    dibujando = false;
    ctx.closePath();
  }, { passive: false });

  // DIAGNÓSTICO adicional: si tocas, crea un punto visible también
  // (esto ayuda si hay problema con stroke)
  canvas.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    const p = getTouchPos(t);
    // dibujar punto pequeño para verificar
    ctx.fillStyle = uiColor.value;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(1, Number(uiGrosor.value)/2), 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }, { passive: false });
});


