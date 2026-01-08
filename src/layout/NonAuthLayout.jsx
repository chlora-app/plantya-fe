import React from "react";
import { Box, Grid, Container, Paper, Typography, Card, CardContent } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import Icon from "@mdi/react";
import { mdiLeaf } from '@mdi/js';
import { useTheme } from '@mui/material/styles';

const NonAuthLayout = ({ children }) => {
    const theme = useTheme();

    const cardContent = [
        {
            icon: "Later",
            title: 'Humidity',
            desc: "Test Humidity",
        },
        {
            icon: "Later",
            title: 'Temperature',
            desc: "Test Temperature",
        },
        {
            icon: "Later",
            title: 'Temperature',
            desc: "Test Temperature",
        },
        {
            icon: "Later",
            title: 'pH',
            desc: "Test pH",
        }
    ]

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                p: { xs: 0, sm: 2 },
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: { xs: '100%', sm: "90%", md: '85%', lg: "80%" },
                    height: { xs: '100%', sm: '85%', md: "80%" },
                    maxWidth: '1200px',
                    maxHeight: '800px',
                    borderRadius: 5,
                    overflow: 'hidden',
                }}
            >
                {/* LEFT SIDE */}
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        flex: 1,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        component="img"
                        src="/LoginBg.png"
                        alt="Background"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            zIndex: 1,
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            textAlign: 'left',
                            color: 'white',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 5,
                            // bgcolor: 'darkRed'
                        }}
                    >
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1} bgcolor={"rgba(0, 0, 0, 0.5)"} borderRadius={25} width={"fit-content"} px={2}>
                            <img
                                src="/SmallIcon.png"
                                alt="Logo"
                                style={{
                                    height: 30,
                                    width: 30,
                                }}
                            />
                            <Typography variant="h5" fontWeight="medium">Plantya</Typography>
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Box>
                                <Typography variant="h6" fontWeight="medium">
                                    Smart Monitoring for
                                </Typography>
                                <Typography variant="h6" fontWeight="medium">
                                    Modern Growth.
                                </Typography>
                            </Box>
                            <Box sx={{ opacity: 0.8 }}>
                                <Typography variant="body2" fontWeight="light">
                                    Harness the power of machine learning to optimize your
                                </Typography>
                                <Typography variant="body2" fontWeight="light">
                                    plantation's yield. Real-time insights, right at your fingertips.
                                </Typography>
                            </Box>

                            <Box display={"flex"} flexDirection={"row"} sx={{ bgcolor: 'darkRed' }}>
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={'auto'} // ← AUTO menyesuaikan
                                    freeMode={true} // ← Biar scroll bebas, bukan snap
                                    mousewheel={true} // ← Scroll dengan mouse wheel
                                    grabCursor={true} // ← Tangan cursor
                                    // NONAKTIFKAN fitur carousel:
                                    navigation={false}
                                    pagination={false}
                                    autoplay={false}
                                    loop={false}
                                    // Responsive
                                    breakpoints={{
                                        320: { slidesOffsetBefore: 16, slidesOffsetAfter: 16 }, // Padding mobile
                                        768: { slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                                    }}
                                    style={{
                                        padding: '8px 4px',
                                        cursor: 'grab',
                                        '&:active': { cursor: 'grabbing' }
                                    }}
                                >
                                    {cardContent.map((item, idx) => (
                                        <SwiperSlide key={idx} style={{ width: 'auto', bgcolor: 'darkGreen' }}> {/* Width auto */}
                                            <Card sx={{ minWidth: 180, height: 100 }}>
                                                <CardContent>{item.title}</CardContent>
                                                <CardContent>{item.desc}</CardContent>
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Box>
                    </Box>



                </Box>

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: { xs: 5, md: 0 },
                        borderBottomRightRadius: { xs: 5, md: 0 },
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                        p: { xs: 4, sm: 5, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                        }}>
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Container >
    );
};
export default NonAuthLayout;