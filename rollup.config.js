import resolve from 'rollup-plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import brfs from 'rollup-plugin-brfs';



export default {
  input: './src/main.bs.js',
  output: {
    file: './release/main.js',
    format: 'iife',
    name: 'starter'
  },
  plugins: [
    brfs(),
    // nodePolyfills({fs: true}),
    resolve({preferBuiltins: true}), 
  ]
};