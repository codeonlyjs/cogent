import shex from "@toptensoftware/shex";

export function describe()
{
    return "Generates a new Single Page Application (SPA) project";
}

export function preGenerate(template)
{
    template.params.codeOnlyVersion = "0.1";
}

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