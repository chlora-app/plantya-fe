import React from "react";
import {
    Popover,
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton,
} from "@mui/material";
import { LogoutIcon, PersonIcon } from "../../../assets/Icon/muiIcon";

const PopoverHeader = (props) => {
    return (
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.handlePopoverMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
                paper: {
                    className: "sidebar-popover",
                    sx: {
                        mt: 1,
                        minWidth: { xs: "200px", sm: "220px" },
                        maxWidth: { xs: "90vw", sm: "300px" },
                        overflow: "hidden",
                    },
                },
            }}
        >
            <Box display={"flex"} alignItems={"center"} px={2} py={2} borderBottom={"1px solid"} borderColor={"divider"} gap={2}>
                <Box borderRadius={"50%"} bgcolor={"background.default"} width={36} height={36} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <PersonIcon sx={{ fontSize: "20px", color: 'text.secondary' }} />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight={"medium"}>
                        {"asddddddddddddddddddddddddddddddddasdasdasdddd"}
                    </Typography>
                    <Typography variant="body1" fontWeight={"medium"}>
                        {props.userRole}
                    </Typography>
                </Box>
            </Box>

            <List sx={{ display: 'flex', p: 0, color: 'text.primary' }}>
                <ListItemButton onClick={props.handleAccountInfo} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton onClick={props.handleLogout} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

        </Popover>
    )
}
export default PopoverHeader;