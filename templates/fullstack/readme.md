# Welcome to Your New CodeOnly Project!

## Run the Project

In VS Code:

    * Just run the project (it'll run under nodemon)

From the command line:

    * `npm run dev` - run the site in development mode
    * `npm run prod` - run the site in production mode

Once running, you can view your site at <http://localhost:3000>



## Project Structure

The `client` directory contains the client side scripts for your app:

* `config.js` - config file with app name and description
* `HomePage.js` - the home page component
* `Header.js` - the site header bar
* `index.html` - the HTML entry point for the app
* `main_ssr.js` - the server-side entry point when using server-side rendering (SSR)
* `Main.js` - the JavaScript entry point and top-level HTML layout of the site
* `Meta.js` - meta information component (inserts title and meta tags in head section)
* `NotFoundPage.js` - the error page if the router can't find a matching route
* `vite.config.js` - Vite configuration for bundling the production site

The `server` directory contains the ExpressJS server:

* `server.js` - the main entry point to the server
* `config.js` - server side configuration
* `api.js` - route handler for `/api` routes
* `public\favicon.svg` - favicon for the site (defaults to CodeOnly logo)
* `public\logo.svg` - logo use in top-left of the site's header (defaults to CodeOnly logo)



## Development vs Production Mode

In development mode:

* The client app files are served directly by ExpressJS.  
* Configured NPM packages are served using [`bundle-free`](https://github.com/codeonlyjs/bundle-free) 
  (see server.js).
* The server runs [`live-reload`](https://www.npmjs.com/package/livereload) so changes made in 
  client folder are automatically reflected in connected browsers (see server.js for configuration
  of live-reload).

Note that in development mode, an automatically modified version the `client/index.html` 
file is served by bundle-free with the following changes:

* import maps are added to support references to NPM packages,
* the live-reload script is added
* other string replacements as configured in `server.js`

In production mode:

* the client app is built/bundled using Vite 
* the server serves the `client/dist` folder.  The node_modules folder isn't
  served in production mode.



## CodeOnly Version

This project is configured to run against specific version of CodeOnly.

The version is determined by the installed NPM package (see package.json). 
Use `npm install` to switch to a specific version:

eg: to install version 0.0.73:

```
npm install --save codeonlyjs/core#v0.0.73
```

eg: to install latest:

```
npm install --save codeonlyjs/core
```


## Server Side Rendering

The project is configured to support server side rendering but it is disabled by 
default.  

To enable SSR change the `ssr` setting in `./server/config.js` to true.

Note: server side rendering is a complex topic - see the CodeOnly documentation
for more information.



## Stylish

The project comes preconfigured to use `stylish` for styling - 
[see here](https://toptensoftware.github.io/stylish/).

Since the site supports dark/light modes, be careful when hard-coding colors
in your style declarations. Where possible, use colors derived from those 
declared by Stylish, or make sure you include dark/light versions as appropriate.

Stylish is loaded via CDN.  To reduce the chances of possible future changes
affecting your styling, you might want to copy those files to `server/public`
and reference them from there.



## Docker

The project has been pre-configured to run in a docker container:

    * `npm run up` - runs the site in production mode in a docker container
    * `npm run down` - stops a previously started docker container


