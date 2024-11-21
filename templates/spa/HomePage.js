import { Component, css, $ } from "@codeonlyjs/core";
import { router } from "./router.js";
import { config } from "./config.js";

export class HomePage extends Component
{
    static template = {
        type: "main",
        class: "center",
        $: [
            $.h1(`Welcome to ${config.appName} 😀`),
            $.p("It worked! Your new project is up and running!"),
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