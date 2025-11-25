import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";



const SIDEBAR_COLLAPSE_WIDTH = 70;
const SIDEBAR_WIDTH = 280;
const HEADER_HEIGHT = 70;

const AuthLayout = ({ children }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        // Container
        <div style={{ display: 'flex', height: "100vh", overflow: "visible" }}>

            {/* Sidebar */}
            <aside
                style={{
                    width: isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: '100vh',
                    backgroundColor: "#0F1624",
                    borderRight: "3px solid #352F44",
                    overflow: "visible",
                    transition: "width 0.3s ease",
                    zIndex: 1200,
                }}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    heightHeader={HEADER_HEIGHT}
                />
            </aside>

            {/* Floating Toggle Button */}
            {/* Floating Toggle Button */}
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: "fixed",
                    top: HEADER_HEIGHT,
                    left: isCollapsed
                        ? SIDEBAR_COLLAPSE_WIDTH - 15
                        : SIDEBAR_WIDTH - 15,
                    transform: "translateY(-50%)",
                    zIndex: 2001,
                    width: 36,
                    height: 36,
                    backgroundColor: "#ffc107",
                    borderRadius: "50%",
                    transition: "left 0.3s ease",   // ⭐ ANIMASI SAMA DENGAN SIDEBAR
                    "&:hover": {
                        backgroundColor: "#e6b800"
                    }
                }}
            >
                <MenuIcon />
            </IconButton>



            {/* Header and Content Wrapper */}
            <div
                style={{
                    marginLeft: isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.3s ease",
                    height: "100vh",
                    overflow: "visible",
                }}
            >

                {/* Header */}
                <header
                    style={{
                        height: HEADER_HEIGHT,
                        backgroundColor: "#0F1624",
                        borderBottom: "3px solid #352F44",
                        position: "sticky",
                        top: 0,
                        zIndex: 1100,
                    }}
                >
                    <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
                </header>


                {/* Main Content */}
                <main
                    style={{
                        flex: 1,
                        padding: "24px",
                        backgroundColor: "#0F1624",
                        color: "#fff",
                        overflowY: "auto",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>

    );
};

export default AuthLayout;