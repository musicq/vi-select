import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import {terser} from 'rollup-plugin-terser'

const {outputPath, sourcePath} = require('./paths')

export const rollupConfigFactory = env => {
  const isProd = env === 'production'

  return {
    input: sourcePath('index.ts'),
    output: [
      {
        file: outputPath('index.js'),
        format: 'es',
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom'],
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
