#!/usr/bin/env node

import path from 'node:path';
import url from 'node:url';
import { clargs, showPackageVersion, showArgs } from "@toptensoftware/clargs";

import { cmdNew } from "./cmdNew.js";
import { cmdList } from "./cmdList.js";

// Get dirname
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function showVersion()
{
    showPackageVersion(path.join(__dirname, "package.json"));
}

function showHelp()
{
    showVersion();

    console.log("\nUsage: npx codeonlyjs/cogent [options] <command> [args]");

    console.log("\nOptions:");
    showArgs({
        "<command>":     "Command to execute",
        "-v, --version": "Show version info",
        "-h, --help":    "Show this help",
    });

    console.log("\nCommand:");
    showArgs({
        "new":     "Generate code using a template",
        "list":    "List available templates"
    });

    console.log("\nRun 'cogent <cmd> --help' for command specific help.");
}

let args = clargs();

// Check command line args
while (args.next())
{
    switch (args.name)
    {
        case "help":
            showHelp();
            process.exit(0);

        case "version":
            showVersion();
            process.exit(0);

        case null:
            switch (args.readValue())
            {
                case "new":
                    await cmdNew(args.readTail());
                    break;

                case "list":
                    await cmdList(args.readTail());
                    break;

                default:
                    throw new Error(`Unknown command: ${args.readValue()}`);
            }
            break;

        default:
            throw new Error(`Unknown command line option: ${args.name}`);
    }
}

