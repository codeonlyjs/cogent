import { Router, WebHistoryRouterDriver, ViewStateRestoration } from "codeonly";

export let router = new Router(new WebHistoryRouterDriver());

new ViewStateRestoration(router);

