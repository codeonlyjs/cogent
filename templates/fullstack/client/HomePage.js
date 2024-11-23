import { Component, router, css, $ } from "@codeonlyjs/core";
import { config } from "/config.js";

export class HomePage extends Component
{
    static template = {
        type: "main .center",
        $: [
            $.h1(`Welcome to ${config.appName} 😀`),
            $.p("It worked! Your new project is up and running!"),
            $.h2("Next Steps"),
            $.p("If you're running in development mode, make some changes and notice the site automatically live reload when you save."),
            $.a("Example API Request").href("/api/people/3")
        ]
    }
}

css`
main
{
    padding-top: 50px;
}
`;

router.register({
    pattern: "/",
    match: (to) => {
        to.page = new HomePage();
        return true;
    },
});