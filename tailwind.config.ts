import type { Config } from "tailwindcss";

// カラー生成関数（color-mix使用）
function generateColorScale(baseColor: string) {
    return {
        50: `color-mix(in srgb, ${baseColor} 5%, white)`,
        100: `color-mix(in srgb, ${baseColor} 10%, white)`,
        200: `color-mix(in srgb, ${baseColor} 20%, white)`,
        300: `color-mix(in srgb, ${baseColor} 30%, white)`,
        400: `color-mix(in srgb, ${baseColor} 40%, white)`,
        500: baseColor, // メインカラー
        600: `color-mix(in srgb, ${baseColor} 60%, black)`,
        700: `color-mix(in srgb, ${baseColor} 70%, black)`,
        800: `color-mix(in srgb, ${baseColor} 80%, black)`,
        900: `color-mix(in srgb, ${baseColor} 90%, black)`,
        950: `color-mix(in srgb, ${baseColor} 95%, black)`
    };
}

// より正確なHSLベースのカラー生成関数
function generateHSLColorScale(baseColor: string) {
    // 16進数をHSLに変換する簡易関数
    const hexToHSL = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
            s = 0,
            l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hsl = hexToHSL(baseColor);

    return {
        50: `hsl(${hsl.h}, ${Math.min(hsl.s, 20)}%, ${Math.min(hsl.l + 45, 98)}%)`,
        100: `hsl(${hsl.h}, ${Math.min(hsl.s, 25)}%, ${Math.min(hsl.l + 35, 95)}%)`,
        200: `hsl(${hsl.h}, ${Math.min(hsl.s, 30)}%, ${Math.min(hsl.l + 25, 90)}%)`,
        300: `hsl(${hsl.h}, ${Math.min(hsl.s, 35)}%, ${Math.min(hsl.l + 15, 85)}%)`,
        400: `hsl(${hsl.h}, ${Math.min(hsl.s, 40)}%, ${Math.min(hsl.l + 5, 80)}%)`,
        500: baseColor, // メインカラー
        600: `hsl(${hsl.h}, ${Math.min(hsl.s + 5, 100)}%, ${Math.max(hsl.l - 5, 20)}%)`,
        700: `hsl(${hsl.h}, ${Math.min(hsl.s + 10, 100)}%, ${Math.max(hsl.l - 15, 15)}%)`,
        800: `hsl(${hsl.h}, ${Math.min(hsl.s + 15, 100)}%, ${Math.max(hsl.l - 25, 10)}%)`,
        900: `hsl(${hsl.h}, ${Math.min(hsl.s + 20, 100)}%, ${Math.max(hsl.l - 35, 5)}%)`,
        950: `hsl(${hsl.h}, ${Math.min(hsl.s + 25, 100)}%, ${Math.max(hsl.l - 45, 2)}%)`
    };
}

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            geist: ["Geist", "sans-serif"]
        },
        extend: {
            colors: {
                // 固定値を使用（確実に動作）
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554"
                },
                secondary: generateHSLColorScale("#64748b"),
                accent: generateHSLColorScale("#d946ef"),
                success: generateHSLColorScale("#22c55e"),
                warning: generateHSLColorScale("#f59e0b"),
                error: generateHSLColorScale("#ef4444")
            }
        }
    }
} satisfies Config;
