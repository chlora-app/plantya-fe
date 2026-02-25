import React from "react";
import { Breadcrumbs, Typography, Link, Stack, Box } from "@mui/material";
import { NavigateNextIcon, DashboardIcon } from "../../assets/Icon/muiIcon";

const BreadCrumb = (props) => {
    return (
        <Stack mb={2}>
            <Breadcrumbs
                separator={
                    <NavigateNextIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                    />
                }
                aria-label="breadcrumb"
            >
                {props.items.map((item, index) => {
                    const isLast = index === props.items.length - 1;
                    const isFirst = index === 0;
                    const color = isLast ? "text.primary" : "text.secondary";

                    const content = (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            {isFirst && (
                                <DashboardIcon
                                    sx={{
                                        fontSize: 16,
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