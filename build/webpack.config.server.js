/**
 * 服务端渲染的webpack 配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge') // webpack插件，用于 合并webpack的配置文件
const baseConfig = require('./webpack.config.base') // 获取 base 的配置
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-render/server-plugiun')
 

let config


config = merge(baseConfig, {
  target: 'node', // 必须设置‘target’并指定为'node' 表示在node 环境下运行
  entry: path.join(__dirname, '../client/server-entry.js'), // 服务端渲染的 js入口文件

  devtool: 'source-map',
  output: { // 服务端渲染 的 output 与前端渲染的 不一样
    libraryTarget: 'commonjs2', // output的‘libaryTarget’表示输出的输出的形式（格式），node环境下是commonjs的格式（modules.export的形式）
    filename: 'server.entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // package.json的dependencies是项目生产环境下需要依赖的包，在前端渲染时需要打包到bundle.js里面，但是在后端渲染环境下，支持import/require直接引入这些依赖的包，因此无需打包他们
  externals: Object.keys(require('../package.json').dependencies), // 配置external 表示不需要打包‘dependencies’部分的依赖包
  module: {
    rules: [
      { // stylus的打包必须使用 “ExtractPlugin”来完成，因为在服务端无法使用“vue-style-loader”
        test: /\.styl$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader?resolve url'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env,VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]

})

module.exports = config
