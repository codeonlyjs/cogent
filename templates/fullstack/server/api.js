import express from 'express';
import { fetch } from 'node-fetch-native';

export let api = express.Router();

// People handler
api.get("/people/:id", async (req, res) => {

    // Note, server.js loaded express-async-errors so it's ok
    // to use async route handlers.

    // Normally you'd get data from a database, but as an example
    // we're fetching from SWAPI. eg: try /api/people/3
    let r = await fetch(`https://swapi.dev/api/people/${req.params.id}`);
    if (!r.ok)
    {
        let err = new Error(response.statusText);
        err.status = response.status;
        throw err;
    }
    let data = await r.json();

    // Render JSON data
    res.json(data);
});

// Catch unmatched urls in /api to prevent them from
// being routed to the SPA
api.use((req, res, next) => {
    let err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

// Return errors in /api as JSON
api.use((err, req, res, next) => 
    res.status(err.status ?? 500).json({ 
        status: err.status ?? 500,
        message: err.message ?? ""
    })
);
