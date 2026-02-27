const TabOverrides = {
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 36,
        textTransform: "none",
        transition: "all 0.2s ease-in-out",
        color: theme.palette.text.secondary,
        opacity: 0.8,
        "&:hover": {
          opacity: 1,
          backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          opacity: 1,
        },
        "&.Mui-selected:hover": {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.action.selected,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 36,
      }),
    },
  },
};

export default TabOverrides;