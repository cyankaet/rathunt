import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/main.bs.js',
  output: {
    file: './release/main.js',
    format: 'iife',
    name: 'starter'
  },
  plugins: [
    resolve()
  ]
};