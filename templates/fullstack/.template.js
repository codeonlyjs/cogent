export function describe()
{
    return "Generates a new full-stack project";
}


export function preGenerate(template)
{
}

export function postWrite(template)
{
    console.log(`Project generated.\nNext steps:\n  cd ${template.outbase}\n  npm install\n  npm run dev`);
}