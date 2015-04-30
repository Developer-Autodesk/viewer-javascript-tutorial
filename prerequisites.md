<a name="Prerequisites"></a>
# Prerequisites

  - [Familiar with git?](#FamiliarWithGit)
  - [Install Node.js](#InstallNodeJs)
  - [Install a code editor](#InstallCodeEditor)
  - [Download the sources](#DownloadTheSources)
  

<a name="FamiliarWithGit"></a>
## Familiar with git?

Note that, if you do not have git installed already, you can get it from here: [Windows](https://windows.github.com/), [Mac OSX](https://mac.github.com/), and [Linux](http://git-scm.com/download/linux). 
And get additional setup instructions [here](https://help.github.com/articles/set-up-git).

Git allows a team of people to work together, all using the same files. And it helps the team cope with the confusion that tends to happen when multiple people are editing the same files. 
GitHub is a Git repository hosting service, but it adds many of its own features. While Git is a command line tool, GitHub provides a Web-based graphical interface and a GUI tools. It also 
provides access control and several collaboration features, such as a wikis and basic task management tools for every project..

Here is a [github quick learning tutorial](https://try.github.io/levels/1/challenges/1) if you never used git before. Note it is a command line tutorial, but you may prefer the GUI or WEB interfaces.

If you have a GitHub client ([GitHub for Windows](https://windows.github.com/) or [GitHub for Mac](https://mac.github.com/)) installed, you can clone 
a repository from GitHub. Go to the the repository you want to download locally and clone the source code by clicking the 'Clone in Desktop' button.

 ![](img/githubClone.png)

Here is the equivalent command line:
```
git clone <your repository git url>
```

Your repository git url can be obtain from the 'HTTPs clone URL'

 ![](img/githubCloneURL.png)

This creates the a copy of all the source of the repository on your local drive. In this 'clone' directory, you can find the files from the repository which you can work with.

If you prefer not to install git, you can download a zip file instead by clicking the 'Download ZIP' button.

 ![](img/githubDownload.png)

In this workshop, we will provide the command line instructions, but feel free to use the method you prefer.

### git command line

Using git from the command line on Mac OSX or Linux is straight forward, just open a console window. git, node, and npm should work from there if present on your system.
On Windows, you can choose between few options: a bash console, a powershell console, or the standard command prompt. You can decide which one to use from the Github tool in the settings panel. 
You would access the git console by running the 'Git Shell' icon which should be on your Desktop or in your Programs list.


### Fork option

Last, someone may want to work on the wokshop and saves this results on his own github account - in this case, you need to 'fork' the repository from your account and clone the 'forked' repository.
To fork a repository, log in Github using your account, go to the repository you want to fork, and press the 'Fork' button.

 ![](img/githubFork.png)
 

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


<a name="InstallCodeEditor"></a>
## Install a code editor

If you have programmed before, you may already have a favorite programmer's editor. However, if you do not, or were thinking about trying other editors anyway, 
spend some time trying and considering these options common in the javascript/node.js community ...

Note, they are not listed in the order of preference.

    | Windows | Mac OSX | Linux | Free/Paid
--- | ------------- | -------------- | -------- | --------------
[Brackets](http://brackets.io/) | X | X | X | Free
[Eclipse](http://eclipse.org/) | X | X | X | Free
[Emacs](http://www.gnu.org/software/emacs/) | X | X | X | Free
[Notepad++](http://notepad-plus-plus.org/) | 	X | - | - | Free
[textmate](http://macromates.com/) | - | X | - | Paid
[Sublime Text](http://www.sublimetext.com/) | X | X | X | Paid
[WEB Storm](https://www.jetbrains.com/webstorm/) | X | X | X | Paid
	

<a name="DownloadTheSources"></a>
## Download the sources

??


=========================
[Next](chapter-1.md#Chapter1) - 
[Home](README.md)