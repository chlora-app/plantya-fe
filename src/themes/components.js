const buildComponents = () => ({
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                backgroundImage: "none",
            }),
        },
    },

    MuiDivider: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderColor: theme.palette.divider,
            }),
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-field": {
                    "& .MuiOutlinedInput-root": {
                        marginTop: 1,

                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? theme.palette.background.paper
                                : theme.palette.background.paper,

                        borderRadius: "15px",
                        transition: "all 0.3s ease",

                        "&.Mui-disabled": {
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? theme.palette.action.disabledBackground
                                    : theme.palette.action.disabledBackground,

                            "& .MuiInputBase-input": {
                                color: theme.palette.text.secondaryLight,
                                WebkitTextFillColor: theme.palette.text.secondaryLight,
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.divider,
                            },

                            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                                color: theme.palette.text.secondaryLight,
                            },
                        },

                        "& fieldset": {
                            borderWidth: "0.7px",
                        },

                        "&:hover:not(.Mui-disabled) fieldset": {
                            borderWidth: "2px",
                            borderColor: theme.palette.primary.light,
                        },

                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: theme.palette.primary.light,
                        },

                        "& input": {
                            color: theme.palette.text.secondaryLight,
                        },

                        "& input:not(:placeholder-shown)": {
                            color: theme.palette.text.primary,
                        },

                        "& .MuiInputBase-input::placeholder": {
                            opacity: 1
                        },

                        /* ===== Autofill Webkit ===== */
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.mode === "dark"
                                ? theme.palette.background.paper
                                : theme.palette.background.paper
                                } inset !important`,
                            boxShadow: `0 0 0 1000px ${theme.palette.mode === "dark"
                                ? theme.palette.background.paper
                                : theme.palette.background.paper
                                } inset !important`,
                            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            transition: "background-color 5000s ease-in-out 0s !important",
                        },

                        /* ===== Autofill Firefox ===== */
                        "& input:-moz-autofill": {
                            background: `${theme.palette.mode === "dark"
                                ? theme.palette.background.paper
                                : theme.palette.background.paper
                                } !important`,
                            color: `${theme.palette.text.primary} !important`,
                        },
                    },

                    "& .MuiFormHelperText-root": {
                        position: "absolute",
                        top: "100%",
                        left: "8px",
                        right: "8px",
                        marginTop: "4px",
                        fontSize: "0.75rem",
                        lineHeight: 1.3,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                    },
                },
            }),
        },
    },


    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-button": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.light,
                    borderRadius: 15,
                    fontWeight: 600,

                    "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                    },
                },

                "&.linkto-button": {
                    color: theme.palette.primary.main,
                    textTransform: "none",

                    "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                    },
                },
            }),
        },
    },
});

export default buildComponents;
