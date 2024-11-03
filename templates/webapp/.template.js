import shex from "@toptensoftware/shex";


export function postWrite(template)
{
    let $ = shex({
        cwd: template.outbase,
        stdio: 'inherit',
    });

    // Run npm install
    console.log(`Installing NPM packages...`);
    $`npm install`

    // Launch VS Code (if installed)
    if ($.which("code", {nothrow: true}))
    {
        $`code . readme.md`;
    }
}