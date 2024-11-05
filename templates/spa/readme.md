# Welcome to Your New CodeOnly Project!

Due to the way CORS policy works with JavaScript modules, you need to serve the
site from a server - you can't just open the `index.html` file.

There's two ways to easily do this:

* from the command prompt with `npx serve` (easiest for quick testing) or
* from VS Code with the Live Server extensions (best for development as it 
  has live reload capability).



## Running with npx serve

The easiest way to do this, if you have node installed is to run `npx serve`
in the project directory.

eg:

```
~/Projects/MyCodeOnlyProject$ npx serve

   ┌─────────────────────────────────────────┐
   │                                         │
   │   Serving!                              │
   │                                         │
   │   - Local:    http://localhost:3000     │
   │   - Network:  http://172.20.64.1:3000   │
   │                                         │
   │   Copied local address to clipboard!    │
   │                                         │
   └─────────────────────────────────────────┘
```



## Running in VS Code with Live Server

Another way to run this project is to use VS Code with the 
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

This approach provides automatic live reloading in the browser when you save files.

1. Open the project is VS Code
2. Make sure the extension is installed
3. Click the Go Live button 

(see the Live Server documentation for more)



## Project Structure

The project directory contains your client-side single-page app:

* `index.html` - the root HTML document for the app
* `Main.js` - the main entry point and top-level HTML layout of the site
* `HomePage.js` - the home page component
* `NotFoundPage.js` - the error page if the router can't find a matching route
* `config.js` - configuration settings
* `router.js` - the router
* `Header` - the site header
* `vite.config.js` - Vite configuration for bundling the production site
* `favicon.svg` - favicon for the site (defaults to CodeOnly logo)
* `public/logo.svg` - logo use in top-left of the site's header (defaults to CodeOnly logo)



## Building for Distribution

Once you're ready to ship your application you need to build it.  This will 
bundle CodeOnly and your scripts into a single, optimized and minimized package.

To run the build:

```
~/Projects/MyCodeOnlyProject$ npm install
~/Projects/MyCodeOnlyProject$ npm run build
```

The output files will be placed in the `dist` sub-folder.  You can test it using
`npm run dist`:

```
~/Projects/MyCodeOnlyProject$ npx run dist
```



## Stylish

The project comes preconfigured to use `stylish` for styling - 
[see here](https://toptensoftware.github.io/stylish/).

Since the site supports dark/light modes, be careful when hard-coding colors
in your style declarations. Where possible, use colors derived from those 
declared by Stylish, or make sure you include dark/light versions as appropriate.

Stylish is loaded via CDN.  To reduce the chances of possible future changes
affecting your styling, you might want to copy those files to `server/public`
and reference them from there.


