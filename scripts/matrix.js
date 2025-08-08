const canvas = document.getElementById('matrix-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = Number(canvas.dataset.fontSize) || 16; // Taille ajustable
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0);
  const speed = Number(canvas.dataset.speed) || 50; // Vitesse ajustable

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, i) => {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i] = y + 1;
      }
    });
  }

  window.matrixInterval = setInterval(draw, speed);
}
