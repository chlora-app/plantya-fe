import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Snackbar,
    InputAdornment,

} from "@mui/material";
import { Row, Col, Container } from "reactstrap";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../common/PageLoading";
import axiosInstance from "../../utils/AxiosInstance";
import useTextFieldSx from "../../themes/textFieldDark";
import { useAuth } from "../../context/AuthContext";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {

    const navigate = useNavigate();
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [message, setMessage] = useState("");

    const { login } = useAuth();
    const handleLogin = async (values) => {
        debugger
        try {
            debugger
            console.log("Test Login API")
            const response = await axiosInstance().post("/api/auth/login", {
                username: values.username,
                password: values.password
            }, {
                withCredentials: true,
            })
            login(response.data.data)
            navigate("/"); // redirect setelah login sukses

        } catch (error) {
            console.log("Test Login API Error")
            setMessage("API ERROR")
        }
    }


    const formik = useFormik({
        initialValues:
        {
            username: "",
            password: "",
        },
        validationSchema: Yup.object
            ({
                username: Yup.string().required("Username wajib diisi"),
                password: Yup.string().required("Password wajib diisi"),
            }),

        onSubmit: async (values, { setSubmitting }) => {
            setMessage("");
            setLoadingSpinner(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800)); // simulasi API
                handleLogin(values);
            } finally {
                setSubmitting(false);
                setLoadingSpinner(false);
            }
        },
    });

    const textFieldDarkSx = {
        "& .MuiInputLabel-root": {
            color: "#A7B3C2",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#DCE3EA",
        },

        "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "#0E1621",
            borderRadius: "10px",

            "& fieldset": {
                borderColor: "#2F3A48",
            },
            "&:hover fieldset": {
                borderColor: "#4A5B70",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#6FA3FF",
                boxShadow: "0 0 6px rgba(111,163,255,0.5)",
            },
        },

        // ⛔ FIX autofill jadi putih
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #0E1621 inset !important",
            WebkitTextFillColor: "#ffffff !important",
        },
        "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px #0E1621 inset !important",
            WebkitTextFillColor: "#ffffff !important",
        },
    };






    return (
        <React.Fragment>
            <PageLoading
                open={loadingSpinner}
                text="Processing..."
            />

            <Container fluid className="bg-success" style={{ width: '70%' }}>
                <Col lg="12" md="12" sm="12" className="justify-content-center">
                    <Row className="mb-4" style={{ color: '#DEF2FF' }}>
                        <div className="text-center mb-4">
                            <Typography variant="h3" fontWeight="bold" >
                                Welcome Back!
                            </Typography>
                            <Typography variant="h5" fontWeight="light" sx={{ marginTop: '-10px' }}>
                                Let's connect your devices.
                            </Typography>
                        </div>

                        <div className="text-center">
                            <Typography variant="h5" fontWeight="medium" className="mt-3">
                                Sign In
                            </Typography>
                        </div>
                    </Row>

                    <Row className="bg-warning">
                        <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            className=""
                        >
                            {message && <Alert
                                severity="error"
                                sx={{
                                    backgroundColor: "rgba(255, 76, 76, 0.12)",
                                    color: "#FF6B6B",
                                    border: "1px solid rgba(255, 107, 107, 0.3)",
                                    backdropFilter: "blur(4px)",
                                    borderRadius: "10px",
                                }}
                            >
                                {message}
                            </Alert>}

                            <Row className="">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: "-4px",        // rapat ke TextField
                                        color: "#000000ff",     // warna label
                                        fontSize: "0.85rem",
                                        fontWeight: 500
                                    }}
                                    className="p-0"
                                >
                                    Email or Username
                                </Typography>
                                <TextField
                                    placeholder="Email or Username"
                                    name="username"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    // sx={textFieldDarkSx}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Row>

                            <Row>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: "-4px",        // rapat ke TextField
                                        color: "#000000ff",     // warna label
                                        fontSize: "0.85rem",
                                        fontWeight: 500
                                    }}
                                >
                                    Password
                                </Typography>
                                <TextField
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    size="small"

                                    fullWidth
                                    margin="normal"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    // sx={textFieldDarkSx}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Row>

                            <Button
                                type="submit"
                                variant="contained"
                                color="dark"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 1.2,
                                    borderRadius: 2,
                                    backgroundColor: "#3B82F6",
                                    "&:hover": { backgroundColor: "#2563EB" }
                                }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Processing..." : "Login"}
                            </Button>
                        </Box>
                    </Row>





                </Col>
            </Container>






            <Row>

            </Row>

        </React.Fragment >
    );
};

export default Login;
