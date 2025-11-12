import { useTheme } from "@mui/material/styles";

export const useTextFieldSx = () => {
    const theme = useTheme();

    return {
        "& .MuiInputBase-root": {
            backgroundColor: theme.palette.background.paper, // sesuai theme dark/light
            color: theme.palette.text.primary,
            borderRadius: "8px",
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.text.secondary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
        },
    };
};
export default useTextFieldSx;