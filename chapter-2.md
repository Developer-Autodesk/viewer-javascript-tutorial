<a name="Chapter2"></a>
# Chapter 2 - (Optional) Extend your web server to support upload/translation

- [Choose your option](#Options)
- [Translating from the client](chapter-2a.md#Chapter2a)
- [Translating from the server](chapter-2b.md#Chapter2b)


You already uploaded and translated a model earlier in this tutorial, so adding support for uploading/translating to your node.js server is optional.
If you want to add it now, choose your option below and follow the instructions there. 
Or you can come back and work through that later, if you prefer.

Once you've finished that additional tutorial, or if you chose to skip it, move on to the next section - ['Customize the Viewer Behavior'](chapter-3.md#Chapter3).


<a name="Options"></a>
## Choose your option

Before you decide if you want to handle translation in your web application, you first need to decide if you want to do the translation from the server or the client.
The only important step was to make sure the access token was generated on the server side to avoid anyone to steal your consumer key and secret.
That step was done in the previous steps. Now, once you have a valid access token, you can do the translation either on the client (JavaScript code running 
in the browser) or on the server (JavaScript code running on the node.js server). The path you choose depends on what you want to achieve. Running on the client 
side means no files are transitioning via your server, and you aren’t using any server CPU time. Running from the server means that you control everything your 
users are doing.

Either choose [‘Translating from the client’](chapter-2a.md#Chapter2a) or [‘Translating from the server’](chapter-2b.md#Chapter2b) as the next step. If you've already 
completed one of them and would like to try another,  please revert back to the original status first. You can save your changes with git and checkout the master branch 
to get a clean start point.
```
git checkout -b yourbranchname
git add .
git commit -am 'save my changes'
git checkout master -f 
```
 
And you can use following command to bring back your changes if you want:
```
git checkout yourbranchname
```	

	

[Next](chapter-3.md#Chapter3) - 
[Home](README.md)