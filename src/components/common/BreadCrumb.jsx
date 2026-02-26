import React from "react";
import { Breadcrumbs, Typography, Link, Stack, Box } from "@mui/material";
import { NavigateNextIcon, DashboardIcon, HomeIcon } from "../../assets/Icon/muiIcon";

const BreadCrumb = (props) => {
    return (
        <Stack mb={2}>
            <Breadcrumbs
                separator={
                    <NavigateNextIcon
                        sx={{ color: "text.secondary", fontSize: '14px' }}
                    />
                }
                aria-label="breadcrumb"
            >
                {props.items.map((item, index) => {
                    const isLast = index === props.items.length - 1;
                    const isFirst = index === 0;
                    const color = isLast ? "primary.main" : "text.secondary";

                    const content = (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center',
                                gap: 0.5,
                            }}
                        >
                            {isFirst && (
                                <HomeIcon
                                    sx={{
                                        fontSize: "14px",
                                        color: color,
                                    }}
                                />
                            )}
                            <Typography
                                color={color}
                                fontWeight="medium"
                                variant="body1"
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    );

                    return item.path && !isLast ? (
                        <Link
                            key={index}
                            underline="hover"
                            href={item.path}
                            color="inherit"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            {content}
                        </Link>
                    ) : (
                        <Box key={index}>{content}</Box>
                    );
                })}
            </Breadcrumbs>
        </Stack>
    );
};

export default BreadCrumb;