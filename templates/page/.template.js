import shex from "@toptensoftware/shex";

export function describe()
{
    return "Generates a new Component designed to be used as a page in an SPA";
}


export function postWrite(template)
{
    console.log(`Don't forget to add an import so the page's route is registered:`);
    console.log();
    console.log(`    import "./${template.params.name}Page.js";`);
    console.log();
}