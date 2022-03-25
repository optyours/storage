import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve';

import { uglify } from "rollup-plugin-uglify";
import babel from 'rollup-plugin-babel';

import { name, version, author } from './package.json';

// banner
const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

export default {
  input: 'src/index.ts',
  output: [
    // umd development version with sourcemap
    {
      file: `lib/${name}.js`,
      format: 'umd',
      name,
      banner,
      sourcemap: true
    },
    // cjs and esm version
    {
      file: `lib/${name}.cjs.js`,
      format: 'cjs',
      banner
    },
    // cjs and esm version
    {
      file: `lib/${name}.esm.js`,
      format: 'es',
      banner
    }
  ],
  plugins: [
    typescript(),  // 会自动读取 文件tsconfig.json配置
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    uglify()
    // resolve(),
    // browserifyPlugin(brfs),
    // commonjs({
    //   'namedExports': {
    //     './lib/storage.js': ['__moduleExports']
    //   }
    // }),
    // babel({         // 支持的将来版本的 JavaScript 特性
    //   exclude: ['node_modules/**'],
    //   presets: ['@babel/preset-env']
    // }),
  ]
}
