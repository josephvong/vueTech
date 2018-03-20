// const docsLoader = require('./doc-loader') // 定义

// 输出一个方法，接受 isDev 作为参数 判断环境
module.exports = (isDev) => {
  return {
    // 处理 vue文件 里面 <template> 中的 html 标签之间 的空白字符串（换行/空格），让其符合html的规范
    preserveWhitepace: true,

    // 将vue文件内的 css 块 分离出来 打包，
    extractCSS: !isDev, // 开发环境下 可以 不用分离打包

    // 使用 vue 中的 css 模块功能
    cssModules: {
      //'localIdentName': 定义vue中 css中，可以将某个类名 编译为对应的一个独有类名（实现样式独立模块化）
      localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',//生产环境可以直接用hash来命名类，减少文件体积 
      camelCase: true, // 使用 驼峰法 将 ‘xxx-xxx’形式的类名 转化为 驼峰写法‘’ 
    },

    // postcss:{}, postcss 有全局的 配置文件，可以不需要在vue-loader 中配置

    // hotReload: false  热重载配置，暂时不用设置 根据环境变量来设置
    
    // 可以给 vue 文件 定义 一些自定义的模块加载器，默认的loader有html/js/css三个加载器
    // loaders: {
      //'docs': docsLoader, // 可以自定义 一些 doc-loader 的自定义 loader
      // js: 'coffe-loader', // 甚至可以 给 vue内的js 定义用 coffe-script的loader来解析
    // },

    // preLoader: { js: '....' }, // 定义 vue的预编译时 使用到的 loader，例如 对js 进行预编译使用某个loader
         
    // postLoader: {js: '....'},  // 定义 vue的后编译使用的loader 


  }
}