<a name="Chapter1"></a>
# Chapter 1 - Get ready with the View & Data API


<a name="ObtainingAnAPIKey"></a>
## Obtaining an API Key

All View & Data API applications accesses the service using an API key. The API key enables you to monitor your application's API usage, and ensures that Autodesk can contact you 
about your application if necessary. Because these keys are used to authenticate your access to the API, this also protects your data from being accessed without your permission.

To create your API key:

* Visit the [Autodesk Developers Page](https://developer.autodesk.com/api/view-and-data-api/) and sign in with your Autodesk Account, or click the Sign Up link to create an account for free 
if you don't already have one.

* Click the 'Create an App' link.

 ![Create an App](img/createApp.png)

* Select the API you want to generate a key for. For this tutorial, select the 'View and Data API'.

 ![Choose view and data API](img/selectAPI.png)

* Complete the form and submit your request by pushing the 'Create App' button. Your application will appear in your application list. (Note: The 'Redirect URL' field is a required field, 
but you don't have to provide a real URL if you don't have one - just add something like 'http://www.mysite.com').

 ![App is created](img/appCreated.png)

* Click on the newly created App to access your Consumer Key and Secret. You can review your App and API keys whenever you like by clicking on the 'My Apps' link after signing in.

 ![](img/showConsummkerKeys.png)

By default, a key can be used on any site / application. However, we strongly recommend that you restrict the use of your key to domains that you administer, to prevent 
use on unauthorized sites. We also recommend you create a new App (API key) for every new application (rather than reusing the same key in multiple applications).


<a name="PrepareAModel"></a>
## Prepare a model

Now you have your API key, the next step is to upload and translate a model so it can be displayed on your webpage.

### Upload a model on the Autodesk View & Data server

Upload one of your models to your account and get its URN using the following [web page](http://models.autodesk.io).

Alternately, you can also use one of the desktop solutions below if you prefer:

- with a [Windows .NET WPF application](https://github.com/Developer-Autodesk/workflow-wpf-view.and.data.api)

- with a [Swift Mac OS application](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api)

If you prefer using cURL or another programming languages, there are more samples in our [GitHub collection](https://github.com/Developer-Autodesk?utf8=%E2%9C%93&query=workflow), 
and on our [developer page](http://developer-autodesk.github.io/).

If you don't have your own, some 2D/3D model samples are provided with this workshop, in the ['Sample files' folder](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/tree/dev-2.0/Sample%20files). 


### Steps to translate a model using the [web page](http://models.autodesk.io).

1. Enter you Consumer key and secret key, and press the 'Get my access token' button

2. Select one of the models from the 'Samples' list. For example the 'Robot Arm' sample. Or Drag 'n Drop one of yours on the gray area. Then press the 'Translation this one for me' button.

3. You should see a progress bar in the 'Currently translating...' area, please give it some time, ...

4. Once the translation is over, You would see your model listed int he 'Ready"' section with the 'urn' that you need later. Make sure to copy and save that urn somewhere for later use.


[Next](chapter-2.md#Chapter2) - 
[Home](README.md)