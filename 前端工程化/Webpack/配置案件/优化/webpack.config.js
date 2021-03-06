const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const PurgeCssWebpackPlugin = require('purge-css-webpack-plugin')
const glob = require('glob')

module.exports = {
  model: 'development', 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, )
  },
  devServer: {
    hot: true, // 启用热更新
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    noParse: /jquery/,   // 不去解析jquery的依赖关系
    rules: [
      {
        test: /\.js$/,  
        exclude: /node_modules/,  // 排除
        include: path.resolve('src'), // 包含
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),   // 忽略这里面的文件   不打包
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '手搭 Vue 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
    new webpack.NamedModulesPlugin(),  // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new PurgeCssWebpackPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, {nodir: true})
    })
  ]
}