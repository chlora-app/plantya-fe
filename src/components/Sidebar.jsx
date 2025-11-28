import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    Collapse,
    Typography,
    Tooltip,
    Popover,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


const Sidebar = (props) => {
    const location = useLocation();

    // State and Function Sidebar Expand
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const handleToggleMenu = (index) => {
        setOpenMenuIndex(prev => prev === index ? null : index)
    }

    // State and Function Sidebar Collapse


    // Mapping dari index.jsx route path
    const menuItems = [
        {
            text: "Dashboard",
            path: "/dashboard",
            icon: <DashboardCustomizeIcon />
        },
        {
            text: "Master Data",
            icon: <PeopleIcon />,

            sub: [
                { text: "User", path: "/master-data/user", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
            ],
        },
        {
            text: "Reports",
            icon: <PeopleIcon />,

            sub: [
                { text: "testing", path: "/testing", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
            ],
        },
        {
            text: "Test",
            icon: <PeopleIcon />,

            sub: [
                { text: "Test", path: "/test", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
                { text: "Test", path: "/test", icon: <PersonIcon /> },
                { text: "Test", path: "/test", icon: <PersonIcon /> },
                { text: "Test", path: "/test", icon: <PersonIcon /> },
            ],
        },






        { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];
    const footerItems = [
        {
            text: "Support",
            path: "/dashboard",
            icon: <DashboardCustomizeIcon />
        },
        {
            text: "About",
            icon: <PeopleIcon />,
            path: "/about",
        },

        // { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];

    // Expand Parent Jika Child Menu Active Sesuai Path
    useEffect(() => {
        menuItems.forEach((item, index) => {
            if (item.sub) {
                let isMatch = item.sub.some(sub => sub.path === location.pathname);
                if (isMatch) {
                    setOpenMenuIndex(index);
                }
            }
        });
    }, [location.pathname]);



    return (
        // Container 
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                // overflow: "hidden",
                backgroundColor: "#0F1624",
                color: "#fff",
            }}
        >

            {/* Header Sidebar */}
            <Box
                sx={{
                    minHeight: props.heightHeader,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid #352F44",
                }}
            // className="bg-info"
            >
                <img
                    src={props.isCollapsed ? "/SmallIcon.png" : "/BaseLogo.png"}
                    alt="Logo"
                    style={{
                        height: 40,
                        width: 'auto',
                    }}
                />
            </Box>

            {/* Container Main and Footer Sidebar */}
            <Box
                sx={{
                    p: 0,
                    // flex: 1,
                    // minHeight: '60%',
                    overflowY: "auto",
                    overflowX: "hidden",
                    /* Hide scrollbar for Chrome, Safari and Edge */
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    /* Hide scrollbar for Firefox */
                    scrollbarWidth: "none",
                }}
            >

                {/* Main Sidebar */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: "3px solid #352F44",
                    }}
                // className="bg-success"
                >
                    <Typography
                        sx={{
                            px: 3,
                            mx: 1,
                            flex: 1,
                            my: 1,
                            color: '#64748B'
                        }}
                        variant="body2"
                    // className="bg-warning"
                    >
                        MAIN
                    </Typography>

                    <List sx={{
                        flex: 1, p: 0, color: '#64748B',
                        // my: 1,
                    }} className="d-flex flex-column" >
                        {menuItems.map((item, index) => {
                            const isParent = !!item.sub;

                            return (
                                <React.Fragment key={index}>

                                    {/* Menu without child */}
                                    {!isParent && (
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={location.pathname === item.path}
                                            sx={{
                                                borderRadius: 35,
                                                mb: 1,
                                                "&.Mui-selected": {
                                                    bgcolor: "#323347",
                                                    borderRadius: 35,
                                                    color: '#FFFFFF'
                                                },
                                                "&:hover": { bgcolor: "#323347", borderRadius: 35, color: '#FFFFFF', transition: "all 0.5s ease" },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    color: 'inherit',
                                                    "& svg": {
                                                        fontSize: 20,
                                                    },
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>


                                            <ListItemText
                                                primary={item.text}
                                                sx={{
                                                    "& .MuiListItemText-primary": {
                                                        fontWeight: 600,
                                                    }
                                                }}
                                            />
                                        </ListItemButton>
                                    )}

                                    {/* Menu with child */}
                                    
                                    {isParent && (
                                        <>
                                            <ListItemButton
                                                onClick={() => handleToggleMenu(index)}

                                                sx={{
                                                    borderRadius: 35,
                                                    mb: 1,
                                                    "&.Mui-selected": {
                                                        bgcolor: "#323347",
                                                        borderRadius: 35,
                                                        color: '#FFFFFF'
                                                    },
                                                    "&:hover": {
                                                        bgcolor: "#323347", borderRadius: 35, color: '#FFFFFF',
                                                        transition: "all 0.5s ease"
                                                    },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        color: 'inherit',
                                                        "& svg": {
                                                            fontSize: 20,
                                                        },
                                                    }}
                                                >
                                                    {item.icon}
                                                </ListItemIcon>


                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{
                                                        "& .MuiListItemText-primary": {
                                                            fontWeight: 600,
                                                        }
                                                    }}
                                                />
                                                <ExpandMore
                                                    sx={{
                                                        transform: openMenuIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                        transition: "transform 0.5s ease",
                                                    }}
                                                />

                                            </ListItemButton>

                                            {/* Child Menu */}
                                            <Collapse in={openMenuIndex === index} timeout={500} unmountOnExit>
                                                <Box
                                                    sx={{
                                                        mb: 1,
                                                        opacity: openMenuIndex === index ? 1 : 0,
                                                        transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                                                    }}
                                                >
                                                    <List component="div" disablePadding
                                                        sx={{
                                                            width: '80%',
                                                            ml: '20%',
                                                            borderLeft: '3px solid #352F44',
                                                            pl: 1,
                                                            // pt:1,

                                                        }}
                                                        className="d-flex flex-column gap-2"
                                                    >
                                                        {item.sub.map((sub, subIndex) => (
                                                            <ListItemButton
                                                                key={subIndex}
                                                                component={Link}
                                                                to={sub.path}
                                                                selected={location.pathname === sub.path}
                                                                sx={{
                                                                    // mb: 1,
                                                                    borderRadius: 35,
                                                                    "&.Mui-selected": {
                                                                        bgcolor: "#323347",
                                                                        borderRadius: 35,
                                                                        color: '#FFFFFF'
                                                                    },
                                                                    "&:hover": { bgcolor: "#323347", borderRadius: 35, color: '#FFFFFF', transition: "all 0.5s ease" },
                                                                }}
                                                            // className="bg-success"

                                                            >
                                                                <ListItemIcon sx={{ minWidth: 36, color: "#64748B" }} >
                                                                    {sub.icon}
                                                                </ListItemIcon>
                                                                <ListItemText primary={sub.text} />
                                                            </ListItemButton>
                                                        ))}
                                                    </List>
                                                </Box>
                                            </Collapse>

                                        </>
                                    )
                                    }
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>


                {/* Footer Sidebar */}
                <Box
                    sx={{
                        // borderBottom: "3px solid #352F44",
                        p: 2,
                    }}
                // className="bg-info"
                >
                    <Typography
                        sx={{
                            px: 3,
                            mx: 1,
                            flex: 1,
                            mt: 1,
                            mb: 1,
                            color: '#64748B'
                        }}
                        variant="body2"
                    // className="bg-warning"
                    >
                        Others
                    </Typography>

                    <List sx={{
                        flex: 1, p: 0, color: '#64748B',
                        // my: 1,
                    }} className="d-flex flex-column" >
                        {footerItems.map((item, index) => {
                            // const isParent = !!item.sub;

                            return (
                                <React.Fragment key={index}>

                                    {/* Menu without child */}
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        selected={location.pathname === item.path}
                                        sx={{
                                            borderRadius: 35,
                                            mb: 1,
                                            "&.Mui-selected": {
                                                bgcolor: "#323347",
                                                borderRadius: 35,
                                                color: '#FFFFFF'
                                            },
                                            "&:hover": { bgcolor: "#323347", borderRadius: 35, color: '#FFFFFF', transition: "all 0.5s ease" },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                color: 'inherit',
                                                "& svg": {
                                                    fontSize: 20,
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>


                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 600,
                                                }
                                            }}
                                        />
                                    </ListItemButton>


                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
            </Box>


        </div >
    );
};

Sidebar.PropTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
};

export default Sidebar;
