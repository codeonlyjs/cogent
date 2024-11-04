import express from 'express';

export let api = express.Router();

// /api/fruits
api.get("/fruits", async (req, res) => {
    res.json({
        fruits: [ 
            { name: "Apples", color: "red" },
            { name: "Pears", color: "green" },
            { name: "Bananas", color: "yellow" },
        ]
    });
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
