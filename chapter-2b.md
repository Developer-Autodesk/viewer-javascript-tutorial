<a name="Chapter2b"></a>
# Chapter 2 - Translating from the server


<b>Step 1:</b> Create a new html page and JavaScript file in folder /www – i.e. upload.html and upload.js. Then copy the following basic html skeleton code into the file and save it.

upload.html
```
<html>
<head>
    <title>ADN Viewer Demo (server upload)</title>
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-2.1.2.min.js"></script>

    <!-- Bootstrap CSS -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />
   
    <script src="/upload.js"></script>
</head>

<body>

</body>
</html>
```

upload.js
```
$(document).ready (function () {
}) ;
```

<b>Step 2:</b> Add controls in your html page to post files for translation. Add the following code between the &lt;body&gt;&lt;/body&gt; tags. 
```
<div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Upload and translate a file</h3>
            </div>
            <div class="panel-body">
                <input class="form-control" type="file" id="files" name="files" multiple />
                <br />
                <div style="text-align: center;">
                    <a class="btn btn-primary" id="btnTranslateThisOne">Translate this one for me</a>
                </div>

                <br />
                <div id="msg"></div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">My URNs</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-8">
                        <input class="form-control" type="text" id="urn" name="urn" value="" />
                    </div>
                    <div class="col-md-4">
                        <a class="btn btn-primary" id="btnAddThisOne">Add to the list</a>
                    </div>
                </div>

                <br />
                <legend>My URN list</legend>
                <div>Click on a urn below to launch the viewer</div>
                <div id="list"></div>
            </div>
        </div>
    </div>
```

<b>Step 3:</b> Create a folder named ‘data’ in the root of the repo.

<b>Step 4:</b> Add the following node.js modules to the package.json file "dependencies" list. I.e.:
```
"dependencies": {
    "express": "*",
    "request": "*",
    "serve-favicon": "*",
    "body-parser": ">= 1.11.0",
    "formidable": ">= 1.0.17",
    "fs": ">= 0.0.2",
    "unirest": ">= 0.4.0",
    "async": ">= 0.9.0",
    "util": ">= 0.10.3",
    "path": ">=0.11.14"
}
```
Press "Ctrl + C" to exit the node server first if it is running, and execute the command,
```
npm install
```

