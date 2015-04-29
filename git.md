# Introduction: Autodesk View & Data API - Getting Started Tutorial


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