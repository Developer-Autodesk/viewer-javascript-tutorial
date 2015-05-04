<a name="Chapter2"></a>
# Chapter 2 – (Optional) Extend your web server to support upload/translation

- [Choose your option](#Options)
- [Translating from the client](chapter-2a.md#Chapter2a)
- [Translating from the server](chapter-2b.md#Chapter2b)


You already uploaded and translated one model earlier in this tutorial, so adding support for uploading/translating to your node.js server is optional.
For instance, it might be important if your use case involves numerous models and you would like to implement support for automatic upload and translation.
If you want to add it now, choose your option below and follow the instructions there.
You can also come back and work through this step later, if you prefer.

After you've finished or skipped this optional step, move on to the next section – ['Customize the Viewer Behavior'](chapter-3.md#Chapter3).


<a name="Options"></a>
## Choose your option

Before you decide if you want to handle translation in your web application, you first need to decide if you want to do the translation from the server or the client.
It is important to make sure that your access token is generated on the server side, though, to avoid anyone being able to steal your consumer key and secret.
You learned how to generate an access token in the previous steps.
Now that you have a valid access token, you can do the translation either on the client side, e.g., in JavaScript code running
in the browser, or on the server, e.g., JavaScript code running on the node.js server.
The path you choose depends on what you want to achieve.
Running on the client side removes the need for the files to transition via your server, saving some resources and server CPU time.
Running from the server gives you more complete control over what your users are doing.

You can choose either [Translating from the client](chapter-2a.md#Chapter2a) or
[Translating from the server](chapter-2b.md#Chapter2b) as the next step.
If you've already completed one of them and would like to try another,  please revert back to the original status first.
You can save your changes with git and checkout the master branch to get a clean starting point:
```
git checkout -b yourbranchname
git add .
git commit -am 'save my changes'
git checkout master -f
```

You can use the following command to bring back your changes, if you want:
```
git checkout yourbranchname
```


=========================
[Next](chapter-3.md#Chapter3) –
[Home](README.md)