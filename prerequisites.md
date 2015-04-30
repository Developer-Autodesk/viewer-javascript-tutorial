<a name="Prerequisites"></a>
# Prerequisites

  - [Familiar with git?](#FamiliarWithGit)
  - [Install Node.js](#InstallNodeJs)
  - [Install a code editor](#InstallCodeEditor)
  - [Get the sources](#GetTheSources)
  

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

Your repository git url can be obtain from the 'HTTPs clone URL' box.

 ![](img/githubCloneURL.png)

This creates the a copy of all the source of the repository on your local drive. In this 'clone' directory, you can find the files from the repository which you can work with. 
However, it is important to note here that unless you got write permission, you would not be able to save your changes in the repo. To be able to save in the repo you clone, 
you either need to be a contributor on that repo, or have cloned one of your own repo. If you want to work from someone else repo, and be able to edit and save your changes, 
please consider to 'fork' the repo in your account, and clone that repo instead from your account. See below instructions [how to fork a repo](#Fork).

If you prefer not to install git, you can download a zip file instead by clicking the 'Download ZIP' button.

 ![](img/githubDownload.png)
 
In this workshop, we will provide the command line instructions, but feel free to use the method you prefer.


### Major 'git' operations

```
git status
```
Gives you the list of changes in your working tree vs the repo on GitHub

```
git add <file> [<file>] ...
```
This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit.
A shortcut to add all changes for the next commit is to use `git add -A`

```
git commit -m "my message"
```
Stores the current contents of the index in a new commit along with a log message from the user describing the changes.

```
git push
```
Updates the remote repo with your commit.

```
git pull
```
Get changes from the remote repo in your working tree.

```
git checkout <name>
```
Either checkout a tag version or a branch. Updates files in the working tree to match the version in the index or the specified tree.


### git command line

Using git from the command line on Mac OSX or Linux is straight forward, just open a terminal window (on Mac OSx - Applications -> Utilities -> Terminal.app). git, node, and npm commands should work from there if present on your system.
On Windows, you can choose between few options: a bash console, a powershell console, or the standard command prompt. You can decide which one to use from the Github tool in the settings panel. 
You would access the git console by running the 'Git Shell' icon which should be on your Desktop or in your Programs list. Node and npm commands have their own command prompt window which is 
different from GitHub.


<a name="Fork"></a>
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
[WebStorm](https://www.jetbrains.com/webstorm/) | X | X | X | Paid
	

<a name="GetTheSources"></a>
## Get the sources

We assume you want to start a project and work as a team. For this reason, you want to use 'git' and be able to share the sources across the members of your team, 
and later deploy it on a web server. Your first action will be to fork the material repository on your 'github' account. 
If you prefer not to use git, you can still download the zip files and inflate their contents on your local drive.

* Using git
   - Sign in using your Github account at [http://www.github.com](http://www.github.com)
   - Go to the [Node.js simple server project](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api)
   - Fork the project
   - Copy your fork 'HTTPS clone URL'
   - In the git console, run the following commands:<br />
     ```
	 git clone <your HTTPS clone URL>
	 
	 git checkout v1.0-workshop
	 ```
	 <br />
	 The first command creates the workflow-node.js-view.and.data.api in your current directory. The second command is optional and is there to make sure we work on 
	 the correct version of the material made for this instructions.
   - Change your working directory
     ```
	 cd workflow-node.js-view.and.data.api
	 ```

* Not using git
  - Go to the [Node.js simple server project](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api)
  - Download the ZIP file from [here](https://github.com/Developer-Autodesk/workflow-node.js-view.and.data.api/releases/tag/v1.0-workshop)
  - Inflate the ZIP file on your hard drive
  - Make the inflated directory your current directory
  

The tutorial instructions, from now on, assumes you are running all commands from the *workflow-node.js-view.and.data.api* directory.

  

=========================
[Next](chapter-1.md#Chapter1) - 
[Home](README.md)