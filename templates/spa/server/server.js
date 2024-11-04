import path from 'node:path';
import url from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { bundleFree } from '@toptensoftware/bundle-free';
import livereload from 'livereload';
import logger from "morgan";

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

// Get "config.js"
app.use("/config.js", (req, res) => {
    let publicConfig = Object.assign({}, config);
    delete publicConfig.server;
    let js = `export let config = ${JSON.stringify(publicConfig, null, 4)};`;
    res.setHeader('content-type', 'text/javascript');
    res.send(js);
}); 

// Routes
app.use("/api", api);

// NB: Routes should be registered before the following bundle-free code.
// This is because bundle-free is configured to run "SPA" mode where 
// unrecognized URLs cause client/index.html to be served.

// Prod or Dev?
if (app.get('env') === 'production')
{
    console.log("Running as production");

    // Serve bundled client
    app.use(bundleFree({
        path: path.join(__dirname, "../client/dist"),
        spa: true
    }));
}
else
{
    console.log("Running as development");

    // Module handling
    app.use(bundleFree({
        path: path.join(__dirname, "../client"),
        spa: true,
        modules: [ 
            "@codeonlyjs/core",
        ],
        replace: [
            { from: "./Main.js", to: "/Main.js" },
        ],
        livereload: true,
    }));

    // Live reload
    let lrs = livereload.createServer({
    });
    lrs.watch([
        path.join(__dirname, "../client"),
    ]);
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


