# Appendix D: Troubleshooting


* When running node, I got the following error:
   ```
   base [master*]$ node server.js

	module.js:340
		throw err;
			  ^
	Error: Cannot find module 'serve-favicon'
		at Function.Module._resolveFilename (module.js:338:15)
		at Function.Module._load (module.js:280:25)
		at Module.require (module.js:364:17)
		at require (module.js:380:17)
		at Object.<anonymous> (c:\Users\cyrille\Documents\GitHub\workshop\base\server.js:18:15)
		at Module._compile (module.js:456:26)
		at Object.Module._extensions..js (module.js:474:10)
		at Module.load (module.js:356:32)
		at Function.Module._load (module.js:312:12)
		at Function.Module.runMain (module.js:497:10)
   ```
   
   This is because you forgot to execute the ```npm install``` command.
   
   
* I am on ```http://localhost:3000/```, and get a white page - nothing happens :(

  There might be 2 reasons for this:
  
  1. If the page is waiting for the request to come back (page still refreshing). It might be because, you did not provided valid 
     Consumer Key & Secret in a 'credentials.js' file. The sample is using a synchronous HttpRequest to query the access token,
     with an infinite timeout, and it never returns. After a while the browser will display a 'Page(s) Unresponsive' dialog.

  2. If the page returned, but blank. It might be because you did not provided a valid urn reference in '/www/index.js' or via the urn
      query parameter. The urn might not be base64 encoded either. Display the javascript console, you should find a message saying 
	  something like 'Failed to load resource: the server responded with a status of 400 (Bad Request)   index.js:54    Error: 7'
  
  
* The network is not stable or the bandwidth is not good enough, so all my API call to translate files are failing. What are the options?

   See the next topic.
  
  
* I got no network, what can I do?

  Unfortunately, if you do not have a network connection, or a good bandwidth. There isn't much you can do with the REST API and
  authentication which are both required to translate a file into a web lightweight format that the Viewer can use. However, if you are
  only interested to use the Viewer Javascript API (client), there is an option to view file locally.
  
  In both the basic server (Chapter 1 - Get ready with the View & Data API) and client extension (Chapter 3 - Customize the Viewer Behavior),
  you can use local data for your hack and tests.
  
  You do not have to worry anymore about the access token generation, but you would need to edit the /www/index.js and /www/index.html files as follow: <br />
  /www/index.js: remove the whole content of index.js and replace with this:
  ```
  var oViewer =null ;

  $(document).ready(function () {
		
		oViewer =new Autodesk.Viewing.Private.GuiViewer3D ($("#viewerDiv") [0], {}) ; // With toolbar
		oViewer.initialize () ;
		oViewer.load ('<your path to the svf file>') ;

  }) ;
  ```
  /www/index.html, change:
  ```
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-2.1.2.min.js"></script>
  
    <link type="text/css" rel="stylesheet" href="https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css"/>
    <script src="https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js"></script>

    <!-- Autodesk.ADN.Toolkit.Viewer -->
    <script src="https://rawgit.com/Developer-Autodesk/library-javascript-view.and.data.api/master/js/Autodesk.ADN.Toolkit.Viewer.js"></script>
  ```
  to
  ```
    <!-- jquery -->
    <script src="/jquery-2.1.2.js"></script>
  
    <link type="text/css" rel="stylesheet" href="/style.css"/>
    <script src="/viewer3D.min.js"></script>
  ```
  Note: The path is either relative or absolute from the the html page or web server root. It is not the path on your local drive.
  
  You can get various sample models from [here](https://www.dropbox.com/sh/kfuvxi8aygyo9o6/AADz7wcK-xMV-gwUUFlPgm2da?dl=0)
  Once you downloaded the 'bubbles' files: <br />
  i. unzip the model zip file into the 'www' folder <br />
  ii. download and unzip the 'Autodesk viewer engine' in the 'www' folder <br />
  iii. put the path to the viewable in placeholder in the code above. For example, '/13358513-V8Enginef3d/0/1/Design.svf' <br />
  
  
=========================  
[Home](../README.md)
