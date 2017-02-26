var express = require('../../node_modules/express');
var ejs = require('../../node_modules/ejs');
var fs = require('fs');

exports = module.exports = {
  init (app) {
    // set seiries
    app.set('views', './views/docs');
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');
    app.set('PORT', process.env.PORT || 3000);

    // static resources
    app.use(express.static('./static'));

    // disabled
    app.disable('x-powered-by');
  },
  addRoutes
}

function handleEn(path, res, next) {
  let filename = path.split('/')[2];
  fs.access('./views/docs/en/' + filename, fs.constants.R_OK, err => {
    if (err) {
      console.log('err: ' + err);
      next();
    } else {
      res.render('en/' + filename);
    }
  });
}

function handleZH(path, res, next) {
  let filename = path.split('/')[2];
  fs.access('./views/docs/zh/' + filename, fs.constants.R_OK, err => {
    if (err) {
      console.log('err: ' + err);
      next();
    } else {
      res.render('zh/' + filename);
    }
  });
}

function addRoutes(app) {
  app.all('/*', function(req, res, next) {
    let path = req.path;
    if ('/' === path) {
      res.render('zh/inde.html')
    } else if (path.match(/^\/en\/\w+\.html$/)) {
      handleEn(path, res, next)
    } else if (path.match(/^\/zh\/\w+\.html$/)) {
      handleZH(path, res,  next)
    }
  });
  // Page 404
  app.use(function (req, res) {
  	res.status(404);
  	res.render('errors/404.html', {
  		title: "Not Found"
  	});
  });
  // Page 500
  app.use(function (err, req, res, next) {
  	if(err) {
  		console.log(err);
  	}
  	res.status(500);
  	res.render('errors/500.html', {
  		title: "Internal Server Error"
  	});
  });
}
