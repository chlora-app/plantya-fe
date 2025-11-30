import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // Icon untuk Account Info


const Header = (props) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        handleProfileMenuClose(); // Tutup popover sebelum navigasi
        navigate("/logout");
    };

    const handleAccountInfo = () => {
        handleProfileMenuClose(); // Tutup popover
        // Tambahkan logika navigasi ke halaman info akun di sini
        // navigate("/account-info");
        console.log("Navigate to Account Info");
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#121314",
                zIndex: 1201, // pastikan tetap di atas sidebar
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                height: '100%',
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    height: "100%",
                    paddingRight: "0 !important",
                }}

            >

                <Box
                    // className="bg-info"
                >
                    {/* Judul Header */}
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'light' }}>
                        Plantya - Admin User Dari Local Storage
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                    // className="bg-warning"
                >
                    <Box
                        sx={{
                            // bgcolor: "red",
                            display: "flex",
                            alignItems: "center",
                            p: 2
                        }}
                    >
                        <IconButton color="inherit">
                            <NotificationsNoneOutlinedIcon fontSize="medium" />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            // p:1
                            // bgcolor: "green",

                        }}>

                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                            aria-describedby={id}
                            // onClick={handleLogout}
                            sx={{
                                borderLeft: '2px solid #383B42',
                                display: "flex",
                                alignItems: "center",
                                flexDirection: 'column',
                                // bgcolor:'red',
                                borderRadius: 0,
                            }}
                        >
                            <AccountCircleOutlinedIcon fontSize="medium" />
                            <Typography variant="body2" sx={{
                                fontWeight: '200',
                                fontSize: '0.7rem',
                            }}>
                                Joey Liauw Wiharta
                            </Typography>

                        </IconButton>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleProfileMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        // --- Styling Konsisten dengan Sidebar Popover ---
                                        backgroundColor: "#16181A",
                                        border: "2px solid #383B42",
                                        borderRadius: "12px",
                                        mt: 1,
                                        minWidth: "180px",
                                        overflow: 'hidden',
                                    }
                                }
                            }}
                        >
                            <List
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}
                            >
                                {/* Opsi Account Info */}
                                <ListItemButton onClick={handleAccountInfo} sx={{
                                    borderRadius: "8px",
                                    py: 1,
                                    pl: 1,
                                    pr: 2,
                                    minHeight: 'auto',
                                    "&:hover": {
                                        bgcolor: "#1F1F1F",
                                        color: '#FFFFFF',
                                    },
                                }}>
                                    <ListItemIcon sx={{
                                        color: '#64748B',
                                        minWidth: 32,
                                    }}>
                                        <PersonOutlineOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Account Info" sx={{
                                        "& .MuiListItemText-primary": {
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            color: 'inherit',
                                        }
                                    }} />
                                </ListItemButton>

                                {/* Opsi Logout */}
                                <ListItemButton onClick={handleLogout} sx={{
                                    borderRadius: "8px",
                                    py: 1,
                                    pl: 1,
                                    pr: 2,
                                    minHeight: 'auto',
                                    "&:hover": {
                                        bgcolor: "#1F1F1F",
                                        color: '#FFFFFF',
                                    },
                                }}>
                                    <ListItemIcon sx={{
                                        color: '#64748B',
                                        minWidth: 32,
                                    }}>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" sx={{
                                        "& .MuiListItemText-primary": {
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            color: 'inherit',
                                        }
                                    }} />
                                </ListItemButton>
                            </List>
                        </Popover>


                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

Header.PropTypes = {
    ToggleSidebar: PropTypes.any,
    isCollapsed: PropTypes.any,
};

export default Header;
