import fetch from "node-fetch-native";

import { Main } from "./Main.js";
import { Meta } from "./Meta.js";

// This is the main entry point when using server-side rendering
// Anything node/server side specific should be configured here.

// As an example, we've imported the `fetch` module and added it
// to the `globalThis` to make it available globally just like
// in a browser.

// Make node version of fetch available globally
globalThis.fetch = fetch;

export function main_ssr()
{
    new Main().mount("body");
    new Meta().mount("head");
}
