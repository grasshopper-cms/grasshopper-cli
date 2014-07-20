# Grasshopper CLI


> Grasshopper's command line interface

Use Grasshopper to drastically speed up development for distributed systems. Support your clients better. For more information about the grasshopper project [click here](http://grasshopper.ws).

### Prerequisites


To build a project you will have to install the following:

* [Node.js](http://nodejs.org/download/), a platform for easily building fast, scalable network applications.

* [MongoDB](http://www.mongodb.org/), an open-source document database that Grasshopper uses for data storage.

* [Grunt](http://gruntjs.com/), the JavaScript task runner

```
npm install -g grunt-cli
```

* [bower](http://bower.io/), a package manager for the web

```
npm install -g bower
```

* Sass: Syntactically Awesome Style Sheets. [Click here](http://sass-lang.com/install) for installation instructions.

* Sass Globbing Plugin (used to compile the admin): Sass globbing allows you to import many sass or scss files in a single import statement.

```
gem install sass-globbing
```

* Sass CSS Importer (used to compile the admin): The Sass CSS Importer allows you to import a CSS file into Sass.

```
gem install sass-css-importer
```

### Installation

Install this `npm` globally to access Grasshopper utilities anywhere on your system.

    npm install -g grasshopper-cli

### Commands

* `grasshopper fly` - Automated Grasshopper setup. Scaffolding will be created for this project and files could be overwritten.

* `grasshopper jump` - Grasshopper setup will walk you through installing Grasshopper dependencies and generate all necessary config files.

* `grasshopper upgrade` - Get the latest version of Grasshopper and rebuild into your existing project. Latest NPMs will be downloaded and the admin application will be recompiled using your existing configuration files. You should read the release notes for any changes that need to be made to your config files. Release notes can be found at [https://github.com/Solid-Interactive/grasshopper-api-js](https://github.com/Solid-Interactive/grasshopper-api-js).

* `grasshopper build` - Recompile your admin application using your existing configuration files.

[Click here](https://s3.amazonaws.com/SolidInteractive/images/grasshopper/grasshopper-cli-fly.mp4) to watch a video of installing and running a grasshopper project.

![grasshopper fly](https://s3.amazonaws.com/SolidInteractive/images/grasshopper/grasshopper-cli-fly.png)

### Contributions

If you have a common pattern that involves Grasshopper, submit your recipe (npms, scaffolding, data). If it would be useful to a large enough audience it can be added into this project.

Submit recommendations and issues to: [https://github.com/Solid-Interactive/grasshopper-cli/issues](https://github.com/Solid-Interactive/grasshopper-cli/issues)

### Troubleshooting

If for some reason building the grasshopper-admin fails then you can run `bundle install` manually. Just enter this command starting from your new project folder.

`./node_modules/grasshopper-admin$  bundle install`

### License

grasshopper-cli is released under a [MIT license](https://github.com/Solid-Interactive/grasshopper-cli/blob/master/LICENSE).