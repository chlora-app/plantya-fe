import { createTheme } from "@mui/material/styles";
import buildPalette from "./palette";
import buildComponents from "./components";
import typography from "./typography";


const createAppTheme = (mode = "dark") => {
    return createTheme({
        palette: buildPalette(mode),
        components: buildComponents(),
        typography: typography,
        shape: {
            borderRadius: 25
        },

    })
}
export default createAppTheme;