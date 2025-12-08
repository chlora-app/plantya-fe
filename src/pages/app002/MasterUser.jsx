import React, { useState, useEffect } from "react";
import { Paper, Container, Box, Typography, Grid } from "@mui/material";
import { Button, Alert, Row, Col, Form } from "reactstrap";
import RootPageCustom from "../../components/common/RootPageCustom";

const MasterUser = () => {

    const [firstRender, setFirstRender] = useState(false)
    const [app002p01Page, setApp002p01Page] = useState(true);

    const [app002Msg, setApp002setMsg] = useState("");
    const [app002MsgStatus, setApp002setMsgStatus] = useState("");

    return (
        <React.Fragment>
            <RootPageCustom
                msgStateGet={app002Msg}
                msgStateSet={setApp002setMsg}
                msgStateGetStatus={app002MsgStatus}
                setFirstRender={setFirstRender}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        display: app002p01Page ? "block" : "none",
                        bgcolor: 'secondary.main'
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Master User
                    </Typography>
                    <Typography>
                        Ini adalah contoh bagaimana menggunakan komponen AlertMessage yang Anda buat.
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    setApp002setMsg("Data berhasil disimpan!")
                                    setApp002setMsgStatus("success")
                                }}
                            >
                                Tampilkan Alert Sukses
                            </Button>
                        </Grid>
                        <Grid >
                            <Button
                                variant="contained"
                                color="danger"
                                onClick={() => {
                                    setApp002setMsg("Terjadi kesalahan pada server!")
                                    setApp002setMsgStatus("error")
                                }}
                            >
                                Tampilkan Alert Error
                            </Button>
                        </Grid>
                        <Grid >
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    setApp002setMsg("Warning  pada server!");
                                    setApp002setMsgStatus("warning")
                                }}                        >
                                Tampilkan Alert Warning
                            </Button>
                        </Grid>
                    </Grid>
                </Container>


            </RootPageCustom>
        </React.Fragment>
    );
}
export default MasterUser;
