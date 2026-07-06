import { Component, css, router, $ } from "@codeonlyjs/core";
import { config } from "./config.js";

export class HomePage extends Component
{
    static template = {
        type: "main",
        class: "center",
        $: [
            $.h1(`Welcome to ${config.appName} 😀`),
            $.p("It worked! Your new project is up and running!"),
            $.p(`Version ${config.version}`),        
        ]
    }
}

css`
main
{
    padding-top: 50px;
}
`

router.register({
    pattern: "/",
    match: (to) => {
        to.page = new HomePage();
        return true;
    },
});