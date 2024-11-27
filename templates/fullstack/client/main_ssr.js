import fetch from "node-fetch-native";
import { Main } from "./Main.js";
import { Meta } from "./Meta.js";

globalThis.fetch = fetch;

export function main_ssr()
{
    new Main().mount("body");
    new Meta().mount("head");
}