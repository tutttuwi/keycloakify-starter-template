import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function ResetCredentials(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 font-geist">パスワードを忘れた場合</h2>
                    <p className="mt-2 text-sm text-gray-600">パスワードリセットのための情報を入力してください</p>
                </div>

                <div className="text-center">
                    <span className="text-sm text-gray-600">
                        アカウントをお持ちですか？{" "}
                        <a
                            tabIndex={4}
                            href={url.loginUrl}
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            ログインに戻る
                        </a>
                    </span>
                </div>

                <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsSubmitButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                ユーザー名またはメールアドレス
                            </label>
                            <input
                                tabIndex={1}
                                id="username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                name="username"
                                type="text"
                                autoFocus
                                autoComplete="username"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                                placeholder="ユーザー名またはメールアドレス"
                            />
                            {messagesPerField.existsError("username", "password") && (
                                <span id="input-error" className="text-red-600 text-sm mt-1 block" aria-live="polite">
                                    {messagesPerField.getFirstError("username", "password")}
                                </span>
                            )}
                        </div>

                        <div>
                            <button
                                tabIndex={2}
                                disabled={isSubmitButtonDisabled}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                name="login"
                                id="kc-login"
                                type="submit"
                            >
                                {isSubmitButtonDisabled ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        処理中...
                                    </div>
                                ) : (
                                    "続行"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
