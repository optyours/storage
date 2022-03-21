import typescript from 'rollup-plugin-typescript2'
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
  ]
}
