import React from "react"
import { Box, Typography } from "@mui/material"

const Footer = () => {
    return (
        <Box component="footer" p={2} className="auth-layout-footer">
            <Typography variant="body1" color="text.secondary" px={1}>
                © {new Date().getFullYear()} Chlora. All rights reserved.
            </Typography>
        </Box>
    )
}
export default Footer
