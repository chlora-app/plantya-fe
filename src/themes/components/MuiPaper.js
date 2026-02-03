const MuiPaper = {
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                backgroundImage: "none",
            }),
        },
    },
};

export default MuiPaper;