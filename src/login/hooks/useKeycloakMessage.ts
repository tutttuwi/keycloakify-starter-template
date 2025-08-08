import { useEffect, useState } from "react";

interface KeycloakMessage {
    type: "success" | "warning" | "error" | "info";
    summary: string;
    params?: string[];
}

interface KeycloakError {
    message: string;
    type?: string;
}

export function useKeycloakMessage() {
    const [message, setMessage] = useState<KeycloakMessage | undefined>();
    const [error, setError] = useState<KeycloakError | undefined>();

    useEffect(() => {
        // URLパラメータからメッセージを取得
        const urlParams = new URLSearchParams(window.location.search);
        const messageParam = urlParams.get("message");
        const errorParam = urlParams.get("error");
        const successParam = urlParams.get("success");

        if (messageParam) {
            try {
                const decodedMessage = decodeURIComponent(messageParam);
                setMessage({
                    type: "info",
                    summary: decodedMessage
                });
            } catch (e) {
                console.warn("Failed to decode message parameter:", e);
            }
        }

        if (errorParam) {
            try {
                const decodedError = decodeURIComponent(errorParam);
                setError({
                    message: decodedError
                });
            } catch (e) {
                console.warn("Failed to decode error parameter:", e);
            }
        }

        if (successParam) {
            try {
                const decodedSuccess = decodeURIComponent(successParam);
                setMessage({
                    type: "success",
                    summary: decodedSuccess
                });
            } catch (e) {
                console.warn("Failed to decode success parameter:", e);
            }
        }

        // セッションストレージからメッセージを取得
        const sessionMessage = sessionStorage.getItem("keycloak_message");
        const sessionError = sessionStorage.getItem("keycloak_error");

        if (sessionMessage) {
            try {
                const parsedMessage = JSON.parse(sessionMessage);
                setMessage(parsedMessage);
                sessionStorage.removeItem("keycloak_message");
            } catch (e) {
                console.warn("Failed to parse session message:", e);
            }
        }

        if (sessionError) {
            try {
                const parsedError = JSON.parse(sessionError);
                setError(parsedError);
                sessionStorage.removeItem("keycloak_error");
            } catch (e) {
                console.warn("Failed to parse session error:", e);
            }
        }
    }, []);

    return { message, error };
}
