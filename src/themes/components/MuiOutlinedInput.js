const MuiOutlinedInput = {
    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: '10px',
                ".MuiInputLabel-root:hover + & .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                },
            }),

            notchedOutline: {
                legend: {
                    fontSize: "13px",
                },
            },
        },
    },
};

export default MuiOutlinedInput;
