import React from "react";
import { Breadcrumbs, Typography, Link, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadCrumb = ({ items }) => {
    return (
        <Stack mb={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {items.map((item, index) =>
                    item.path ? (
                        <Link
                            key={index}
                            underline="hover"
                            color="inherit"
                            href={item.path}
                            variant="body1"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <Typography
                            key={index}
                            color="text.primary"
                            fontWeight="medium"
                            variant="body1"
                        >
                            {item.label}
                        </Typography>
                    )
                )}
            </Breadcrumbs>
        </Stack>
    );
};

export default BreadCrumb;