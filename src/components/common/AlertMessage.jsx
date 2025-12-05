import React from 'react';
import PropTypes from 'prop-types';
import { Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertMessage = (props) => {
    if (!props.msg) {
        return null
    }

    const alertClose = () => {
        props.stateData("")
    }

    return (
        props.msg ?
            <Alert
                severity={props.msgStatus ? props.msgStatus : "error"}
                variant="outlined"
                onClose={props.onClose}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={alertClose}
                    >
                        <CloseIcon
                            fontSize="inherit"
                            color='#inherit' />
                    </IconButton>
                }
                sx={{
                    mb: 2,
                    color: "#inherit"
                }}
            >
                {typeof props.msg == 'string' ? props.msg : props.msg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}
            </Alert> : null

    )
}

AlertMessage.propTypes = {
    msg: PropTypes.string,
    stateData: PropTypes.func,
    msgStatus: PropTypes.string,
};

export default AlertMessage