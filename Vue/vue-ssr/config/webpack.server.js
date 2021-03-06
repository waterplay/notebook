/*
 * @Description: 
 * @Date: 2021-03-03 18:03:09
 * @Author: water.li
 */
const base = require('./webpack.base')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const externals = require('webpack-node-externals')

module.exports = merge(base, {
  target: 'node', // 打包出来的结果给node用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: [
    externals() // 第三方模块不需要打包，因为js是在node中运行的，默认可以使用第三方库
  ],
  plugins: [
    new VueSSRServerPlugin(),
    // 把public目录下index.ssr的内容拷贝到dist目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server']
    })
  ]
})