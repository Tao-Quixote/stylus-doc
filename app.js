/**
 * Created by TaoXin
 * Date: 2017/2/23.
 */
const express = require('express')
const App = require('./libs/app')
const markdown = require('markdown').markdown

const app = express()

App.init(app)

App.addRoutes(app)

app.listen(app.get('PORT'), 'localhost', () => {
  console.log('The server is running on localhost at port:' + app.get('PORT'))
})