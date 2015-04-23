## Extend your web server to support the upload/translation workflow

(This is a sub-tutorial of the main 'getting started' tutorial, and depends on some steps from that tutorial. Please complete the first part of [https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/blob/master/README.md](that tutorial) if you haven't already done so).

Before you decide if you want to handle translation in your web application, you first need to decide if you want to do the translation from the server or the client. The only important step was to make sure the access token was generated on the server side to avoid anyone to steal your consumer key and secret. That step was done in the previous steps. Now, once you have a valid access token, you can do the translation either on the client (JavaScript code running in the browser) or on the server (JavaScript code running on the node.js server). The path you choose depends on what you want to achieve. Running on the client side means no files are transitioning via your server, and you aren’t using any server CPU time. Running from the server means that you control everything your users are doing.

Either choose ‘Translating from the client’ or ‘Translating from the server’ as the next step. If you've already completed one of them and would like to try another, please revert back to the original status first. You can save your changes with git and checkout the master branch to get a clean start point.

	git checkout -b yourbranchname
	git add .
	git commit -am 'save my changes'
	git checkout master -f 
 
And you can use following command to bring back your changes if you want:
	
	git checkout yourbranchname
	
#### Translating from the client

<b>Step 1:</b> Create a new html page and JavaScript file – i.e. upload.html and upload.js in *www* directory. Then copy the following basic html skeleton code into the file and save it.

upload.html
```
<html>
<head>
    <title>ADN Viewer Demo (client upload)</title>
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-2.1.2.min.js"></script>

    <!-- Bootstrap CSS -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />
   
    <!-- Autodesk.ADN.Toolkit.Viewer -->
    <script src=" https://rawgit.com/Developer-Autodesk/library-javascript-view.and.data.api/master/js/Autodesk.ADN.Toolkit.ViewData.js"></script>
    <script src="/upload.js"></script>
</head>

<body>

</body>
</html>
```

upload.js
```
var oViewDataClient =null ;

$(document).ready (function () {
	oViewDataClient =new Autodesk.ADN.Toolkit.ViewData.AdnViewDataClient (
		'https://developer.api.autodesk.com',
		'http://' + window.location.host + '/api/token'
	) ;
}) ;
```

<b>Step 2:</b> Add controls in your html page to post files for translation. Add the following code between the <body></body> tags. 
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

<b>Step 3:</b> Add the following code in your JavaScript to handle translation.
```
var oViewDataClient =null ;

$(document).ready (function () {
	oViewDataClient =new Autodesk.ADN.Toolkit.ViewData.AdnViewDataClient (
		'https://developer.api.autodesk.com',
		'http://' + window.location.host + '/api/token'
	) ;

	$('#btnTranslateThisOne').click (function (evt) {
		var files =document.getElementById('files').files ;
		if ( files.length == 0 )
			return ;
		var bucket =
			'model'
			+ new Date ().toISOString ().replace (/T/, '-').replace (/:+/g, '-').replace (/\..+/, '')
			+ '-' + '<my_consumer_key>'.toLowerCase ().replace (/\W+/g, '') ;

		createBucket (bucket, files)
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

function createBucket (bucket, files) {
	var bucketData ={
		bucketKey: bucket,
		servicesAllowed: {},
		policy: 'transient'
	} ;
	oViewDataClient.createBucketAsync (
		bucketData,
		//onSuccess
		function (response) {
			console.log ('Bucket creation successful:') ;
			console.log (response) ;
			$('#msg').text ('Bucket creation successful') ;
			uploadFiles (response.key, files) ;
		},
		//onError
		function (error) {
			console.log ('Bucket creation failed:');
			console.log (error) ;
			$('#msg').text ('Bucket creation failed!') ;
		}
	) ;
}

function uploadFiles (bucket, files) {
	for ( var i =0 ; i < files.length ; i++ ) {
		var file =files [i] ;
		//var filename =file.replace (/^.*[\\\/]/, '') ;
		console.log ('Uploading file: ' + file.name + ' ...') ;
		$('#msg').text ('Uploading file: ' + file.name + ' ...') ;
		oViewDataClient.uploadFileAsync (
			file,
			bucket,
			file.name,
			//onSuccess
			function (response) {
				console.log ('File was uploaded successfully:') ;
				console.log (response) ;
				$('#msg').text ('File was uploaded successfully') ;
				var fileId =response.objects [0].id ;
				var registerResponse =oViewDataClient.register (fileId) ;
				if (   registerResponse.Result === "Success"
					|| registerResponse.Result === "Created"
				) {
					console.log ("Registration result: " + registerResponse.Result) ;
					console.log ('Starting translation: ' + fileId) ;
					$('#msg').text ('Your model was uploaded successfully. Translation starting...') ;
					checkTranslationStatus (
						fileId,
						1000 * 60 * 5, // 5 mins timeout
						//onSuccess
						function (viewable) {
							console.log ("Translation was successful: " + response.file.name) ;
							console.log ("Viewable: ") ;
							console.log (viewable) ;
							$('#msg').text ('Translation was successful: ' + response.file.name + '.') ;
							//var fileId =oViewDataClient.fromBase64 (viewable.urn) ;
							AddThisOne (viewable.urn) ;
						}
					) ;
				}
			},
			//onError
			function (error) {
				console.log ('File upload failed:') ;
				console.log (error) ;
				$('#msg').text ('File upload failed!') ;
			}
		) ;
	}
}

function checkTranslationStatus (fileId, timeout, onSuccess) {
	var startTime =new Date ().getTime () ;
	var timer =setInterval (function () {
			var dt =(new Date ().getTime () - startTime) / timeout ;
			if ( dt >= 1.0 ) {
				clearInterval (timer) ;
			} else {
				oViewDataClient.getViewableAsync (
					fileId,
					function (response) {
						var msg ='Translation Progress ' + fileId + ': ' + response.progress ;
						console.log (msg) ;
						$('#msg').text (msg) ;
						if ( response.progress === 'complete' ) {
							clearInterval (timer) ;
							onSuccess (response) ;
						}
					},
					function (error) {
					}
				) ;
			}
		},
		2000
	) ;
}
```
And replace the string ‘&lt;my_consumer_key&gt;’ by your consumer key (not the consumer secret).

<b>Step 4:</b> Connect to your local server using a WebGL-compatible browser, please make sure your node server is running: 

[http://localhost:3000/upload.html](http://localhost:3000/upload.html)

You can get the final source code as zip from [here](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api/archive/v1.0-workshop-client.zip), or using git:
```
git clone https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api.git
git checkout v1.0-workshop-client
```


#### Translating from the server

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

<b>Step 2:</b> Add controls in your html page to post files for translation. Add the following code between the <body></body> tags. 
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

<b>Step 5:</b> Create a file named ‘lmv.js’ in the /routes folder. Then copy the following content into the file and save it.
```
var express =require ('express') ;
var request =require ('request') ;
// unirest (http://unirest.io/) or SuperAgent (http://visionmedia.github.io/superagent/)
var unirest =require('unirest') ;
var events =require('events') ;
var util =require ('util') ;
var path =require ('path') ;
var fs =require ('fs') ;
var credentials =require ('../credentials') ;

// LMV object
function Lmv (bucketName) {
	events.EventEmitter.call (this) ;
	this.bucket =bucketName ;
	this.creds =credentials ;
}
//Lmv.prototype.__proto__ =events.EventEmitter.prototype ;
util.inherits (Lmv, events.EventEmitter) ;

/*static*/ Lmv.getToken =function () {
	try {
		var data =fs.readFileSync ('data/token.json') ;
		var authResponse =JSON.parse (data) ;
		return (authResponse.access_token) ;
	} catch ( err ) {
		console.log (err) ;
	}
	return ('') ;
} ;

// POST /authentication/v1/authenticate
/*static*/ Lmv.refreshToken =function () {
	console.log ('Refreshing Autodesk Service token') ;
	var params ={
		client_id: credentials.ClientId,
		client_secret: credentials.ClientSecret,
		grant_type: 'client_credentials'
	} ;
	var endpoint =credentials.BaseUrl + '/authentication/v1/authenticate' ;
	unirest.post (endpoint)
		.header ('Accept', 'application/json')
		.type ('application/x-www-form-urlencoded')
		.send (params)
		.end (function (response) {
			try {
				if ( response.statusCode != 200 )
					throw response ;
				var authResponse =response.body ;
				console.log ('Token: ' + JSON.stringify (authResponse)) ;
				//authResponse.expires_at =Math.floor (Date.now () / 1000) + authResponse.expires_in ;
				fs.writeFile ('data/token.json', JSON.stringify (authResponse), function (err) {
					if ( err )
						throw err ;
				}) ;
			} catch ( err ) {
				fs.unlinkSync ('data/token.json') ;
				console.log ('Token: ERROR! (' + response.statusCode + ')') ;
			}
		})
	;
} ;

// GET /oss/v1/buckets/:bucket/details
Lmv.prototype.checkBucket =function () {
	var self =this ;
	unirest.get (self.creds.BaseUrl + '/oss/v1/buckets/' + self.bucket + '/details')
		.header ('Accept', 'application/json')
		.header ('Content-Type', 'application/json')
		.header ('Authorization', 'Bearer ' + Lmv.getToken ())
		//.query (params)
		.end (function (response) {
			try {
				if ( response.statusCode != 200 )
					throw response ;
				self.emit ('success', response.raw_body) ;
			} catch ( err ) {
				self.emit ('fail', err) ;
			}
		})
	;
	return (this) ;
} ;

// POST /oss/v1/buckets
Lmv.prototype.createBucket =function (policy) {
	policy =policy || 'transient' ;
	var self =this ;
	unirest.post (self.creds.BaseUrl + '/oss/v1/buckets')
		.header ('Accept', 'application/json')
		.header ('Content-Type', 'application/json')
		.header ('Authorization', 'Bearer ' + Lmv.getToken ())
		.send ({ 'bucketKey': self.bucket, 'policy': policy })
		.end (function (response) {
			try {
				if ( response.statusCode != 200 || !response.raw_body.hasOwnProperty ('key') )
					throw response ;
				self.emit ('success', response.raw_body) ;
			} catch ( err ) {
				self.emit ('fail', err) ;
			}
		})
	;
	return (this) ;
} ;

Lmv.prototype.createBucketIfNotExist =function (policy) {
	policy =policy || 'transient' ;
	var self =this ;

	unirest.get (self.creds.BaseUrl + '/oss/v1/buckets/' + self.bucket + '/details')
		.header ('Accept', 'application/json')
		.header ('Content-Type', 'application/json')
		.header ('Authorization', 'Bearer ' + Lmv.getToken ())
		//.query (params)
		.end (function (response) {
			try {
				if ( response.statusCode != 200 )
					throw response ;
				try {
					self.emit ('success', response.raw_body) ;
				} catch ( err ) {
				}
			} catch ( err ) {
				//- We need to create one if error == 404 (404 Not Found)
				if ( Number.isInteger (err.statusCode) && err.statusCode == 404 ) {
					unirest.post (self.creds.BaseUrl + '/oss/v1/buckets')
						.header ('Accept', 'application/json')
						.header ('Content-Type', 'application/json')
						.header ('Authorization', 'Bearer ' + Lmv.getToken ())
						.send ({ 'bucketKey': self.bucket, 'policy': policy })
						.end (function (response) {
							try {
								if ( response.statusCode != 200 || !response.raw_body.hasOwnProperty ('key') )
									throw response ;
								try {
									self.emit ('success', response.raw_body) ;
								} catch ( err ) {
								}
							} catch ( err ) {
								self.emit ('fail', err) ;
							}
						})
					;
				} else {
					self.emit ('fail', err) ;
				}
			}
		})
	;
	return (this) ;
} ;

// PUT /oss/v1/buckets/:bucket/objects/:filename
Lmv.prototype.uploadFile =function (filename) {
	var self =this ;
	var serverFile =path.normalize (__dirname + '/../' + filename) ;
	var localFile =path.basename (filename) ;

	var file =fs.readFile (serverFile, function (err, data) {
		if ( err )
			return (self.emit ('fail', err)) ;

		var endpoint ='/oss/v1/buckets/' + self.bucket + '/objects/' + localFile.replace (/ /g, '+') ;
		unirest.put (self.creds.BaseUrl + endpoint)
			.headers ({
				'Accept': 'application/json',
				'Content-Type': 'application/octet-stream',
				'Authorization': ('Bearer ' + Lmv.getToken ())
			})
			.send (data)
			.end (function (response) {
				try {
					if ( response.statusCode != 200 )
						throw response ;
					try {
						self.emit ('success', response.raw_body) ;
					} catch ( err ) {
					}
				} catch ( err ) {
					self.emit ('fail', err) ;
				}
			})
		;
	}) ;
	return (this) ;
} ;

// POST /viewingservice/v1/register
Lmv.prototype.register =function (urn) {
	var self =this ;
	var desc ={ 'urn': new Buffer (urn).toString ('base64') } ;

	unirest.post (self.creds.BaseUrl + '/viewingservice/v1/register')
		.headers ({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': ('Bearer ' + Lmv.getToken ())
		})
		.send (desc)
		.end (function (response) {
			try {
				if ( response.statusCode != 200 && response.statusCode != 201 )
					throw response ;
				try {
					self.emit ('success', { 'urn': desc.urn, 'response': response.body }) ;
				} catch ( err ) {
				}
			} catch ( err ) {
				self.emit ('fail', err) ;
			}
		})
	;
	return (this) ;
} ;

Lmv.prototype.status =function (urn, params) {
	var self =this ;
	params =params || {} ;

	var endpoint ='/viewingservice/v1/' + urn + '/status' ;
	unirest.get (self.creds.BaseUrl + endpoint)
		.headers ({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': ('Bearer ' + Lmv.getToken ())
		})
		.query (params)
		.end (function (response) {
			try {
				if ( response.statusCode != 200 )
					throw response ;
				try {
					self.emit ('success', response.body) ;
				} catch ( err ) {
				}
			} catch ( err ) {
				self.emit ('fail', err) ;
			}
		})
	;
	return (this) ;
} ;

var router =express.Router () ;
router.Lmv =Lmv ;
module.exports =router ;

// Utility
if ( !Number.isInteger ) {
	Number.isInteger =function isInteger (nVal) {
		return (
		typeof nVal === 'number'
		&& isFinite (nVal)
		&& nVal > -9007199254740992
		&& nVal < 9007199254740992
		&& Math.floor (nVal) === nVal
		) ;
	} ;
}

// Initialization
function initializeApp () {
	var seconds =1700 ; // Service returns 1799 seconds bearer token
	setInterval (Lmv.refreshToken, seconds * 1000) ;
	Lmv.refreshToken () ; // and now!
}
initializeApp () ;
```

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

<b>Step 9:</b>Press "Ctrl + C" to exit your node server if it is running and restart it by running `node server.js`, connect to your local server using a WebGL-compatible browser: 

[http://localhost:3000/upload.html](http://localhost:3000/upload.html)

You can get the final source code as zip from [here](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api/archive/v1.0-workshop-client.zip), or using git:
```
git clone https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api.git
git checkout v1.0-workshop-server
```

(If you chose to checkout the code instead of creating the files by hand, remember to run the 'npm install' command now).

If you're working through this sub-tutorial as part of the main 'getting started' tutorial, [https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/blob/master/README.md](go back there now) and continue at the 'Customize the Viewer Behavior' section.
