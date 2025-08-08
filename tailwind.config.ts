import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            geist: ["Geist", "sans-serif"]
        }
    }
} satisfies Config;
