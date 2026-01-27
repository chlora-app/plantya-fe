import { createTheme } from "@mui/material/styles";
import buildPalette from "./palette";
import buildComponents from "./components";

const createAppTheme = (mode = "dark") => {
    return createTheme({
        palette: buildPalette(mode),
        components: buildComponents(),
        typography: {
            fontFamily: "Poppins, sans-serif",
        },
    })
}
export default createAppTheme;