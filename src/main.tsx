import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

// 開発環境でメッセージテスト用のコード
if (import.meta.env.DEV) {
    // URLパラメータでメッセージをテスト
    const urlParams = new URLSearchParams(window.location.search);
    const testMessage = urlParams.get("test_message");

    if (testMessage) {
        // セッションストレージにテストメッセージを保存
        sessionStorage.setItem(
            "keycloak_message",
            JSON.stringify({
                type: "success",
                summary: testMessage
            })
        );
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);
