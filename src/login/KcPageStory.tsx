import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./KcContext";
import KcPage from "./KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
import { themeNames, kcEnvDefaults } from "../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}

// メッセージテスト用のヘルパー関数
export const createMessageTest = (pageId: KcContext["pageId"]) => {
    return {
        success: () =>
            createKcPageStory({ pageId }).KcPageStory({
                kcContext: {
                    message: {
                        type: "success",
                        summary:
                            "パスワードリセット用のメールを送信しました。メールをご確認ください。",
                        params: ["test@example.com"]
                    }
                }
            }),
        error: () =>
            createKcPageStory({ pageId }).KcPageStory({
                kcContext: {
                    error: {
                        message: "指定されたメールアドレスが見つかりませんでした。",
                        type: "user_not_found"
                    }
                }
            }),
        warning: () =>
            createKcPageStory({ pageId }).KcPageStory({
                kcContext: {
                    message: {
                        type: "warning",
                        summary:
                            "アカウントがロックされています。しばらく時間をおいてから再度お試しください。"
                    }
                }
            }),
        info: () =>
            createKcPageStory({ pageId }).KcPageStory({
                kcContext: {
                    message: {
                        type: "info",
                        summary:
                            "セキュリティのため、パスワードリセットリンクは24時間後に無効になります。"
                    }
                }
            })
    };
};
