import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuRoutes from "../../../routes/MenuRoutes";
import { useThemeMode } from "../../../context/ThemeContext";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";

const Sidebar = (props) => {
    const location = useLocation();

    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverParentIndex, setPopoverParentIndex] = useState(null);

    // Filter Menu and Footer
    const menuItems = useMemo(() =>
        MenuRoutes.filter(item => item.section === "main"),
        []
    )

    const footerItems = useMemo(() =>
        MenuRoutes.filter(item => item.section === "footer"),
        []
    )

    // Toggle Expand Menu 
    const handleToggleMenu = (index) => {
        setOpenMenuIndex(prev => prev === index ? null : index)
    }

    // Popover Collapse Mode
    const handleOpenPopover = (event, index) => {
        setAnchorEl(event.currentTarget);
        setPopoverParentIndex(index);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setPopoverParentIndex(null);
    };

    const isChildSelected = (item) => {
        if (!item.sub) return false
        return item.sub.some(sub => location.pathname === sub.path)
    }

    // Auto Expand Parent Jika Active Child
    useEffect(() => {
        if (props.isCollapsed && !props.isMobileOpen) {
            return;
        }

        handleClosePopover()
        setOpenMenuIndex(null)

        menuItems.forEach((item, index) => {
            if (item.sub) {
                let isMatch = item.sub.some(sub => sub.path === location.pathname);
                if (isMatch) {
                    setOpenMenuIndex(index);
                }
            }
        });
    }, [location.pathname, props.isCollapsed, props.isMobileOpen, menuItems]);

    return (
        <Box className="sidebar-container">
            <SidebarHeader
                isCollapsed={props.isCollapsed}
                heightHeader={props.heightHeader}
                toggleSidebar={props.toggleSidebar}
            />

            <SidebarBody
                isCollapsed={props.isCollapsed}
                isMobileOpen={props.isMobileOpen}
                handleMobileClose={props.handleMobileClose}
                menuItems={menuItems}
                footerItems={footerItems}
                openMenuIndex={openMenuIndex}
                handleToggleMenu={handleToggleMenu}
                handleOpenPopover={handleOpenPopover}
                handleClosePopover={handleClosePopover}
                anchorEl={anchorEl}
                popoverParentIndex={popoverParentIndex}
                isChildSelected={isChildSelected}
                location={location}
            />
        </Box >
    );
};

Sidebar.propTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
    userData: PropTypes.any,
    isMobileOpen: PropTypes.any,
    handleMobileClose: PropTypes.any,
};

export default Sidebar;