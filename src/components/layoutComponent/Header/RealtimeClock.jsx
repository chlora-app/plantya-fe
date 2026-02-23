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
                    <Typography variant="body1" color={"text.primary"} fontWeight={"medium"}>
                        {date}
                    </Typography>
                </Box>
                <Box display={"flex"} gap={0.2}>
                    <Typography
                        variant="body2"
                        fontWeight={"medium"}
                        letterSpacing={1}
                        color="text.primary"
                        sx={{
                            fontVariantNumeric: "tabular-nums",
                            fontFeatureSettings: '"tnum"',
                            minWidth: "57px",
                        }}>
                        {time}
                    </Typography>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        px={1}
                        borderRadius={"10px"}
                        bgcolor={"layout.sidebarActive"}
                    >
                        {time && (
                            <Typography variant="body2" fontWeight={"bold"} color={"primary.main"}>
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