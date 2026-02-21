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
    LightModeIcon,
    DarkModeIcon,
} from '@/assets/Icon/muiIcon';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // Icon untuk Account Info
import { MenuIcon } from "../../../assets/Icon/muiIcon";
import { useAuth } from "../../../context/AuthContext";
import { useThemeMode } from "../../../context/ThemeContext";
import RealtimeClock from "./RealtimeClock";


const Header = (props) => {
    const { logout } = useAuth();
    const { mode, toggleTheme } = useThemeMode();


    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (anchorEl) {
                handleProfileMenuClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorEl]);


    const handleLogout = () => {
        handleProfileMenuClose();
        logout()
    };

    const handleAccountInfo = () => {
        handleProfileMenuClose();
        // Tambahkan logic navicasi or something
        // navigate("/account-info");
        console.log("Navigate to Account Info");
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const userName = props.userData?.name || ""
    const userRole = props.userData?.role || ""

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{ height: props.headerHeight }}
                className="header-container"

            >
                <Toolbar className="header-toolbar">
                    <Box display={"flex"} alignItems={"center"}>
                        {props.isMobile && (
                            <IconButton
                                onClick={props.toggleSidebar}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '5px',
                                    transition: "left 0.3s ease",
                                    "&:hover": {
                                        bgcolor: "background.default",
                                    }
                                }}
                            >
                                <MenuIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                        )}


                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            {!props.isMobile && (<RealtimeClock />)}

                        </Box>
                    </Box>

                    {/* Right Side */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            // bgcolor: 'red'
                        }}
                    >
                        <IconButton
                            sx={{
                                color: mode == "dark" ? "warning.main" : "text.primary",
                            }}
                            onClick={toggleTheme}
                        >
                            {mode == "dark" ? <LightModeIcon sx={{ fontSize: "20px" }} /> : <DarkModeIcon sx={{ fontSize: "20px" }} />}
                        </IconButton>

                        <Box
                            sx={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                mx: 1,
                            }}

                        >
                            <Divider
                                orientation="vertical"
                                sx={{
                                    height: '50%',
                                    // border: '1px solid', 
                                    // borderColor: 'divider'
                                }}
                            />
                        </Box>

                        <IconButton
                            color="inherit"
                            sx={{
                                p: 1,
                            }}
                        >
                            <NotificationsNoneOutlinedIcon sx={{
                                fontSize: '20px'
                            }} />
                        </IconButton>

                        <Box
                            sx={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                mx: 1,
                            }}

                        >
                            <Divider
                                orientation="vertical"
                                sx={{
                                    // border: '1px solid', 
                                    // borderColor: 'divider',
                                    height: '50%',
                                }}
                            />
                        </Box>
                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                            aria-describedby={id}
                            sx={{ p: 1 }}
                        >
                            <AccountCircleOutlinedIcon sx={{
                                fontSize: '20px'
                            }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        className: 'sidebar-popover',
                        sx: {
                            mt: 1,
                            minWidth: { xs: '200px', sm: '230px' },
                            maxWidth: { xs: '90vw', sm: 'none' },
                            overflow: 'hidden',
                        }
                    }
                }}
            >
                <Box sx={{
                    px: 2, py: 2,
                    // borderBottom: "1px solid", 
                    // borderBottomColor: 'divider', 
                    textAlign: 'center',
                    color: "text.primary"
                }}>
                    <Box
                        component="img"
                        src="/GacorBang.jpg"
                        alt="Profile"
                        sx={{ width: 75, height: 75, borderRadius: "50%", objectFit: "cover", mb: 2 }}
                    />
                    <Typography variant="h6">
                        {userName}
                    </Typography>
                    <Typography variant="body1">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()}
                    </Typography>
                </Box>

                <List sx={{ display: 'flex', p: 0, color: 'text.primary' }}>
                    <ListItemButton onClick={handleAccountInfo} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Popover>
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
