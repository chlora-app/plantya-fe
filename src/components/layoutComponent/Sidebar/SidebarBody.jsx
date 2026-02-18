import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    Typography,
    Tooltip,
    Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import Icon from '@mdi/react';
import SidebarPopover from "./SidebarPopover";

const SidebarBody = (props) => {
    return (
        <>
            <Box className="sidebar-body-container" px={2} gap={2}>
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                    <Typography
                        className="sidebar-body-title"
                        variant="caption"
                        fontWeight={"bold"}
                        letterSpacing={0.7}
                        justifyContent={props.isCollapsed ? 'center' : 'left'}
                        px={1}
                    >
                        {props.isCollapsed ? "MAIN" : "MAIN NAVIGATION"}
                    </Typography>

                    <List
                        className="sidebar-body-child"
                        sx={{ gap: 1 }}
                    >
                        {props.menuItems.map((item, index) => {
                            const isParent = !!item.sub;
                            const isSelected = (!isParent && props.location.pathname === item.path) || (isParent && props.isChildSelected(item));
                            return (
                                <React.Fragment key={index}>
                                    <Tooltip
                                        title={props.isCollapsed ? item.text : ""}
                                        placement="right"
                                        arrow
                                        disableHoverListener={!props.isCollapsed}
                                        slots={{
                                            transition: Fade,
                                        }}
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    backgroundColor: "action.hover",
                                                    fontSize: '13px'
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: 'action.hover',
                                                    fontSize: '13px'
                                                }
                                            },
                                            transition: { timeout: 300 },
                                        }}
                                    >
                                        <ListItemButton
                                            component={!isParent ? Link : "button"}
                                            to={!isParent ? item.path : undefined}
                                            onClick={(e) => {
                                                if (props.isCollapsed && isParent) {
                                                    props.handleOpenPopover(e, index);
                                                } else if (isParent) {
                                                    props.handleToggleMenu(index)
                                                }
                                                // if (!isParent && props.isMobileOpen && props.handleMobileClose) {
                                                //     debugger
                                                //     props.handleMobileClose();
                                                // }
                                            }
                                            }
                                            selected={isSelected}
                                            sx={{
                                                borderRadius: props.isCollapsed ? '50%' : "15px",
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: "all 0.3s ease",
                                                pr: 1,
                                                pl: 2,

                                                ...(props.isCollapsed && {
                                                    px: 0,
                                                    justifyContent: "center",
                                                    borderRadius: 50,
                                                }),
                                                // bgcolor: 'purple',


                                                "&.Mui-selected": {
                                                    backgroundColor: "action.hover",
                                                    borderRadius: "15px",
                                                    color: 'primary.main'
                                                },
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    color: 'primary.main',
                                                    borderRadius: "15px",
                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "action.hover",
                                                    color: 'primary.main',
                                                },

                                            }}
                                        >
                                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                                                <ListItemIcon
                                                    sx={{
                                                        color: 'text.secondary',
                                                        minWidth: props.isCollapsed ? 0 : 40,
                                                        // mr: props.isCollapsed ? 0 : 1,
                                                        "& svg": {
                                                            fontSize: props.isCollapsed ? 24 : 20,
                                                        },

                                                        ".Mui-selected &": {
                                                            color: "primary.main",
                                                        },

                                                        // 🔥 hover parent
                                                        ".MuiListItemButton-root:hover &": {
                                                            color: "primary.main",
                                                        },
                                                    }}
                                                >
                                                    {item.icon}
                                                </ListItemIcon>

                                                {!props.isCollapsed && (
                                                    <ListItemText
                                                        primary={item.text}
                                                        sx={{
                                                            display: props.isCollapsed ? "none" : "flex",
                                                            width: props.isCollapsed ? 0 : 'auto',
                                                            transition: "width 0.3s ease",
                                                            overflow: "hidden",

                                                            "& .MuiListItemText-primary": {
                                                                fontWeight: "medium",
                                                                fontSize: '13px'
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            <Box display={"flex"} flexDirection={"row"}>
                                                {isParent && !props.isCollapsed && (
                                                    <ExpandMore
                                                        sx={{
                                                            opacity: props.isCollapsed ? 0 : 1,
                                                            transform: props.openMenuIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                            transition: "transform 0.3s ease, opacity 0.3s ease",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </ListItemButton>
                                    </Tooltip>

                                    {
                                        props.isCollapsed && (
                                            <SidebarPopover
                                                open={props.popoverParentIndex === index}
                                                anchorEl={props.anchorEl}
                                                onClose={props.handleClosePopover}
                                                item={item}
                                                location={props.location}
                                            />
                                        )
                                    }



                                    {/* Child Menu */}
                                    {
                                        isParent && !props.isCollapsed && (
                                            <Collapse in={props.openMenuIndex === index} timeout={"auto"} unmountOnExit>
                                                <Box sx={{ mb: 1 }}>
                                                    <List component="div" disablePadding
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1,
                                                            width: '80%',
                                                            ml: '20%',
                                                            // borderLeft: '1px solid',
                                                            // borderLeftColor: 'divider',
                                                            pl: 1,
                                                        }}
                                                    >
                                                        {item.sub.map((sub, subIndex) => (
                                                            <ListItemButton
                                                                key={subIndex}
                                                                component={Link}
                                                                to={sub.path}
                                                                selected={props.location.pathname === sub.path}
                                                                // onClick={() => {
                                                                //     if (props.isMobileOpen && props.handleMobileClose) {
                                                                //         props.handleMobileClose();
                                                                //     }
                                                                // }}
                                                                sx={{
                                                                    borderRadius: "15px",
                                                                    px: 0,
                                                                    "&.Mui-selected": {
                                                                        bgcolor: "layout.sidebarActive",
                                                                        color: 'primary.main'
                                                                    },
                                                                    "&:hover": {
                                                                        bgcolor: "layout.sidebarActive",
                                                                        color: 'primary.main',
                                                                    },
                                                                    "&.Mui-selected:hover": {
                                                                        bgcolor: "layout.sidebarActive",
                                                                        color: 'primary.main'
                                                                    },
                                                                }}
                                                            >

                                                                <ListItemText
                                                                    primary={sub.text}
                                                                    sx={{
                                                                        opacity: props.isCollapsed ? 0 : 1,
                                                                        width: props.isCollapsed ? 0 : 'auto',
                                                                        transition: "opacity 0.3s ease, width 0.3s ease",
                                                                        "& .MuiListItemText-primary": {
                                                                            fontWeight: "medium",
                                                                            fontSize: '13px'
                                                                        },
                                                                    }}
                                                                />
                                                            </ListItemButton>
                                                        ))}
                                                    </List>
                                                </Box>
                                            </Collapse>
                                        )
                                    }
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>


                {/* OTHERS */}
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                    <Typography
                        variant="caption"
                        fontWeight={"bold"}
                        px={1}
                        letterSpacing={0.7}
                        justifyContent={props.isCollapsed ? 'center' : 'left'}
                        className="sidebar-body-title"
                    >
                        OTHERS
                    </Typography>

                    <List
                        className="sidebar-body-child"
                        sx={{ p: 0, gap: 1 }}
                    >
                        {props.footerItems.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Tooltip
                                        title={props.isCollapsed ? item.text : ""}
                                        placement="right"
                                        arrow
                                        disableHoverListener={!props.isCollapsed}
                                        slots={{
                                            transition: Fade,
                                        }}
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: "layout.sidebarActive",
                                                    fontSize: '13px'
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: 'action.hover',
                                                }
                                            },
                                            transition: { timeout: 300 },
                                        }}
                                    >
                                        {/* Menu Footer */}
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={props.location.pathname === item.path}
                                            // onClick={() => {
                                            //     if (props.isMobileOpen && props.handleMobileClose) {
                                            //         props.handleMobileClose();
                                            //     }
                                            // }}
                                            sx={{
                                                borderRadius: "15px",
                                                mb: 1,
                                                transition: "all 0.3s ease",

                                                ...(props.isCollapsed && {
                                                    px: 0,
                                                    justifyContent: "center",
                                                    borderRadius: '50%',
                                                }),

                                                "&.Mui-selected": {
                                                    bgcolor: "layout.sidebarActive",
                                                    borderRadius: 35,
                                                    color: 'primary.main'
                                                },
                                                "&:hover":
                                                {
                                                    bgcolor: "layout.sidebarActive",
                                                    borderRadius: "15px",
                                                    color: 'primary.main',
                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "layout.sidebarActive",
                                                    color: 'primary.main',
                                                },

                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    color: 'inherit',
                                                    minWidth: props.isCollapsed ? 0 : 40,
                                                    mr: props.isCollapsed ? 0 : 1,


                                                    ".Mui-selected &": {
                                                        color: "primary.main",
                                                    },

                                                    // 🔥 hover parent
                                                    ".MuiListItemButton-root:hover &": {
                                                        color: "primary.main",
                                                    },
                                                }}
                                            >
                                                {<Icon path={item.icon} size={props.isCollapsed ? "24px" : "20px"} />}
                                            </ListItemIcon>

                                            {!props.isCollapsed && (
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{
                                                        opacity: props.isCollapsed ? 0 : 1,
                                                        width: props.isCollapsed ? 0 : 'auto',
                                                        transition: "opacity 0.3s ease, width 0.3s ease",
                                                        overflow: "hidden",
                                                        "& .MuiListItemText-primary": {
                                                            fontWeight: "medium",
                                                            fontSize: '13px'
                                                        }
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>


                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>

            </Box>

        </>
    )
}
export default SidebarBody;