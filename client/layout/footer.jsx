
import '../assets/styles/footer.styl'
// 由于webpack 配置了 外部引入样式文件的 模块化编译 因此 ‘footer.styl’ 引入需要 用一个 变量来 指代
// import footerStyle from '../assets/styles/footer.styl' // 外部样式文件 模块化引入的 写法

export default {
  data () {
    return {
      author: 'Jokcy'
    }
  },
  render () {
    return (
      // <div id={footerStyle.footer}>
      <div id='footer'>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
