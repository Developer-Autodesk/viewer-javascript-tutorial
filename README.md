# Autodesk View & Data API - Getting Started Tutorial

* Introduction
  - [Audience](#Audience)
  - [What do you need for your project?](#WhatDoYouNeed)
  - [What  are you going to achieve in this workshop?](#WhatAreYouGoingToAchieve.md)

* Prerequisites
  - Familiar with git?
  - Install Node.js
  - Download the sources
  
* View & Data API workshop
  - [Obtaining an API Key](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/blob/dev-2.0/obtaining-an-api-key.md#ObtainingAnAPIKey)
  

<a name="Audience"></a>
## Audience

This documentation is designed for people familiar with [JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) programming and object-oriented programming concepts. 
You should also be familiar with the Autodesk View & Data technology from a user's point of view. You can play with the technology [here](https://360.autodesk.com/viewer) - simply Drag 'n Drop a 2D/3D file, 
and enjoy the result in your browser with no extension or plug-in installed on your computer or device.

This conceptual documentation is designed to let you quickly start exploring and developing applications with the Autodesk View & Data API.


<a name="WhatDoYouNeed"></a>
## What do you need for your project?

The View & Data web service consists of two APIs. The first API is a REST API which allows you to upload and translate 2D/3D models into a light-weight format that can be 
downloaded and displayed by the Second API – a client-side JavaScript API that allows you to embed, customize and automate an interactive 2D/3D model viewer on your web page.

Depending on your needs, you may prefer to write a server or a desktop application to consume the REST API. Your choice will be mainly based on how many files you need to translate, 
and the frequency:

- If you need to translate only one (or very few) of your own models to be viewed by other people, then you may prefer to use a desktop application to do this, or one of our demo pages.

- If you need to translate multiple models in a batch process or allow other users to upload their own files, then a web server implementation will be needed.


<a name="WhatAreYouGoingToAchieve"></a>
## What are you going to achieve in this workshop?

??







## Prepare a model

Now you have your API key, the next step is to upload and translate a model so it can be displayed on your webpage.

### Upload a model on the Autodesk View & Data server

Upload one of your models to your account and get its URN using the following [web page](http://models.autodesk.io).

Alternately, you can also use one of the desktop solutions below if you prefer:

- with a [Windows .NET WPF application](https://github.com/Developer-Autodesk/workflow-wpf-view.and.data.api)

- with a [Swift Mac OS application](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api)

If you prefer using cURL or another programming languages, there are more samples in our [GitHub collection](https://github.com/Developer-Autodesk?utf8=%E2%9C%93&query=workflow), and on our [developer page](http://developer-autodesk.github.io/).

Some 3D model samples are provided right here in this [GitHub tutorial repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data) (in the 'Sample files' folder) if you don't have your own. You can clone or download the repository to access them.

Note that, if you do not have git installed already, you can get it from here: [Windows](https://windows.github.com/), [Mac OSX](https://mac.github.com/), and [Linux](http://git-scm.com/download/linux). And get additional setup instructions [here](https://help.github.com/articles/set-up-git).

If you have a GitHub client ([GitHub for Windows](https://windows.github.com/) or [GitHub for Mac](https://mac.github.com/)) installed, you can clone the tutorial [repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data) from GitHub. Go to the [Developer-Autodesk/tutorial-getting.started-view.and.data repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data) and clone the source code by clicking the "Clone in Desktop" button.

 ![](img/githubClone.png)

Heren is the equivalent command line:

	git clone https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data.git

This creates the *tutorial-getting.started-view.and.data* directory in your current directory. In this directory, you can find the sample files and finished files in following steps.

If you prefer not to install git, you can download a zip file instead containing the sample model files and finished code snippets from [here](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/archive/master.zip), or by clicking "Download ZIP" button.

 ![](img/githubDownload.png)



## Create your web server

For this tutorial, we'll create a minimal Node.js web server to serve your html/css/js files as usual as well as providing code to access your translated files. If you prefer to use another web server technology, you can adapt these instructions yourself to serve the index.html file included with the project.



### Download and setup your local server

Clone the View & Data Node.js basic server to start your web application.

If you have GitHub client installed, you can clone the source code from github.com. Go to [https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api) and clone the source code by click the "Clone in Desktop" button.

 ![](img/node_githubClone.png)

If you prefer command line, using following command.
```
git clone https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api.git
```
This command creates the workflow-node.js-view.and.data.api in your current directory.

Change your current directory to workflow-node.js-view.and.data.api
```
cd workflow-node.js-view.and.data.api
```
If you wish to not install git, you can download a zip file of the sources instead from [here](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api/releases/tag/v1.0-workshop) and or click "Download ZIP" as following screen-shot extract to a folder.

 ![](img/node_githubDownload.png)


The tutorial instructions, from now on, assume you are running all commands from the *workflow-node.js-view.and.data.api* directory.

Last, if you did use git and to make sure we work on the material made for this workshop, execute the following command:
```
git checkout v1.0-workshop
```

Once you have Node.js installed on your machine, and you cloned the repository, you can download the tool dependencies by running:
```
npm install
```
This command will download the following tools, into the node_modules directory:

* express: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* request: Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* serve-favicon: Node.js middleware for serving a favicon.

Rename or copy the ./credentials_.js file into ./credentials.js

Windows
```
copy credentials_.js credentials.js
```
OSX/Linux
```
cp credentials_.js credentials.js
```
Configure your local server with your keys. Replace the placeholder with your own keys in credentials.js, line #29 and #30
```
credentials.ClientId = '<replace with your consumer key>';

credentials.ClientSecret = '<replace with your consumer secret>';
```
Copy the URN which you generated prior installing the server in file /www/index.js at line #18
```
var defaultUrn = '<replace with your encoded urn>';
```
Run the server from the Node.js console, by running the following command:
```
node server.js
```


### View your model in a web browser

Connect to your local server using a WebGL-compatible browser:

[http://localhost:3000/](http://localhost:3000/)

Note that we use port 3000 and not the default http port 80 because if you are on Mac OSX or use Skype, port 80 may be already in use. If you want to use port 80 to avoid having to specify the port in the URL, edit the server.js file and change the default port from 3000 to 80, and restart the node.js server.

### (Optional) Extend your web server to support upload/translation

You already uploaded and translated a model earlier in this tutorial, so adding support for uploading/translating to your node.js server is optional. If you want to add it now, go to [the uploading/translation workflow tutorial](upload_models_workflow.md) and follow the instructions there. Or you can come back and work through that later, if you prefer.

Once you've finished that additional tutorial, or if you chose to skip it, move on to the next section - 'Customize the Viewer Behavior'.


## Customize the Viewer Behavior

Now you've got a basic 3D model displayed on your web page, let's customize the viewer behavior. The simplest way to customize behavior is through the Extension mechanism. Extensions allow you to encapsulate your customized behavior in a separate JavaScript file that you can 'load' into the viewer when it's running (you can unload it whenever you like too).

(If you don't want to type the code, you can copy the finished files for each step from the subfolders in the [GitHub repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data), which you should have cloned or downloaded earlier in this tutorial).

### Step 1 – Creating a basic extension

Create a file named "Viewing.Extension.Workshop.js" (for example), and save it in the www subfolder of the project folder you cloned from GitHub (workflow-node.js-view.and.data.api). Then copy the following basic extension skeleton code into the file and save it:

	///////////////////////////////////////////////////////////////////////////////
	// Demo Workshop Viewer Extension
	// by Philippe Leefsma, April 2015
	//
	///////////////////////////////////////////////////////////////////////////////

	AutodeskNamespace("Viewing.Extension");

	Viewing.Extension.Workshop = function (viewer, options) {

	  /////////////////////////////////////////////////////////////////
	  //  base class constructor
	  //
	  /////////////////////////////////////////////////////////////////

	  Autodesk.Viewing.Extension.call(this, viewer, options);

	  var _self = this;
	  var _viewer = viewer;

	  /////////////////////////////////////////////////////////////////
	  // load callback: invoked when viewer.loadExtension is called
	  //
	  /////////////////////////////////////////////////////////////////

	  _self.load = function () {

		alert('Viewing.Extension.Workshop loaded');
		console.log('Viewing.Extension.Workshop loaded');

		return true;

	  };

	  /////////////////////////////////////////////////////////////////
	  // unload callback: invoked when viewer.unloadExtension is called
	  //
	  /////////////////////////////////////////////////////////////////

	  _self.unload = function () {

		console.log('Viewing.Extension.Workshop unloaded');

		return true;

	  };

	};

	/////////////////////////////////////////////////////////////////
	// sets up inheritance for extension and register
	//
	/////////////////////////////////////////////////////////////////

	Viewing.Extension.Workshop.prototype =
	  Object.create(Autodesk.Viewing.Extension.prototype);

	Viewing.Extension.Workshop.prototype.constructor =
	  Viewing.Extension.Workshop;

	Autodesk.Viewing.theExtensionManager.registerExtension(
	  'Viewing.Extension.Workshop',
	  Viewing.Extension.Workshop);


You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step1

### Step 2 – Reference the extension script

Reference the extension file in your index.html by adding the following script element to the header (change the path if you installed the file anywhere other than the www subfolder):

	<script src="/Viewing.Extension.Workshop.js"></script>


You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step2

### Step 3 – Load the extension in the viewer

All that remains for index.js is to add some code to load the extension into the viewer once it is initialized. If the extension relies on geometry in the model, you should set up an event to wait for the GOEMETRY_LOADED event, as some features may not be usable if the geometry in not fully loaded.

Open index.js and locate the place where you load the viewable in your viewer code:

				viewer.load(pathInfoCollection.path3d[0].path);
			},
			onError);
	});

	function onError(error) {
		console.log('Error: ' + error);
	};

and add the event handler immediately before this line of code, then add a method where you will load the extensions:
<pre>

<b  style='background-color:yellow'>			   viewer.addEventListener(
					Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
					function(event) {
						loadExtensions(viewer);
				});
</b>

				viewer.load(pathInfoCollection.path3d[0].path);
			},
		onError);

	});
<b  style='background-color:yellow'>
	function loadExtensions(viewer) {
		viewer.loadExtension('Viewing.Extension.Workshop');
	}
</b>

	function onError(error) {
		console.log('Error: ' + error);
	};
</pre>

Note: If you copy the modified index.js file from the Step 3 folder in the tutorial [repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data), make sure you edit the defaultURN on line 18 to use the URN of the translated file you created at the beginning of the tutorial.

You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step3

### Step 4 – Testing the extension

Your barebones extension should be ready to run now. All it does is display an alert when it's loaded. Test that the extension is loaded properly by running your sample. (Remember that you setup your node.js project to serve the client page to [http://localhost:3000/](http://localhost:3000/), so open your WebGL-enabled browser and type that address in the address bar). Since all our changes are on client side, you can just refresh your browser to test your changes.

### Step 5 – Adding a selection handler

Now we will add some more interesting functionality to the basic extension:

Start by adding a handler for the SELECTION_CHANGED event to the Extension (i.e. editing the file 'Viewing.Extension.Workshop.js'). This event is triggered when user selects a component in the model. Register your handler callback in the _self.load function, and then add the function definition below that function.
<pre>
	_self.load = function () {

	<b  style='background-color:yellow'>
	  _viewer.addEventListener(
		Autodesk.Viewing.SELECTION_CHANGED_EVENT,
		_self.onSelectionChanged);
	</b>

	  console.log('Viewing.Extension.Workshop loaded');

	  return true;
	};

	<b  style='background-color:yellow'>
	/////////////////////////////////////////////////////////////////
	// selection changed callback
	//
	/////////////////////////////////////////////////////////////////
	_self.onSelectionChanged = function (event) {

	  // event is triggered also when component is unselected

	  // in that case event.dbIdArray is an empty array
	  if(event.dbIdArray.length) {

		var dbId = event.dbIdArray[0];

		//do stuff with selected component
	 }
	  else {


		//all components unselected
	  }
	}
	</b>
</pre>


You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step5

Every element in the displayed model has a unique ID called a dbId. The code you've just written simply stores the dbId of the first element in the list of elements that the user selected. (Usually, the user will only select a single element, but more complete code would handle multiple selected elements).

You can test your code now, if you like. Put a breakpoint in the event handler to check its being called when you select an element. You can use Developer Tool of Chrome or similar tools in other modern browsers to do debugging like setting breaking point, watch variable values, etc.  (Hint: You select a model element by clicking it with you mouse; elements are highlighted in blue when selected).


### Step 6 – Displaying a panel

Now we'll get properties of selected component and display them in a custom viewer panel. Using the viewer UI to create your extensions will help migrating code from one project to another. It helps making your extension non-dependent of the client. However, you can manipulate any other component of your web application from the extension – you could read or write information stored in a separate database, or update a table somewhere else on the webpage., etc, etc.

Add some code to initialize an empty panel in the body of your extension:
<pre>

	/////////////////////////////////////////////////////////////////
	  //  base class constructor
	  //
	  /////////////////////////////////////////////////////////////////

	  Autodesk.Viewing.Extension.call(this, viewer, options);

	  var _self = this;

	  var _viewer = viewer;
<b  style='background-color:yellow'>
	  /////////////////////////////////////////////////////////////////
	  // creates panel and sets up inheritance
	  //
	  /////////////////////////////////////////////////////////////////

	  Viewing.Extension.Workshop.WorkshopPanel = function(
		parentContainer,
		id,
		title,
		options)
	  {
		Autodesk.Viewing.UI.PropertyPanel.call(
		  this,
		  parentContainer,
		  id, title);
	  };

	  Viewing.Extension.Workshop.WorkshopPanel.prototype = Object.create(
		Autodesk.Viewing.UI.PropertyPanel.prototype);

	  Viewing.Extension.Workshop.WorkshopPanel.prototype.constructor =
		Viewing.Extension.Workshop.WorkshopPanel;
</b>
	  /////////////////////////////////////////////////////////////////
	  // load callback: invoked when viewer.loadExtension is called
	  //
	  /////////////////////////////////////////////////////////////////

	  _self.load = function () {
</pre>

Instantiate the panel in your load method, uninitialize it in unload. Edit _self.load and _self.unload as follows
<pre>

	/////////////////////////////////////////////////////////////////
	// load callback: invoked when viewer.loadExtension is called
	//
	/////////////////////////////////////////////////////////////////
	_self.load = function () {


	  _viewer.addEventListener(
		Autodesk.Viewing.SELECTION_CHANGED_EVENT,
		_self.onSelectionChanged);

<b  style='background-color:yellow'>
	  _self.panel = new Viewing.Extension.Workshop.WorkshopPanel (
		_viewer.container,
		'WorkshopPanelId',
		'Workshop Panel');
</b>

	  console.log('Viewing.Extension.Workshop loaded');

	  return true;
	};

	/////////////////////////////////////////////////////////////////
	// unload callback: invoked when viewer.unloadExtension is called
	//
	/////////////////////////////////////////////////////////////////
	_self.unload = function () {

<b  style='background-color:yellow'>
	  _self.panel.setVisible(false);


	  _self.panel.uninitialize();
</b>

	  console.log('Viewing.Extension.Workshop unloaded');


	  return true;
	};
</pre>

Replace the implementation of the selection handler with the following code, so the panel is populated with the properties of the selected element and displayed when an item is selected. Just for fun, we also isolate the component that is clicked:
<pre>

	/////////////////////////////////////////////////////////////////
	// selection changed callback
	//
	/////////////////////////////////////////////////////////////////
	_self.onSelectionChanged = function (event) {

<b  style='background-color:yellow'>
	 function propertiesHandler(result) {

		if (result.properties) {
		  _self.panel.setProperties(
			result.properties);
		  _self.panel.setVisible(true);
		}
	  }


	  if(event.dbIdArray.length) {
		var dbId = event.dbIdArray[0];

		_viewer.getProperties(
		  dbId,
		  propertiesHandler);

		_viewer.fitToView(dbId);
		_viewer.isolateById(dbId);
	  }
	  else {

		_viewer.isolateById([]);
		_viewer.fitToView();
		_self.panel.setVisible(false);
	  }
</b>
	}

</pre>


You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step6


You've now finished writing your extension to respond to a user selecting a model element by displaying that element's properties in a panel and isolating that element in the view. Launch the client page and select a model element by clicking on it. The model and camera view reset if you clear your selection or click in space.

### Step 7 (Bonus step) – Moving the camera

Finally, we'll add some camera animation – orbiting the camera around the model. We will use a simple approach with setInterval. For a more robust approach, take a look at this blog post:

[http://adndevblog.typepad.com/cloud_and_mobile/2015/04/how-to-create-animations-in-the-viewer.html](http://adndevblog.typepad.com/cloud_and_mobile/2015/04/how-to-create-animations-in-the-viewer.html)

Add a property the extension to hold the interval Id, so we can cancel it.
<pre>
	_self.load = function () {

	  _viewer.addEventListener(
		Autodesk.Viewing.SELECTION_CHANGED_EVENT,
		_self.onSelectionChanged);

	  _self.panel = new Viewing.Extension.Workshop.WorkshopPanel (
		_viewer.container,
		'WorkshopPanelId',
		'Workshop Panel');

<b  style='background-color:yellow'>
	  _self.interval = 0;
</b>

	  console.log('Viewing.Extension.Workshop loaded');

	  return true;
	};
</pre>
Add following methods to handle the animation immediately below the end of the _self.onSelectionChanged function implementation.

	  /////////////////////////////////////////////////////////////////
	  // rotates camera around axis with center origin
	  //
	  /////////////////////////////////////////////////////////////////
	  _self.rotateCamera = function(angle, axis) {
		var pos = _viewer.navigation.getPosition();

		var position = new THREE.Vector3(
		  pos.x, pos.y, pos.z);
		var rAxis = new THREE.Vector3(
		  axis.x, axis.y, axis.z);

		var matrix = new THREE.Matrix4().makeRotationAxis(
		  rAxis,
		  angle);

		position.applyMatrix4(matrix);

		_viewer.navigation.setPosition(position);

	  };

	  /////////////////////////////////////////////////////////////////
	  // start rotation effect
	  //
	  /////////////////////////////////////////////////////////////////

	  _self.startRotation = function() {
		clearInterval(_self.interval);

		// sets small delay before starting rotation

		setTimeout(function() {
		  _self.interval = setInterval(function () {
			_self.rotateCamera(0.05, {x:0, y:1, z:0});
		  }, 100)}, 500);

	  };

Finally modify the selection handler to trigger the animation when a component is selected:
<pre>
	/////////////////////////////////////////////////////////////////
	// selection changed callback
	//
	/////////////////////////////////////////////////////////////////
	_self.onSelectionChanged = function (event) {

	  function propertiesHandler(result) {

		if (result.properties) {

		  _self.panel.setProperties(
			result.properties);

		  _self.panel.setVisible(true);
		}
	  }


	  if(event.dbIdArray.length) {

		var dbId = event.dbIdArray[0];

		_viewer.getProperties(
		  dbId,
		  propertiesHandler);

		_viewer.fitToView(dbId);
		_viewer.isolateById(dbId);
<b  style='background-color:yellow'>
		_self.startRotation();
</b>
	  }
	  else {
<b  style='background-color:yellow'>
		clearInterval(_self.interval);
</b>
		_viewer.isolateById([]);
		_viewer.fitToView();
		_self.panel.setVisible(false);
	  }
	}


</pre>

You can also checkout the changes of this step from github by running following command if you have git installed:

	git checkout workshop-viewer-customization-step7

Test your extension again. This time, in addition to displaying the panel, the camera (your view of the model) starts rotating when you select a model element.

### Even more bonus steps

If you've still got some time, go to [http://gallery.autodesk.io](http://gallery.autodesk.io) and play with some of the models and sample extensions available there. The 'Car' model is reasonably detailed ( [http://viewer.autodesk.io/node/gallery/#/viewer?id=551d0768be86fc2c1138b4d4](http://viewer.autodesk.io/node/gallery/#/viewer?id=551d0768be86fc2c1138b4d4)). To test one of the sample Extensions, click on the Extensions menu, then click Manage and click on an Extension's name to enable or disable it. We recommend you only enable one Extension at a time (i.e. disable the last Extension you used before enabling another), because not all the Extensions have been written to play nicely with other Extensions.

To see the source code for those Extensions, go to Extensions and select Source.  Then click on the name of the Extension you're interested in.

Here are two YouTube videos explaining how to use the gallery sample and a couple of the extensions:

[https://www.youtube.com/watch?v=SQJSuqRqiCg](https://www.youtube.com/watch?v=SQJSuqRqiCg)

[https://www.youtube.com/watch?v=tK2ndbvchIM](https://www.youtube.com/watch?v=tK2ndbvchIM)





## Appendix A: More sample and demos

Please refer to [http://developer-autodesk.github.io/](http://developer-autodesk.github.io/)


## Appendix B: Review of the node.js code

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
