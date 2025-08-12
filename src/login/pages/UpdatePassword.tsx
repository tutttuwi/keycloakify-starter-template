import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import MessageDisplay from "../components/MessageDisplay";
import { useKeycloakMessage } from "../hooks/useKeycloakMessage";

export default function UpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss: false,
        classes: {}
    });

    const { url, messagesPerField, message: kcMessage, error: kcError } = kcContext;

    // const { msgStr } = i18n;

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    // Keycloakメッセージを取得
    const { message: urlMessage, error: urlError } = useKeycloakMessage();

    // 優先順位: kcContext > URLパラメータ
    const displayMessage = kcMessage || urlMessage;
    const displayError = kcError || urlError;

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/src/login/assets/img/background.jpg')" }}
        >
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 font-geist">新しいパスワードの設定</h2>
                    <p className="mt-2 text-sm text-gray-600">新しいパスワードを入力してください</p>
                </div>

                {/* Keycloakメッセージ表示 */}
                <MessageDisplay message={displayMessage} error={displayError} />

                <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
                    <form
                        id="kc-passwd-update-form"
                        onSubmit={() => {
                            setIsSubmitButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="password-new" className="block text-sm font-medium text-gray-700 mb-2">
                                新しいパスワード
                            </label>
                            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                                <input
                                    tabIndex={1}
                                    id="password-new"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    name="password-new"
                                    type="password"
                                    autoFocus
                                    autoComplete="new-password"
                                    aria-invalid={messagesPerField.existsError("password-new")}
                                    placeholder="新しいパスワード"
                                />
                            </PasswordWrapper>
                            {messagesPerField.existsError("password-new") && (
                                <span id="input-error-password-new" className="text-red-600 text-sm mt-1 block" aria-live="polite">
                                    {messagesPerField.getFirstError("password-new")}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-2">
                                新しいパスワード（確認）
                            </label>
                            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                                <input
                                    tabIndex={2}
                                    id="password-confirm"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    name="password-confirm"
                                    type="password"
                                    autoComplete="new-password"
                                    aria-invalid={messagesPerField.existsError("password-confirm")}
                                    placeholder="新しいパスワード（確認）"
                                />
                            </PasswordWrapper>
                            {messagesPerField.existsError("password-confirm") && (
                                <span id="input-error-password-confirm" className="text-red-600 text-sm mt-1 block" aria-live="polite">
                                    {messagesPerField.getFirstError("password-confirm")}
                                </span>
                            )}
                        </div>

                        <div>
                            <button
                                tabIndex={3}
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
                                        更新中...
                                    </div>
                                ) : (
                                    "パスワードを更新"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                    </svg>
                ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
