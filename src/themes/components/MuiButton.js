const MuiButton = {
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-button": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.light,
                    borderRadius: "15px",

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
};

export default MuiButton;