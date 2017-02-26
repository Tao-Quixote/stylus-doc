/**
 * Created by TaoXin
 * Date: 2017/2/24.
 */
const fs = require('fs')

const pugmd2html = require('./libs/pugmd2html')
const mkdir = require('./libs/mkdir')



function md2html(dirs) {
  if (Array.isArray(dirs)) {
    dirs.forEach(dir => {
      fs.readdir(dir, (err, data) => {
        if (err) {
          throw err;
        } else {
          let destPath = ''
          if (dir.match(/\/en\//i)) {
            destPath = './views/docs/en/'
          } else if (dir.match(/\/zh\//i)){
            destPath = './views/docs/zh/'
          }
          mkdir(destPath)
          data.forEach(file => {
            let filename = file.split('.')[0];
            pugmd2html.transform(dir, destPath, filename)
          })
        }
      })
    })
  } else {
    console.error('please input a array of dirs.')
  }
}

let dirs = [
  './docs/en/',
  './docs/zh/'
]
md2html(dirs)