<b>Step 5:</b> Create a file named ‘lmv.js’ in the /routes folder. Then copy the following [content](https://raw.githubusercontent.com/Developer-Autodesk/workflow-node.js-view.and.data.api/workshop-server/routes/lmv.js) 
into the file and save it. This lmv.js is a javascript library which hides the complexity of accessing the REST API.

<b>Step 6:</b> Create a JavaScript file in the /routes folder – i.e. upload.js. Then copy the following code into the file and save it.
```
var express =require ('express') ;
var bodyParser =require ('body-parser') ;
var formidable = require('formidable')
var fs =require ('fs') ;
var async =require ('async') ;
var lmv =require ('./lmv.js') ;

var router =express.Router () ;
router.use (bodyParser.json ()) ;

router.post ('/file', function (req, res) {
	/*req
		.pipe (fs.createWriteStream ('data/' + req.headers ['x-file-name']))
		.on ('finish', function (err) {
			res.json ({ 'name': req.headers ['x-file-name'] }) ;
		})
		.on ('error', function (err) {
			res.status (500).end () ;
		})
	;*/
	var filename ='' ;

	var form =new formidable.IncomingForm () ;
	form.uploadDir ='data' ;
	form
		.on ('field', function (field, value) {
			console.log (field, value) ;
		})
		.on ('file', function (field, file) {
			console.log (field, file) ;
			fs.rename (file.path, form.uploadDir + '/' + file.name) ;
			filename =file.name ;
		})
		.on ('end', function () {
			console.log ('-> upload done') ;
			if ( filename == '' )
				res.status (500).end ('No file submitted!') ;
			res.json ({ 'name': filename }) ;
		})
	;
	form.parse(req);
}) ;

router.post ('/translate', function (req, res) {
	var filename ='data/' + req.body.name ;
	var bucket =
		'model'
		+ new Date ().toISOString ().replace (/T/, '-').replace (/:+/g, '-').replace (/\..+/, '')
		+ '-' + lmv.Lmv.getToken ().toLowerCase ().replace (/\W+/g, '') ;
	var policy ='transient' ;

	async.waterfall ([
		function (callbacks1) {
			console.log ('createBucketIfNotExist') ;
			new lmv.Lmv (bucket).createBucketIfNotExist (policy)
				.on ('success', function (data) {
					console.log ('Bucket already or now exist!') ;
					callbacks1 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to create bucket!') ;
					callbacks1 (err) ;
				})
			;
		},

		function (arg1, callbacks2) {
			console.log ('async upload') ;
			new lmv.Lmv (bucket).uploadFile (filename)
				.on ('success', function (data) {
					console.log (filename + ' uploaded.') ;
					callbacks2 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to upload ' + filename + '!') ;
					callbacks2 (err) ;
				})
			;
		},

		function (arg1, callbacks3) {
			console.log ('Launching translation') ;
			var urn =JSON.parse (arg1).objects [0].id ;
			new lmv.Lmv (bucket).register (urn)
				.on ('success', function (data) {
					console.log ('Translation requested.') ;
					callbacks3 (null, data) ;
				})
				.on ('fail', function (err) {
					console.log ('Failed to request translation!') ;
					callbacks3 (err) ;
				})
			;
		}

	], function (err, results) {
		if ( err != null ) {
			if ( err.hasOwnProperty ('statusCode') && err.statusCode != 200 )
				return (res.status (err.statusCode).send (err.body.reason)) ;
			if ( !err.raw_body.hasOwnProperty ('key') )
				return (res.status (500).send ('The server did not return a valid key')) ;
			return (res.status (500).send ('An unknown error occurred!')) ;
		}

		res.json (results) ;
	}) ;

}) ;

router.get ('/translate/:urn/progress', function (req, res) {
	var urn =req.params.urn ;
	new lmv.Lmv ('').status (urn)
		.on ('success', function (data) {
			console.log (data.progress) ;
			res.json (data) ;
		})
		.on ('fail', function (err) {
			res.status (404).end () ;
		})
	;
}) ;

module.exports =router ;
```

<b>Step 7:</b> Edit /server.js to add a reference to upload.js and instantiate it
```
var favicon = require('serve-favicon');
var api = require('./routes/api');
var upload = require('./routes/upload');
var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/images/favicon.ico'));
app.use('/api', api);
app.use('/api', upload);

app.set('port', process.env.PORT || 3000);
```

<b>Step 8:</b> Next, add the following code to /www/upload.js and save it
```
$(document).ready (function () {

	$('#btnTranslateThisOne').click (function (evt) {
		var files =document.getElementById ('files').files ;
		if ( files.length == 0 )
			return ;

		$.each (files, function (key, value) {
			var data =new FormData () ;
			data.append (key, value) ;

			$.ajax ({
				url: 'http://' + window.location.host + '/api/file',
				type: 'post',
				headers: { 'x-file-name': value.name },
				data: data,
				cache: false,
				//dataType: 'json',
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				complete: null
			}).done (function (data) {
				$('#msg').text (value.name + ' file uploaded on your server') ;
				translate (data) ;
			}).fail (function (xhr, ajaxOptions, thrownError) {
				$('#msg').text (value.name + ' upload failed!') ;
			}) ;
		}) ;

	}) ;

	$('#btnAddThisOne').click (function (evt) {
		var urn =$('#urn').val ().trim () ;
		if ( urn == '' )
			return ;
		AddThisOne (urn) ;
	}) ;

}) ;

function AddThisOne (urn) {
	var id =urn.replace (/=+/g, '') ;
	$('#list').append ('<div class="list-group-item row">'
			+ '<button id="' + id + '" type="text" class="form-control">' + urn + '</button>'
		+ '</div>'
	) ;
	$('#' + id).click (function (evt) {
		window.open ('/?urn=' + $(this).text (), '_blank') ;
	}) ;
}

function translate (data) {
	$('#msg').text (data.name + ' translation request...') ;
	$.ajax ({
		url: '/api/translate',
		type: 'post',
		data: JSON.stringify (data),
		timeout: 0,
		contentType: 'application/json',
		complete: null
	}).done (function (response) {
		$('#msg').text (data.name + ' translation requested...') ;
		setTimeout (function () { translateProgress (response.urn) ; }, 5000) ;
	}).fail (function (xhr, ajaxOptions, thrownError) {
		$('#msg').text (data.name + ' translation request failed!') ;
	}) ;
}

function translateProgress (urn) {
	$.ajax ({
		url: '/api/translate/' + urn + '/progress',
		type: 'get',
		data: null,
		contentType: 'application/json',
		complete: null
	}).done (function (response) {
		if ( response.progress == 'complete' ) {
			AddThisOne (response.urn) ;
			$('#msg').text ('') ;
		} else {
			var name =window.atob (urn) ;
			var filename =name.replace (/^.*[\\\/]/, '') ;
			$('#msg').text (filename + ': ' + response.progress) ;
			setTimeout (function () { translateProgress (urn) ; }, 500) ;
		}
	}).fail (function (xhr, ajaxOptions, thrownError) {
		$('#msg').text ('Progress request failed!') ;
	}) ;
}
```

<b>Step 9:</b> Press "Ctrl + C" to exit your node server if it is running and restart it by running `node server.js`, connect to your local server using a WebGL-compatible browser: 

[http://localhost:3000/upload.html](http://localhost:3000/upload.html)

You can get the final source code as zip from [here](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api/archive/v1.0-workshop-server.zip), or using git:
```
git checkout v1.0-workshop-server
```

(If you chose to checkout the code instead of creating the files by hand, remember to run the 'npm install' command now).


If you're working through this sub-tutorial as part of the main 'getting started' tutorial, [go back there now](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/blob/master/README.md) 
and continue at the ['Customize the Viewer Behavior'](chapter-3.md#Chapter3) section.


=========================
[Next](chapter-3.md#Chapter3) - 
[Parent](chapter-2.md#Chapter2) - 
[Home](README.md)