import path from 'node:path';
import url from 'node:url';
import fs from "node:fs";
import { clargs, showArgs } from "@toptensoftware/clargs";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
function showHelp()
{
    console.log("\nUsage: npx codeonlyjs/cogent list");

    console.log("\nOptions:");
    showArgs({
        "-h, --help":    "Show this help",
    });
}



export async function cmdList(argsIn)
{
    let args = clargs(argsIn);

    // Check command line args
    while (args.next())
    {
        switch (args.name)
        {
            case "help":
                showHelp();
                process.exit(0);

            case null:
                throw new Error(`Unknown command line arg: ${args.readValue()}`);

            default:
                throw new Error(`Unknown command line option: ${args.name}`);
        }
    }

    // List available templates
    let templateDir = path.join(__dirname, `templates/`);

    // Read directory
    let files = fs.readdirSync(templateDir);
    for (let f of files)
    {
        try
        {
            let stat = fs.statSync(path.join(templateDir, f));
            if (stat.isDirectory())
            {
                let description = null;
                let templateScript = path.join(templateDir, f, ".template.js");
                if (fs.existsSync(templateScript))
                {
                    let t = await import("file://" + templateScript);
                    description = t.describe?.() ?? null;
                }
                if (description)  
                    console.log(`${f} - ${description}`);
                else    
                    console.log(f);
            }
        }
        catch
        {
            continue;
        }
    }
}
