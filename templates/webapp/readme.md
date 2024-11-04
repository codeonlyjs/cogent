# Welcome to Your New CodeOnly Project!

## Run the Project

In VS Code:

    * just run the project, we've already configured `.vscode/launch.json`

From the command line:

    * `npm run dev` - run the site in development mode
    * `npm run prod` - run the site in production mode

Once running, you can view your site at <http://localhost:3000>



## Project Structure

The `client` directory contains the client side scripts for your app:

* `index.html` - the root HTML document for the app
* `Main.js` - the main entry point and top-level HTML layout of the site
* `HomePage.js` - the home page component
* `NotFoundPage.js` - the error page if the router can't find a matching route
* `router.js` - the router
* `Header` - the site header
* `vide.config.js` - Vite configuration for bundling the production site

The `server` directory contains the ExpressJS server:

* `server.js` - the main entry point to the server
* `config.js` - configuration settings available to both the server and client apps.
* `public\favicon.svg` - favicon for the site (defaults to CodeOnly logo)
* `public\logo.svg` - logo use in top-left of the site's header (defaults to CodeOnly logo)



## Development vs Production Mode

In development mode, the client app files are served directly by the ExpressJS.  It
also serves configured NPM packages using [`bundle-free`](https://github.com/codeonlyjs/bundle-free) 
(see server.js).

Also, in development mode the server runs [`live-reload`](https://www.npmjs.com/package/livereload) 
so changes made in client folder are automatically reflected in connected browsers (see server.js for 
configuration of live-reload).

Note that in development mode, an automatically modified version the `client/index.html` 
file is served by bundle-free with the following changes:

* import maps are added to support references to NPM packages,
* the live-reload script is added
* other string replacements as configured in `server.js`

In production mode, the client app is built/bundled using Vite and the server 
serves the `client/dist` folder it produces.  The node_modules folder isn't
served in production mode.



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


