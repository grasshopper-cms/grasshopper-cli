# Grasshopper CLI


> Grasshopper's command line interface

### Prerequisites


To build a project you will have to the following:

* [Node.js](http://nodejs.org/download/), a platform for easily building fast, scalable network applications.

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

* `grasshopper jump` - Grasshopper setup will walk you through installing Grasshopper dependencies and generate all necessary config files.

* `grasshopper fly` - Automated Grasshopper setup. Scaffolding will be created for this project and files could be overwritten.

![grasshopper fly](https://s3.amazonaws.com/SolidInteractive/images/grasshopper/grasshopper-cli-fly.png)

### Troubleshooting

If for some reason building the grasshopper-admin fails then you can run `bundle install` manually. Just enter this command starting from your new project folder.

`./node_modules/grasshopper-admin$  bundle install`