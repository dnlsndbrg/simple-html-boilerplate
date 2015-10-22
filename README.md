# simple-html-boilerplate
A simple html boilerplate with Browser-Sync live reloading through gulp.

### Requirement
* Make sure [Node.js](https://nodejs.org), [gulp](http://gulpjs.com) and [Browsersync](http://www.browsersync.io/) is installed. 
* To install gulp: `npm install -g gulp`
* To install Browsersync: `npm install -g browser-sync`

### How to install and use
* Install the dependencies with `npm install`
* Start gulp with `gulp`


### What it does
* Not much at the moment. Gulp will watch scss files and html files in the src directory and copy it to the build folder.
* Errors in the css or html will be displayed in a popup
* Browsersync will serve the website at http://localhost:3000 and automatically inject or refresh on changes.

### File structure
```
gulp-boilerplate/
|—— build/
|   |—— index.html
|   |—— css/
|   |   |—— style.css
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— # js files
|—— src/
|   |—— index.html
|   |—— css/
|   |   |—— style.css
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— # js files
|—— gulpfile.js
|—— gulp-logo.png
|—— package.json
|—— README.md
```
