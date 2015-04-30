<a name="Chapter2a"></a>
# Chapter 2 - Translating from the client

	
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
git checkout v1.0-workshop-client
```


If you're working through this sub-tutorial as part of the main 'getting started' tutorial, [go back there now](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/blob/master/README.md) 
and continue at the ['Customize the Viewer Behavior'](chapter-3.md#Chapter3) section.


=========================
[Next](chapter-3.md#Chapter3) - 
[Parent](chapter-2.md#Chapter2) - 
[Home](README.md)
