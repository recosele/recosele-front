import { defineConfig } from 'umi';
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// ref: https://umijs.org/config/
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  hash: true,
  history: {
    type: 'hash',
  },
  title: 'Recosele',
  ignoreMomentLocale: true,
  // dynamicImport: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  chainWebpack: (config: any) => {
    config.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin);
  },
  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
        ]
      : [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
        ],
});
