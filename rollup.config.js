import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/chinese-workday.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/chinese-workday.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/chinese-workday.umd.js',
      format: 'umd',
      name: 'chineseWorkday',
      globals: {
        'chinese-workday': 'chineseWorkday'
      }
    },
    {
      file: 'dist/chinese-workday.min.js',
      format: 'umd',
      name: 'chineseWorkday',
      plugins: [terser()],
    },
  ],
  external: [],
};