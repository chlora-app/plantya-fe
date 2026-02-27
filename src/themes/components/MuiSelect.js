const MuiSelect = {
    MuiSelect: {
        styleOverrides: {
            select: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
            },
            icon: {
                flexShrink: 0, // supaya arrow tidak mengecil
            },
        },
    },
};

export default MuiSelect;