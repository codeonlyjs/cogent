import { Component, Style } from "codeonly";
import { router } from "./router.js";
import { Header } from "./Header.js";

import "./HomePage.js";
import "./NotFoundPage.js";

// Main application
class Main extends Component
{
    constructor()
    {
        super();

        router.addEventListener("didEnter", (from, to) => {

            // Load navigated page into router slot
            if (to.page)
            {
                this.layoutSlot.content = to.page;
            }

        });
    }

    static template = {
        type: "div",
        id: "layoutRoot",
        $: [
            Header,
            {
                type: "div",
                id: "#layoutRoot",
                $: {
                    type: "embed-slot",
                    bind: "layoutSlot",
                }
            }
        ]
    }
}

Style.declare(`
#layoutRoot
{
    padding-top: var(--header-height);
}

`);

// Main entry point, create Application and mount
export function main()
{
    new Main().mount("body");
    router.start();
}