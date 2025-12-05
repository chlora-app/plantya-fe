import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import AlertMessage from "./AlertMessage";

const RootPageCustom = (props) => {
    useEffect(() => {
        if (props.setFirstRender != null) {
            props.setFirstRender(true)
        }
    }, [])



    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <AlertMessage
                    msg={props.msgStateGet}
                    stateData={props.msgStateSet}
                    msgStatus={props.msgStateGetStatus}
                />
                {props.children}
            </Box>

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