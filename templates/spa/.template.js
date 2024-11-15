import shex from "@toptensoftware/shex";


export function postWrite(template)
{
    let $ = shex({
        cwd: template.outbase,
        stdio: 'inherit',
    });

    // Launch VS Code (if installed)
    if ($.which("code", {nothrow: true}))
    {
        $`code . readme.md`;
    }
}