import MuiPaper from "./MuiPaper";
import MuiDivider from "./MuiDivider";
import MuiTextField from "./MuiTextField";
import MuiButton from "./MuiButton";
import MuiInputLabel from "./MuiInputLabel";
import MuiOutlinedInput from "./MuiOutlinedInput";
import MuiDrawer from "./MuiDrawer";

const buildComponents = () => ({
    ...MuiPaper,
    ...MuiDivider,
    ...MuiTextField,
    ...MuiButton,
    ...MuiInputLabel,
    ...MuiOutlinedInput,
    ...MuiDrawer,
});

export default buildComponents;