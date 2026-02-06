const MuiPaper = {
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                backgroundImage: "none",
                // ...(theme.palette.mode === "dark" && {
                //     border: "1px solid rgba(255,255,255,0.06)",
                // }),
            }),
        },
    },
};

export default MuiPaper;