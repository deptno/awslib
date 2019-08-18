import typescript from 'rollup-plugin-typescript2'

export default {
  input: './lib/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        }
      }
    }),
  ],
  external: [
    'aws-sdk',
    'ramda',
    'crypto',
    'zlib'
  ]
}
