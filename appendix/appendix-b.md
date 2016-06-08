# Appendix B: Review of the node.js code

The 3 following lines are library includes

	   var favicon = require('serve-favicon');

	   var api = require('./routes/api');

	   var express = require('express');

The 2 important ones are 'api', and 'express'. Express is a standard node.js library which greatly simplifies http routing. Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

A route definition has the following structure:

		app.METHOD(PATH, HANDLER)

where app is an instance of express, METHOD is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), PATH is a path on the server, and HANDLER is the function executed when the route is matched.

The 'api' library uses the request library (which is another node.js standard library for http request on a server). This api module is actually the one requesting an access token from the Autodesk server. The Autodesk web API is protected by the oAuth 2.0 protocol, and to access content and use the API, you need an authorization. This is why you need a consumer key and consumer secret key. You never share these keys with anyone, they will stay on your server, but you can share the temporary access token generated from those keys with the client application to give them access to your content.

The following line to instantiate the express routing module:

		var app = express();

and now you tell 'express' what your sever should do. The first line is to serve all the static files you want any browser to access such as html files, css files, images, zip files, or more. You simply tell express where to find them on your server disk. To secure your server, you want the public folder to be isolated from all the server files:

	   app.use('/', express.static(__dirname + '/www'));

	   app.use(favicon(__dirname + '/www/images/favicon.ico'));

On the following line, you tell express that url requests starting with '/api' should be routed to the api module you included before:

	   app.use('/api', api);

(This sample is a basic server – there is obviously a lot more setup you can (and should) perform on a production server).

Now, you configure your server to use port 3000 by default, or use the port specified by the system variable PORT.

	  app.set('port', process.env.PORT || 3000);

and you launch the server

	   var server = app.listen(app.get('port'), function() {

		  console.log('Server listening on port ' + server.address().port);

	   });

	   
=========================  
[Home](README.md)
