/*
此配置文件 乃 与 vue 练习案例 配合的 webpack 配置项。与项目的业务无关
*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')  // webpack插件，用于 合并webpack的配置文件 
const baseConfig = require('./webpack.config.base') // 获取 base 的配置
 

// 在 client 配置中 定义 默认的 webpack 插件 （在生产/开发环境下均可使用）
const defaultPlugins = [
  new webpack.DefinePlugin({  // 定义webpack 的运行环境（开发或者生产打包）
    'process.env': {
      NODE_ENV: '"development"'
    },
  }),
  new HTMLPlugin({ // 自动创建 HTML入口文件的插件
    template: path.join(__dirname, 'template.html') // 使用‘template.html’文件作为模板生成html入口文件
  })  
]

let config
let devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true
}

config = merge(baseConfig, {

  entry: path.join(__dirname, '../practice/index.js'), // 练习 项目的 入口文件

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
              sourceMap: true,
            }
          },
          'stylus-loader?resolve url'
        ]
      }
    ]
  },

  devServer,

  resolve: { // 设置直接引入vue 的 路径别名
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')// 用 vue.esm.js 这个版本 可以使用template功能
    }
    /*
    备注： vue/dist/ 内部 存放 多个不同类型的 vue.js 输出，这些输出文件是根据 不同的环境中使用的
    没有 runtime 的 vue.js  均具有 template 功能
    */
  },

  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])

})


module.exports = config
