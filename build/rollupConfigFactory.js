import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import {terser} from 'rollup-plugin-terser'
import pkg from '../package.json'

const {outputPath, sourcePath} = require('./paths')

const external = Object.keys(pkg.peerDependencies)

export const rollupConfigFactory = env => {
  const isProd = env === 'production'

  return {
    input: sourcePath('index.ts'),
    output: [
      {
        file: outputPath('index.es.js'),
        format: 'es',
        sourcemap: true
      },
      {
        file: outputPath('index.js'),
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
    ],
    external,
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      postcss({
        // extract: true,
        modules: true,
        // autoModules: true,
        minimize: isProd,
        plugins: [require('autoprefixer')]
      }),
      isProd && terser()
    ].filter(Boolean)
  }
}
