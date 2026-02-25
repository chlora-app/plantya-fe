// src/styles/colors.js

const colors = {
    /* ================= BRAND / STATUS ================= */
    brand: {
        primary: {
            main: "#007C4F",
            light: "#00A86B",
            dark: "#006940",
        },
        secondary: { // Mengganti 'info' menjadi 'secondary' yang lebih umum di MUI
            main: "#6B7280",
            light: "#9CA3AF",
            dark: "#BEC3CC",
        },
        info: { // Tetap pertahankan 'info' jika Anda membutuhkannya
            main: "#1976D2",
            light: "#60A5FA",
            dark: "#24427D",
        },
        warning: {
            main: "#FFC107",
            light: "#FFE082",
            dark: "#F57C00",
        },
        error: { // Ubah 'danger' menjadi 'error' untuk konsistensi dengan MUI
            main: "#DC3545",
            light: "#EF5350",
            dark: "#C62828",
        },
        success: {
            main: "#2E7D32", // Warna hijau khas untuk success
            light: "#66BB6A",
            dark: "#1B5E20",
        },
    },

    /* ================= TEXT ================= */
    text: {
        primary: {
            light: "#1A1A1A", // Warna teks utama di mode light
            dark: "#F0F0F0",  // Warna teks utama di mode dark
        },
        secondary: "#6B7280", // Warna teks sekunder (sama untuk kedua mode)
        secondaryLighter: "#9CA3AF", // Warna teks sekunder (sama untuk kedua mode)
    },

    /* ================= BACKGROUND ================= */
    background: {
        default: {
            light: "#F3F4F6",
            dark: "#111315",
        },
        paper: {
            light: "#FFFFFF",
            dark: "#1A1D21",
        },
        elevated: {
            light: "#ECEFF3",
            dark: "#22262B",
        },
    },

    /* ================= SURFACE (INPUT / FIELD) ================= */
    surface: {
        input: "#F3F4F6",
        inputDisabled: "#E5E7EB",

        inputDisabledDark: "#2A2A2A"
    },

    /* ================= BORDER / DIVIDER ================= */
    border: {
        default: "#D1D5DB",
        subtle: "#2E3338",
    },
};

export default colors;