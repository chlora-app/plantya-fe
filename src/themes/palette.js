import colors from "./colors";

const buildPalette = (mode = "dark") => {
    const isDark = mode === "dark";

    return {
        mode,

        primary: {
            main: colors.brand.primary,
            light: colors.brand.primaryLight,
        },

        secondary: {
            main: isDark
                ? colors.text.secondaryDark
                : colors.text.secondaryLight,
        },

        info: {
            main: colors.brand.info,
            light: colors.brand.infoLight,
            dark: colors.brand.infoDark,
        },

        success: {
            main: colors.brand.primary,
        },

        error: {
            main: colors.brand.danger,
        },

        warning: {
            main: colors.brand.warning,
            contrastText: colors.base.white,
        },

        background: {
            default: isDark
                ? colors.background.dark
                : colors.background.light,

            paper: isDark
                ? colors.background.paperDark
                : colors.background.paperLight,

            elevated: isDark
                ? colors.background.elevatedDark
                : colors.background.elevatedLight,
        },

        text: {
            primary: isDark
                ? colors.text.primaryDark
                : colors.text.primaryLight,

            secondary: isDark
                ? colors.text.secondaryDark
                : colors.text.secondaryLight,

            secondaryLight: colors.text.muted,
        },

        divider: isDark
            ? colors.border.dark
            : colors.border.light,

        action: {
            hover: isDark ? "#1F1F1F" : "#E5E7EB",
            selected: isDark ? "#1F1F1F" : "#E5E7EB",
        },

        surface: {
            input: isDark
                ? colors.surface.inputDark
                : colors.surface.inputLight,

            inputDisabled: isDark
                ? colors.surface.inputDisabledDark
                : colors.surface.inputDisabledLight,
        },
    };
};

export default buildPalette;
