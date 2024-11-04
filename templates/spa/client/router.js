import { Router, WebHistoryRouterDriver, ViewStateRestoration } from "codeonly";

export let router = new Router(new WebHistoryRouterDriver());

new ViewStateRestoration(router);

// Register any local anchor link paths that should leave
// the SPA to return null.
router.register({
    pattern: /^\/api\//,
    match: () => null,
});

