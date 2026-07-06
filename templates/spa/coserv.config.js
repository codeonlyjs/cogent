const config = {
    development: {
        modules: [ 
            "*" 
        ],
        replace: [
            { from: "./Main.js", to: "/Main.js" },
        ],
    },
    production: {
    }
};

export default config;