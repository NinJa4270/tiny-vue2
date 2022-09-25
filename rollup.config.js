import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import rollupPluginServe from 'rollup-plugin-serve'
const isProduction = process.env.NODE_ENV === 'production'
const dir = './dist/'

export default [
  {
    input: './src/web/index.ts',
    output: [
      {
        dir: dir,
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        name: '[name].cjs.js',
      },
      {
        dir: dir,
        format: 'esm',
        entryFileNames: '[name].esm.js',
        name: '[name].esm.js',
      },
      {
        dir: dir,
        format: 'umd',
        entryFileNames: '[name].umd.js',
        name: '[name].umd.js',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      typescript({
        outDir: dir,
      }),
      isProduction && terser(),
      rollupPluginServe({
        open: true,
      }),
    ],
  },
]
