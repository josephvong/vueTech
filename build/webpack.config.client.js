const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // webpack插件，用于 合并webpack的配置文件
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base') // 获取 base 的配置

const isDev = process.env.NODE_ENV === 'development'

// 在 client 配置中 定义 默认的 webpack 插件 （在生产/开发环境下均可使用）
const defaultPlugins = [
  new webpack.DefinePlugin({ // 定义webpack 的运行环境（开发或者生产打包）
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }) // 自动创建 HTML入口文件的插件
]

let config
let devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true,
  historyApiFallback: { // 此配置用于开发时可以使用带histroy模式的前端路由功能
    index: '/index.html'
  }
}

if (isDev) {
  config = merge(baseConfig, {

    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            'vue-style-loader',
            'css-loader',
            /*
            {//此配置为开启css-loader的模块化编译功能，主要针对非vue文件(如jsx)导入的样式文件的模块化编译
              loader:'css-loader', // 在vue项目中 此配置意义不大，因为 vue-loadder已开启cssModdule
              options:{
                module: true,
                localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
              }
            },
            */
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader?resolve url'
          ]
        }
      ]
    },

    devServer,

    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])

  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },

    output: {
      filename: '[name].[chunkhash:8].js'
    },

    module: {
      rules: [
        {
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

    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
