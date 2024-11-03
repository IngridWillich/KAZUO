const fs = require('fs-extra');
const path = require('path');

async function prepareMobile() {
  try {
    // Limpia la carpeta out si existe
    await fs.remove('out');

     // Crea la carpeta out
     await fs.ensureDir('out');

    // Copia los archivos estáticos
    if (fs.existsSync('.next/static')) {
      await fs.copy('.next/static', 'out/_next/static', { 
        overwrite: true,
        recursive: true 
      });
    }

    // Copia los archivos standalone
    if (fs.existsSync('.next/standalone')) {
      await fs.copy('.next/standalone', 'out', { 
        overwrite: true,
        recursive: true 
      });
    }

    // Crea un index.html básico
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <title>Kazuo</title>
        </head>
        <body>
          <div id="__next"></div>
          <script src="/_next/static/chunks/webpack.js"></script>
          <script src="/_next/static/chunks/main.js"></script>
          <script src="/_next/static/chunks/pages/_app.js"></script>
          <script src="/_next/static/chunks/pages/index.js"></script>
        </body>
      </html>
    `;

    await fs.writeFile('out/index.html', htmlContent);

    // Copia la carpeta public si existe
    if (fs.existsSync('public')) {
      await fs.copy('public', 'out');
    }

    console.log('✅ Archivos preparados para Capacitor en la carpeta "out"');
  } catch (error) {
    console.error('Error durante la preparación:', error);
  }
}

prepareMobile().catch(console.error);