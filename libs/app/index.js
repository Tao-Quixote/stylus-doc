var express = require('../../node_modules/express');
var pug = require('../../node_modules/pug');
var fs = require('fs');

exports = module.exports = {
	init (app) {
		// set seiries
		app.set('views', './views');
		app.engine('pug', pug.__express);
		app.set('view engine', 'pug');
		app.set('PORT', process.env.PORT || 3000);
		
		// static resources
		app.use(express.static('./static'));
		
		// disabled
		app.disable('x-powered-by');
	},
	addRoutes
}

function handleHtml(path, res,next) {
	var file = path.split('/')[1];
	fs.access('./views/html/' + file, fs.constants.R_OK, err => {
		if(err) {
			console.log('err: ' + err);
			next();
		} else {
			res.render('html/' + file);
		}
	});
}

function handleJson(path, res, next) {
	var file = path.split('/')[1];
	res.set('Content-Type', 'text/json');
	fs.access('./views/json/' + file, fs.constants.R_OK, err => {
		if(err) {
			console.log('err: ' + err);
			next();
		} else {
			fs.readFile('./views/json/' + file, (err, data) => {
				if(err) {
					console.log('err: ' + err);
					next();
				} else {
					res.send(data);
				}
			})
		}
	});
}

function addRoutes(app) {
	app.all('/*', function(req, res, next) {
		res.send('The server is running...');
  });
	// app.all('/*', function (req, res, next) {
	// 	var path = req.path;
	// 	if(path === '/') {
	// 		res.render('html/index.html');
	// 	} else if(path.match(/\.html$/)) {
	// 		handleHtml(path, res, next);
	// 	} else if(path.match(/\.json$/)) {
	// 		handleJson(path, res, next);
	// 	} else {
	// 		next();
	// 	}
	// });
	//
	// // Page 404
	// app.use(function (req, res) {
	// 	res.status(404);
	// 	res.render('errors/404', {
	// 		title: "Not Found"
	// 	});
	// });
	//
	// // Page 500
	// app.use(function (err, req, res, next) {
	// 	if(err) {
	// 		console.log(err);
	// 	}
	// 	res.status(500);
	// 	res.render('errors/500', {
	// 		title: "Internal Server Error"
	// 	});
	// });
}