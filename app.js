/**
 * Created by TaoXin
 * Date: 2017/2/23.
 */
let fs = require('fs')

let express = require('express')
let App = require('./libs/app')
let markdown = require('markdown').markdown

const app = express()

App.init(app)

app.all('/*', (req, res, next) => {
  fs.access('./views/docs/zh/atrules.md', fs.constants.R_OK, err => {
    if(err) {
      console.log('err: ' + err);
      next();
    } else {
      fs.readFile('./views/docs/zh/atrules.md', (err, data) => {
        if(err) {
          console.log('err: ' + err);
          next();
        } else {
          res.send(markdown.toHTML(data));
        }
      })
    }
  });
  res.send(markdown.toHTML())
})

// App.addRoutes(app)

app.listen(app.get('PORT'), 'localhost', () => {
  console.log('The server is running on localhost at port:' + app.get('PORT'))
})