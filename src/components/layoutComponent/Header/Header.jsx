import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Popover,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ClickAwayListener,
    Divider
} from "@mui/material";
import {

    DarkModeIcon,
    PersonOutlineOutlinedIcon,
    NotificationsIcon,
} from '@/assets/Icon/muiIcon';
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuIcon, PersonIcon, SunnyIcon } from "../../../assets/Icon/muiIcon";
import { useAuth } from "../../../context/AuthContext";
import { useThemeMode } from "../../../context/ThemeContext";
import RealtimeClock from "./RealtimeClock";
import { capitalizeWords } from "../../common/Regex";
import PopoverHeader from "./PopoverHeader";


const Header = (props) => {
    const { logout } = useAuth();
    const { mode, toggleTheme } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState(null);
    const userName = props.userData?.name || ""
    const userRole = capitalizeWords(props.userData?.role) || ""
    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (anchorEl) {
                handlePopoverMenuClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorEl]);


    const handleLogout = () => {
        handlePopoverMenuClose();
        logout()
    };

    const handleAccountInfo = () => {
        handlePopoverMenuClose();
        alert("Direction to Profile Menu")
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{ height: props.headerHeight }}
                className="header-container"

            >
                <Toolbar className="header-toolbar">
                    <Box>
                        {props.isMobile && (
                            <IconButton
                                onClick={props.toggleSidebar}
                                className="header-icon"
                            >
                                <MenuIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                        )}

                        {/* {!props.isMobile && (<RealtimeClock />)} */}
                    </Box>

                    <Box display={"flex"} gap={1.5} >
                        <Box display={"flex"} gap={1}>
                            <Box p={0.5} className="header-switchMode" >
                                <Box
                                    className="header-switchModeAnim"
                                    sx={{ top: 4, left: mode === "light" ? 4 : "calc(50% + 0px)", width: "calc(50% - 4px)", height: "calc(100% - 8px)" }}
                                />

                                <IconButton
                                    onClick={() => mode !== "light" && toggleTheme()}
                                    sx={{
                                        color: mode === "light" ? "primary.main" : "text.secondary",
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                            color: mode === "light"
                                                ? "primary.main"   // 🔥 tetap primary kalau active
                                                : "text.primary",
                                        },
                                    }}
                                    className="header-buttonAnim"
                                >
                                    <SunnyIcon sx={{ fontSize: 16 }} />
                                </IconButton>

                                <IconButton
                                    onClick={() => mode !== "dark" && toggleTheme()}
                                    sx={{
                                        color: mode === "dark" ? "primary.main" : "text.secondary",
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                            color: mode === "dark"
                                                ? "primary.main"
                                                : "text.primary",
                                        },
                                    }}
                                    className="header-buttonAnim"
                                >
                                    <DarkModeIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>

                            <IconButton
                                onClick={() => alert("Feature for Notification Modal")}
                                className="header-icon"
                            >
                                <NotificationsIcon
                                    sx={{
                                        fontSize: 20,
                                        color: 'inherit'
                                    }}
                                />
                            </IconButton>
                        </Box>

                        <Divider orientation="vertical" sx={{ height: 24, alignSelf: "center", borderWidth: '1.5px' }} />

                        <Box display={"flex"} gap={1.5}>
                            <Box className="header-profile">
                                <Typography variant="body1" fontWeight={"medium"} lineHeight={1} noWrap>
                                    {userName}
                                </Typography>
                            </Box>

                            <IconButton
                                onClick={handleProfileMenuOpen}
                                aria-describedby={id}
                                className="header-icon"
                                sx={{
                                    bgcolor: 'background.default'
                                }}
                            >
                                <PersonIcon
                                    sx={{
                                        fontSize: 20,
                                        color: 'inherit'
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar >

            <PopoverHeader
                id={id}
                open={open}
                anchorEl={anchorEl}
                handlePopoverMenuClose={handlePopoverMenuClose}
                userName={userName}
                userRole={userRole}
                handleAccountInfo={handleAccountInfo}
                handleLogout={handleLogout}
            />
        </>
    );
};

Header.propTypes = {
    ToggleSidebar: PropTypes.any,
    isCollapsed: PropTypes.any,
    userData: PropTypes.any,
    headerHeight: PropTypes.any,
};

export default Header;
