import path from 'node:path';
import url from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { bundleFree } from '@codeonlyjs/bundle-free';
import livereload from 'livereload';
import logger from "morgan";
import { SSRWorkerThread, prettyHtml } from '@codeonlyjs/core';

import { config } from "./config.js";
import { api } from "./api.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Setup app
let app = express(); 

// Cookie and body parsers
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable logging
if (app.get('env') === 'production')
    app.use(logger('combined'));
else
    app.use(logger('dev', { stream: { write: (m) => console.log(m.trimEnd()) } } ));

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", api);

// NB: Routes should be registered before the following bundle-free code.
// This is because bundle-free is configured to run "SPA" mode where 
// unrecognized URLs cause client/index.html to be served.

// Prod or Dev?
let bf;
if (app.get('env') === 'production')
{
    console.log("Running as production");

    // Serve bundled client
    app.use(bf = bundleFree({
        path: path.join(__dirname, "../client/dist"),
        spa: !config.ssr,
        default: config.ssr ? false : "index.html",
    }));
}
else
{
    console.log("Running as development");

    // Module handling
    app.use(bf = bundleFree({
        path: path.join(__dirname, "../client"),
        spa: !config.ssr,
        default: config.ssr ? false : "index.html",
        modules: [ 
            "@codeonlyjs/core",
        ],
        replace: [
            { from: "./Main.js", to: "/Main.js" },
        ],
        inYaFace: true,
        livereload: true,
    }));

    // Live reload
    let lrs = livereload.createServer({
    });
    lrs.watch([
        path.join(__dirname, "../client"),
    ]);
}

if (config.ssr)
{
    // Get the entry HTML file and inject bundle-free injections
    let entryHtml = await bf.patch_html_file("", path.join(bf.options.path, "index.html"));

    // Create SSR Worker Thread
    let worker = new SSRWorkerThread();
    await worker.init({
        entryFile: path.join(__dirname, "../client/main_ssr.js"), 
        entryMain: "main_ssr",
        entryHtml,
    });

    // SPA handler
    app.get(/\/.*/, async (req, res, next) => {

        // Only if asking for text/html
        if (req.headers.accept.split(",").indexOf("text/html") < 0)
            return next();

        // Server Side Render
        let url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        let html = await worker.render(url.href);

        // In dev mode, prettify the html
        if (app.get('env') !== 'production')
            html = prettyHtml(html);

        // Send it
        res.send(html);

    });
}

// Not found
app.use((req, res, next) => {
    let err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

// Start server
let server = app.listen(config.server.port, config.server.host, function () {
    console.log(`Server running on [${server.address().address}]:${server.address().port}`);
});


