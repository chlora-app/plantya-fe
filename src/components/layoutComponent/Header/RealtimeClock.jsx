import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const RealtimeClock = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()

            setDate(
                now.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
            )

            setTime(
                now.toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <Box>
                <Box>
                    <Typography variant="caption" color={"text.secondary"} letterSpacing={1} fontWeight={"medium"}>
                        {date.toUpperCase()}
                    </Typography>
                </Box>
                <Box display={"flex"} gap={1}>
                    <Typography
                        fontFamily={"monospace"}
                        variant="body1"
                        fontWeight={"bold"}
                        letterSpacing={1}
                        color="text.secondary"
                        sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {time}
                    </Typography>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        px={0.7}
                        borderRadius={"5px"}
                        bgcolor={"layout.sidebarActive"}
                    >
                        {time && (
                            <Typography variant="caption" fontWeight={"bold"} color={"primary.main"}>
                                LIVE
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default RealtimeClock;