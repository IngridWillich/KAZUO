const fs = require('fs-extra');
const path = require('path');

async function prepareMobile() {
  // Asegúrate de que la carpeta 'out' exista
  await fs.ensureDir('out');

  // Copia los archivos estáticos
  await fs.copy('.next/static', 'out/_next/static');

  // Copia el archivo server.js y los chunks necesarios
  await fs.copy('.next/standalone', 'out');

  // Copia el index.html si existe
  const indexPath = path.join('.next/server/pages', 'index.html');
  if (fs.existsSync(indexPath)) {
    await fs.copy(indexPath, 'out/index.html');
  }

  console.log('Archivos preparados para Capacitor en la carpeta "out"');
}

prepareMobile().catch(console.error);