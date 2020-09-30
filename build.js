const { ssrBuild, build } = require('vite')
const replace = require('@rollup/plugin-replace');

;(async () => {
  const clientResult = await build({
    outDir: 'dist/client',
    rollupInputOptions: {
      input: './src/entry-client.js'
    },
  })


  await ssrBuild({
    outDir: 'dist/server',
    rollupOutputOptions: {
      preserveModules: true,
    },
    rollupInputOptions: {
      preserveEntrySignatures: 'strict',
      plugins: [
        replace({
          __HTML__: clientResult.html.replace('<div id="app">', '<div id="app" data-server-rendered="true">${html}')
        })
      ],
      input: './src/entry-server.js'
    },
  })

  process.exit();
})()