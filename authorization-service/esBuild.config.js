import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['handler.js'],
  outfile: './build/bundle.js',
  platform: 'node',
  target: 'node18',
  bundle: true,
}).catch(() => process.exit(1));