<a name="Prerequisites"></a>
# Prerequisites


<a name="FamiliarWithGit"></a>
## Familiar with git?


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

