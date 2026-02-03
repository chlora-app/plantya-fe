const MuiButton = {
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                "&.auth-button": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText, // fix typo dari sebelumnya
                    borderRadius: 15,
                    fontWeight: 500,
                    letterSpacing: 1,

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