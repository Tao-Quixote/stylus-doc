/**
 * Created by TaoXin
 * Date: 2017/2/24.
 */
// 引入内建模块
const fs = require('fs')
const StringDecoder = require('string_decoder').StringDecoder

// 引入第三方模块
const pug = require('pug')
const markdown = require('markdown').markdown

// 初始化StringDecoder
const decoder = new StringDecoder('utf8')

exports = module.exports = {
  transform (srcPath, destPath, filename) {
    let srcFile = srcPath + filename + '.md'
    let destFile = destPath + filename + '.html'
    fs.access(srcFile, fs.constants.R_OK, err => {
      if (err) {
        console.log('err:' + err)
        next()
      } else {
        fs.readFile(srcFile, 'utf8', (err, data) => {
          if (err) {
            console.log('err:' + err)
            next()
          } else {
            let content = markdown.toHTML(decoder.write(data))
            const compileFunction = pug.compileFile('./templates/index.pug')
            let html = compileFunction({
              title: filename,
              content: content
            })
            fs.writeFile(destFile, html, err => {
              if (err) throw err;
              console.log('file ' + filename + ' is written at ' + destPath)
            })
          }
        })
      }
    })
  }
}