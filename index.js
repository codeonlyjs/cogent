#!/usr/bin/env node

import path from 'node:path';
import url from 'node:url';
import fs from "node:fs";
import inflection from 'inflection';
import moe from "@toptensoftware/moe-js";
import { clargs } from "@toptensoftware/clargs";
import { parse } from "yaml";

// Get dirname
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

Object.assign(moe.helpers, inflection);

// Load the specified template file
async function loadTemplate(name)
{
    let inbase = path.join(__dirname, `templates/${name}/`);
    try
    {
        let stat = fs.statSync(inbase);
        if (stat.isDirectory())
            return {
                inbase,
                params: {},
            }
    }
    catch (err)
    {
        throw new Error(`template '${name}' not found (${err.message})`);
    }

    throw new Error(`'${inbase}' is not a directory`);
}

// Parse arguments and return a template to process
async function parseArgs()
{
    let args = clargs();

    let template;

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
                if (args.value == "new")
                {
                    if (template)
                        throw new Error("Multiple `new` commands found");
                    
                    // Next argument
                    if (!args.next() || args.name)
                        throw new Error("Missing template name after `new`");

                    // Load template
                    template = await loadTemplate(args.value);

                    // Load name parameter
                    let cap = args.capture();
                    if (args.next() && !args.name)
                    {
                        template.params.name = args.value;
                    }
                    else
                    {
                        args.restore(cap);
                    }

                    continue;
                }

                throw new Error(`Unknown command line arg: ${args.value}`);

            default:
                if (template)
                    template.params[args.name] = args.value;
                else
                    throw new Error(`Unknown command line arg: ${args.name}`);
                break;
        }
    }

    return template;
}

function mkdirp(targetDir)
{
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(parentDir, childDir);
      if (!fs.existsSync(curDir)) {
        fs.mkdirSync(curDir);
      }

      return curDir;
    }, initDir);
}


async function generateTemplate(template)
{
    // Get all files
    let files = fs.readdirSync(template.inbase, { recursive: true });

    template.outputs = [];
    template.outbase = null;
    let script;

    // Process each file
    for (let i=0; i<files.length; i++)
    {
        let srcFile = path.join(template.inbase, files[i]);

        // Ignore directories
        let stat = fs.statSync(srcFile);
        if (stat.isDirectory())
            continue;

        // Script file
        if (files[i] === ".template.js")
        {
            script = await import("file://" + srcFile);
            continue;
        }

        // load file
        let src = fs.readFileSync(srcFile, "utf8");

        // Create output
        let output = {
            src,
            out: files[i],
        }
        template.outputs.push(output);

        // moejs file?
        if (files[i].endsWith(".moe"))
        {
            output.template = moe.compile(src);
            output.out = output.out.substring(0, output.out.length - 4);
        }
    }

    // Call pre-generate
    await script?.preGenerate?.(template);

    // Generate
    for (let output of template.outputs)
    {
        if (output.template)
        {
            output.content = output.template(template.params);
        }
        else
        {
            output.content = output.src;
        }

        // Get file front matter
        output.frontmatter = {};
        output.content = output.content.replace(/\r\n/g, "\n");
        output.content = output.content.replace(/^---([\s\S]*?)---\n/, (m, m1) => {
            output.frontmatter = parse(m1);
            return "";
        });

        if (output.frontmatter.out)
            output.out = output.frontmatter.out;
        if (output.frontmatter.base)
        {
            if (template.outbase != null && template.outbase != output.frontmatter.base)
                throw new Error("Multiple conflicting `base` settings");
            template.outbase = output.frontmatter.base;
        }
    }

    // Call post generate
    await script?.postGenerate?.(template);

    // Apply out base directory
    if (template.outbase != null)
    {
        for (let o of template.outputs)
        {
            o.out = path.join(template.outbase, o.out);
        }
    }

    // Check not files already exist
    let existing = false;
    for (let o of template.outputs)
    {
        if (fs.existsSync(o.out))
        {
            console.error(`exists: ${o.out}`);
            existing = true;
        }
    }

    if (existing)
        throw new Error(`One or more files already exists, aborting`);

    // Call preWrite
    await script?.preWrite?.(template);

    // Save
    for (let o of template.outputs)
    {
        mkdirp(path.dirname(o.out));
        fs.writeFileSync(o.out, o.content, "utf8");
        console.error(`created: ${o.out}`);
    }

    // Call postWrite
    await script?.postWrite?.(template);
}

// Parse args
let template = await parseArgs();
if (template)
{
    await generateTemplate(template);
}

console.log("Done");
