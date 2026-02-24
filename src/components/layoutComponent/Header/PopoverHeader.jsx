import React from "react";
import {
    Popover,
    Box,
    Typography,
    Button,
} from "@mui/material";
import { LogoutIcon, ManageAccountsIcon, PersonIcon } from "../../../assets/Icon/muiIcon";

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
                        minWidth: { xs: "200px", sm: "200px" },
                        maxWidth: { xs: "90vw", sm: "240px" },
                        overflow: "hidden",
                    },
                },
            }}
        >
            <Box display={"flex"} alignItems={"center"} px={2} py={2} borderBottom={"1px solid"} borderColor={"divider"} gap={2}>
                <Box borderRadius={"50%"} bgcolor={"background.default"} width={"36px"} height={"36px"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                    flexShrink: 0,
                }}>
                    <PersonIcon sx={{ fontSize: "20px", color: 'text.secondary' }} />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight={"medium"}
                        sx={{
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}>
                        {props.userName}
                    </Typography>
                    <Typography variant="body1" fontWeight={"medium"}>
                        {props.userRole}
                    </Typography>
                </Box>
            </Box>

            <Box display={"flex"} flexDirection={"column"}>
                <Button
                    color="inherit"
                    sx={{
                        justifyContent: 'start', px: 2, py: 1, gap: 2, alignItems: 'center', color: 'text.primary',

                    }}
                    onClick={props.handleAccountInfo}>
                    <ManageAccountsIcon
                        sx={{ fontSize: '20px' }}
                    />
                    Account Setting
                </Button>
                <Button sx={{ justifyContent: 'start', px: 2, py: 1, gap: 2, alignItems: 'center' }}
                    color="error"
                    onClick={props.handleLogout}
                >
                    <LogoutIcon sx={{ fontSize: '20px' }} />
                    Logout
                </Button>
            </Box>
            {/* </List> */}

        </Popover>
    )
}
export default PopoverHeader;