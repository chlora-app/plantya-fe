import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiSprout } from "@mdi/js";
import SmallIcon from "../../../assets/images/SmallIcon.png";

const SidebarHeader = (props) => {

    return (
        <Box
            className="sidebar-header-container"
            justifyContent={props.isCollapsed ? "center" : "flex-start"}
            height={props.heightHeader}
            px={2}
            gap={1.5}
        >
            {props.isCollapsed ?
                (
                    <img
                        src={SmallIcon}
                        alt="Logo"
                        className="sidebar-header-img"
                    />) :
                (
                    <>
                        <Icon path={mdiSprout} size={1} className="sidebar-header-icon" />
                        <Typography variant="h4" fontWeight={"bold"} lineHeight={1}>
                            Chlora
                        </Typography>
                    </>
                )
            }
        </Box>
    )
}

export default SidebarHeader

