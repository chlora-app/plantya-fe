const MuiDrawer = {
    MuiDrawer: {
        styleOverrides: {
            paper: ({ theme }) => ({
                borderRadius: 0,
                overflow: "visible",
                overflowY: "auto",

                scrollbarWidth: "none",
                msOverflowStyle: "none",

                "&::-webkit-scrollbar": {
                    display: "none",
                },

                borderRight: `1px solid ${theme.palette.divider}`,
            }),
        },
    },
};

export default MuiDrawer;
