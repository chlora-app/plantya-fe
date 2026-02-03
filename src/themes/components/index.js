import MuiPaper from "./MuiPaper";
import MuiDivider from "./MuiDivider";
import MuiTextField from "./MuiTextField";
import MuiButton from "./MuiButton";

const buildComponents = () => ({
    ...MuiPaper,
    ...MuiDivider,
    ...MuiTextField,
    ...MuiButton,
});

export default buildComponents;