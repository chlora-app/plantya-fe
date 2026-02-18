import React from "react";
import {
    Popover,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";

const SidebarPopover = (props) => {
    const {
        open,
        anchorEl,
        onClose,
        item,
        location,
    } = props;

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "center",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    onMouseLeave: () => {
                        setTimeout(onClose, 100);
                    },
                    className: "sidebar-popover",
                    sx: {
                        p: 1,
                        minWidth: "160px",
                        ml: 1,
                        overflow: "visible",
                    },
                },
            }}
        >
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    color: "text.secondary",
                }}
            >
                {item.sub?.map((sub, subIndex) => (
                    <ListItemButton
                        key={subIndex}
                        component={Link}
                        to={sub.path}
                        selected={location.pathname === sub.path}
                        onClick={onClose}
                        sx={{
                            borderRadius: 35,
                            "&.Mui-selected": {
                                bgcolor: "layout.sidebarActive",
                                color: "primary.main",
                            },
                            "&:hover": {
                                bgcolor: "layout.sidebarActive",
                                color: "primary.main",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                color: "text.secondary",
                                ".Mui-selected &": {
                                    color: "primary.main",
                                },
                                ".MuiListItemButton-root:hover &": {
                                    color: "primary.main",
                                },
                            }}
                        >
                            <Icon path={sub.icon} size="24px" />
                        </ListItemIcon>

                        <ListItemText
                            primary={sub.text}
                            sx={{
                                "& .MuiListItemText-primary": {
                                    fontWeight: "medium",
                                    fontSize: "13px",
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Popover>
    );
};

export default SidebarPopover;
