import { Component, css, html } from "@codeonlyjs/core";
import { config } from "./config.js";
import { stylish } from "@codeonlyjs/stylish";

// The main header
export class Header extends Component
{
    static template = {
        type: "header #header",
        $: [
            {
                type: "a .title",
                href: "/",
                $: [
                    { 
                        type: "img", 
                        src: "/public/logo.svg",
                    },
                    config.appName,
                ]
            },
            {
                type: "div .buttons",
                $: [
                    {
                        type: "input type=checkbox .theme-switch",
                        checked: () => stylish.darkMode ? "" : undefined,
                        on_click: () => stylish.toggleTheme(),
                    },
                ]
            }
        ]
    }
}

css`
:root
{
    --header-height: 50px;
}

#header
{
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--header-height);

    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid var(--gridline-color);
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgb(from var(--back-color) r g b / 75%);
    z-index: 1;

    .title 
    {
        flex-grow: 1;
        display: flex;
        align-items: center;
        color: var(--body-fore-color);
        transition: opacity 0.2s;

        &:hover
        {
            opacity: 75%;
        }

        img
        {
            height: calc(var(--header-height) - 25px);
            padding-right: 10px
        }
    }


    .buttons
    {
        font-size: 12pt;
        display: flex;
        gap: 10px;
        align-items: center;

        .theme-switch
        {
            transform: translateY(-1.5px);
        }
    }
}
`