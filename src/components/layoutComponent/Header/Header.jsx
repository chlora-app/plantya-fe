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
    PersonOutlineOutlinedIcon,
    NotificationsIcon,
} from '@/assets/Icon/muiIcon';
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuIcon, PersonIcon } from "../../../assets/Icon/muiIcon";
import { useAuth } from "../../../context/AuthContext";
import { useThemeMode } from "../../../context/ThemeContext";
import RealtimeClock from "./RealtimeClock";
import { capitalizeWords } from "../../common/Regex";


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
                    <Box>
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

                        {!props.isMobile && (<RealtimeClock />)}
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={1.5}>
                        <Box
                            p={0.5}
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "background.default",
                                borderRadius: "999px",
                                overflow: "hidden",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    left: mode === "light" ? 4 : "calc(50% + 0px)",
                                    width: "calc(50% - 4px)",
                                    height: "calc(100% - 8px)",
                                    bgcolor: "primary.main",
                                    borderRadius: "999px",
                                    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                                }}
                            />

                            <IconButton
                                onClick={() => mode !== "light" && toggleTheme()}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: mode === "light" ? "text.light" : "text.secondary",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                <LightModeIcon sx={{ fontSize: 16 }} />
                            </IconButton>

                            <IconButton
                                onClick={() => mode !== "dark" && toggleTheme()}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: mode === "dark" ? "text.light" : "text.secondary",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                <DarkModeIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>

                        <IconButton
                            color="text.secondary"

                        >
                            <NotificationsIcon sx={{ fontSize: '20px', color: "text.secondary" }} />
                        </IconButton>


                        <Divider
                            orientation="vertical"
                            sx={{
                                height: 24,
                                alignSelf: "center",
                            }}
                        />

                        <Box display={"flex"} gap={1.5}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-end"} alignItems={"flex-end"}>
                                <Typography variant="body2" fontWeight={"medium"} lineHeight={1}>
                                    {userName}
                                </Typography>
                                <Typography variant="caption" fontWeight={"normal"} color="text.secondary">
                                    {capitalizeWords(userRole)}
                                </Typography>
                            </Box>

                            <Box bgcolor={"background.default"} borderRadius={"999px"}>
                                <IconButton
                                    onClick={handleProfileMenuOpen}
                                    aria-describedby={id}
                                // sx={{ bgcolor: "background.default" }}
                                >
                                    <PersonIcon sx={{ fontSize: '20px', color: "text.secondary" }} />
                                </IconButton>
                            </Box>
                        </Box>
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
