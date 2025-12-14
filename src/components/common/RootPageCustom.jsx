import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Box } from "@mui/material";
import AlertMessage from "./AlertMessage";

const RootPageCustom = (props) => {
    useEffect(() => {
        if (props.setFirstRender != null) {
            props.setFirstRender(true)
        }
    }, [])

    return (
        <React.Fragment>
            <Container disableGutters maxWidth={false}>
                <AlertMessage
                    msg={props.msgStateGet}
                    stateData={props.msgStateSet}
                    msgStatus={props.msgStateGetStatus}
                />
                {props.children}
            </Container>
        </React.Fragment>
    )
}

RootPageCustom.propTypes = {
    children: PropTypes.any,
    msgStateGet: PropTypes.any,
    msgStateGetStatus: PropTypes.any,
    msgStateSet: PropTypes.any,
    setFirstRender: PropTypes.any,
};

export default RootPageCustom;