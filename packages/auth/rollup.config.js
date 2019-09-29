import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './lib/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        }
      }
    }),
  ],
  external: [
    'querystring',
    'aws-sdk',
    'ramda',
    'axios',
    'jsonwebtoken',
    'debug'
  ]
}
