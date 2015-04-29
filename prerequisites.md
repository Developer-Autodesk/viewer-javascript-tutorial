<a name="Prerequisites"></a>
# Prerequisites


<a name="FamiliarWithGit"></a>
## Familiar with git?

Note that, if you do not have git installed already, you can get it from here: [Windows](https://windows.github.com/), [Mac OSX](https://mac.github.com/), and [Linux](http://git-scm.com/download/linux). 
And get additional setup instructions [here](https://help.github.com/articles/set-up-git).

Git allows a team of people to work together, all using the same files. And it helps the team cope with the confusion that tends to happen when multiple people are editing the same files. 
GitHub is a Git repository hosting service, but it adds many of its own features. While Git is a command line tool, GitHub provides a Web-based graphical interface and a GUI tools. It also 
provides access control and several collaboration features, such as a wikis and basic task management tools for every project..

Here is a [github quick learning tutorial](https://try.github.io/levels/1/challenges/1) if you never used git before. Note it is a command line tutorial, but you may prefer the GUI or WEB interfaces.

If you have a GitHub client ([GitHub for Windows](https://windows.github.com/) or [GitHub for Mac](https://mac.github.com/)) installed, you can clone 
the tutorial [repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data) from GitHub. 
Go to the [Developer-Autodesk/tutorial-getting.started-view.and.data repository](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data) and clone the source 
code by clicking the "Clone in Desktop" button.

 ![](img/githubClone.png)

Here is the equivalent command line:
```
git clone https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data.git
```

This creates the *tutorial-getting.started-view.and.data* directory in your current directory. In this directory, you can find the sample files and finished files in following steps.

If you prefer not to install git, you can download a zip file instead containing the sample model files and finished code snippets from [here](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/archive/master.zip), or by clicking "Download ZIP" button.

 ![](img/githubDownload.png)
 

<a name="InstallNodeJs"></a>
## Install Node.js

If you want to run the preconfigured local web-server and the test tools then you will also need [Node.js v0.12.2+](https://nodejs.org/download/).

You can download a Node.js installer for your operating system from [nodejs.org](http://nodejs.org/download/). Check the version of Node.js that you have installed by running the following command:

	node --version

In Debian based distributions, there is a name clash with another utility called node. The suggested solution is to also install the nodejs-legacy apt package, which renames node to nodejs:

	apt-get install nodejs-legacy npm

	nodejs --version

	npm –version

If you need to run different versions of node.js in your local environment, consider installing [Node Version Manager (nvm)](https://github.com/creationix/nvm).


<a name="DownloadTheSources"></a>
## Download the sources


[Next](https://github.com/Developer-Autodesk/tutorial-getting.started-view.and.data/tree/dev-2.0#)