# Welcome to Your New CodeOnly Project!


## Launching the Project

Due to the way CORS policy works with JavaScript modules, you need to serve the
site from a server - you can't just open the `index.html` file.

There's various ways to do this, but the easiest is with coserv, CodeOnly's
simple file server.

From a command prompt, in the project directory: 

```
~/Projects/MyCodeOnlyProject$ npm install
~/Projects/MyCodeOnlyProject$ npm run dev
```

Running the project this way during development gives you:

* Live reload
* Overlaid error messages in the browser
* Latest version of CodeOnly

## Building for Distribution

Once you're ready to ship your application you need to build it.  This will 
bundle CodeOnly and your scripts into a single, optimized and minimized package.

To run the build:

```
~/Projects/MyCodeOnlyProject$ npm install
~/Projects/MyCodeOnlyProject$ npm run build
```

The output files will be placed in the `dist` sub-folder.  You can test it using
`npm run prod`:

```
~/Projects/MyCodeOnlyProject$ npx run prod
```



## Project Structure

The project directory contains your client-side single-page app:

* `index.html` - the root HTML document for the app
* `Main.js` - the main entry point and top-level HTML layout of the site
* `HomePage.js` - the home page component
* `NotFoundPage.js` - the error page if the router can't find a matching route
* `config.js` - configuration settings
* `router.js` - the router
* `Header` - the site header
* `rollup.config.js` - Rollup configuration for bundling the production site
* `coserv.config.js` - coserv development server configuration
* `favicon.svg` - favicon for the site (defaults to CodeOnly logo)
* `public/logo.svg` - logo use in top-left of the site's header (defaults to CodeOnly logo)


## Stylish

The project comes preconfigured to use `stylish` for styling - 
[see here](https://toptensoftware.github.io/stylish/).

Since the site supports dark/light modes, be careful when hard-coding colors
in your style declarations. Where possible, use colors derived from those 
declared by Stylish, or make sure you include dark/light versions as appropriate.

Stylish is loaded via CDN.  To reduce the chances of possible future changes
affecting your styling, you might want to copy those files to `./public`
and reference them from there.


