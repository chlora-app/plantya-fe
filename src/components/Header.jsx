import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // ❌ Icon untuk tutup sidebar
import LogoutIcon from "@mui/icons-material/Logout"; // 🔒 Tambahan agar lebih konsisten

const Header = ({ toggleSidebar, isCollapsed }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#0F1624",
                zIndex: 1201, // pastikan tetap di atas sidebar
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* Judul Header */}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Template Dashboard
                </Typography>

                {/* Tombol Logout */}
                <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.9rem",
                    }}
                >
                    <LogoutIcon fontSize="small" />
                    Logout
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
