# Appendix C: Deploy on the web

In this workshop, you developed your web service on the local machine (i.e. http://localhost/) which means that only yourself and people 
on the same network can eventually access your web site using your ip address.

For example, you can use http://localhost/ or http://127.0.0.1/ to access your machine web site (127.0.0.1 is the default address for your network card),
and other people should use the real ip address instead (usually something like http://192.168.1.55/). Running a web site on the local machine is only 
required for development purprose, but you may want to make the web site available to anyone in the world. To do this you need to deploy your web site 
on a web server.

A very easy way to do this is to use ['heroku'](https://www.heroku.com/) which is pretty easy to use to host a website, and it provides up to 5 free apps.

<b>Step 1</b> Create a separate branch, named as "deployment"

```
$ git checkout -b deployment
```

Edit the .gitignore file so that the credentials.js is included when committing and pushing. Open .gitignore file, scroll down to the bottom, find "credentials.js" and comment it out by putting a hash in front of it: 

```
# API credentials file
# credentials.js 

# webstorm project files
.idea
credentials_.js
```

Commit the changes to "deployment" branch.

```
git add .
git commit -am 'edit the gitignore to include credentials.js to changeset'
```

<b>Step 2</b> Sign up on [heroku.com](https://www.heroku.com/) for a free account

<b>Step 3</b> Download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/) , you can learn more about the [Heroku Command Line Interface](https://devcenter.heroku.com/categories/command-line) if you want to know detailed instruction of the usage.

<b>Step 4</b> Log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
Enter your Heroku credentials.
Email: <your heroku account here>
Password (typing will be hidden): 
Authentication successful.
```

<b>Step 5</b> Create a new Heroku app through command line, it will create an app with random name if you do not give one in command line, it also add a git remote to Heroku so that you can deploy your code by git push.

```
$ heroku create
Creating quiet-shore-6917... done, stack is cedar-14
https://quiet-shore-6917.herokuapp.com/ | https://git.heroku.com/quiet-shore-6917.git
Git remote heroku added
```

<b>Step 6</b>Now your development is ready, you can work on your app following the tutorial [Chapter2](Chapter-2.md) or [Chapter3](Chapter-3.md), and commit your changes to the repository, please note that your changes is not pushed to remote Github or Heroku yet. 

```
git add .
git commit -am 'a running version'
````

<b>Step 7</b> Deploy your website to Heroku using Git once your are ready. Heroku will detect your app and setup the corresponding hosting environment, and then host it for you. 

```
git push heroku master
```

Once the deployment process is completed, ensure that at least one instance of the app is running(do this only once):

```
$ heroku ps:scale web=1
```

<b>Step 8</b> Once the deployment is done, you can open the website by following command line, it launches your website in your default web browser. You can note down the URL if you'd like to switch to another browser. "heroku open" uses HTTPS by default, you need to use HTTP instead for now due to some known issue of viewer, for example, browse to <b>http://</b>quiet-shore-6917.heroku.com instead of https://quiet-shore-6917.heroku.com
 
 ```
heroku open
 ```
 
<b>Step 9</b> Now you can keep working on the project on your local machine, making some changes, testing on local machine and commit when the test is passed until you are ready to deploy.

```
git add .
git commit -am 'some other changes'
``` 
 

<b>Step 10</b> Now you are ready to deploy, deploy your changes to heroku by git push.

```
git push heroku master
``` 
 
You can repeat step 9 ~ 10 to keep working on your project and redeploy it. Heroku will redeploy your app with the updated version. 
 

<b>Note</b>  Go to [heroku.com ](https://dashboard.heroku.com), on the 'Activity' tab of your app, you can see when and if your site was rebuilt successfully or not.


=========================  
[Home](README.md)
