import React, { useState, useEffect, useMemo } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    Select,
    MenuItem,
    Paper, Stack
} from "@mui/material";
import Icon from '@mdi/react';
import {
    mdiMenuSwap,
    mdiMenuUp,
    mdiMenuDown,
    mdiChevronRight,
    mdiChevronLeft,
    mdiChevronDoubleLeft,
    mdiChevronDoubleRight
} from '@mdi/js';
import { useTheme } from "@mui/material/styles";



// Pindahkan StyledTableCell ke luar komponen agar tidak dibuat ulang setiap render
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderBottom: "1px solid",
        borderColor: theme.palette.table.border,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '7px',
        color: theme.palette.text.primary,
    },
    [`&.${tableCellClasses.body}`]: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '7px',
        color: theme.palette.text.primary,
    },
}));

const TableCustom = (props) => {
    const theme = useTheme();

    const [page, setPage] = useState(props.page || 0)
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 10)
    const [sortField, setSortField] = useState(props.sortField || '');
    const [sortOrder, setSortOrder] = useState(props.sortOrder || 'asc');

    useEffect(() => {
        setPage(props.page || 0)
    }, [props.page])

    useEffect(() => {
        setRowsPerPage(props.rowsPerPage || 10)
    }, [props.rowsPerPage])

    useEffect(() => {
        setSortField(props.sortField || '');
        setSortOrder(props.sortOrder || 'asc');
    }, [props.sortField, props.sortOrder])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        if (props.onPageChange) {
            props.onPageChange(newPage)
        }
    }

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10)
        setRowsPerPage(newRowsPerPage)
        if (props.onRowsPerPageChange) {
            props.onRowsPerPageChange(newRowsPerPage)
        }
    }

    const handleRequestSort = (event, property) => {
        const isAsc = sortField === property && sortOrder === 'asc';
        const newSortOrder = isAsc ? 'desc' : 'asc';
        setSortField(property);
        setSortOrder(newSortOrder);
        if (props.onRequestSort) {
            props.onRequestSort(property, newSortOrder);
        }
    };

    const calculateRange = () => {
        const from = props.appdataTotal === 0 ? 0 : (page * rowsPerPage) + 1;
        const to = Math.min((page * rowsPerPage) + rowsPerPage, props.appdataTotal);
        return { from, to };
    };

    const { from, to } = calculateRange();

    const totalPages = props.totalPage || 1;
    const isFirstPage = page === 0;
    const isLastPage = page + 1 >= totalPages;

    // Gunakan useMemo untuk komponen yang sering berubah
    const renderPageNumbers = useMemo(() => {
        const maxVisiblePages = 3;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (page + 1 <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (page + 1 + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = page + 1 - maxPagesBeforeCurrent;
                endPage = page + 1 + maxPagesAfterCurrent;
            }
        }

        const pages = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );

        return pages.map((pageNum) => (
            <Box
                key={pageNum}
                component="button"
                onClick={() => handleChangePage(null, pageNum - 1)}
                sx={{
                    border: "1px solid",
                    borderColor: theme.palette.primary.main,
                    bgcolor: 'background.paper', // or theme.palette.table.background
                    // borderColor: pageNum === page + 1 ? 'primary.main' : 'primary.main',
                    color: 'text.primary',

                    // borderRadius: 2,
                    minWidth: { xs: 32, sm: 32, md: 36 },
                    height: { xs: 32, sm: 32, md: 36 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    bgcolor: pageNum === page + 1 ? 'primary.main' : 'background.paper',
                    color: pageNum === page + 1 ? 'primary.contrastText' : 'text.primary',
                    fontWeight: "medium",
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: pageNum === page + 1 ? 'primary.dark' : 'action.hover',
                        borderColor: pageNum === page + 1 ? 'primary.dark' : 'text.secondary',
                    }
                }}
            >
                {pageNum}
            </Box>
        ));
    }, [page, totalPages]);

    // Optimasi render header columns dengan useMemo
    const headerColumns = useMemo(() => {
        return props.columns.map((column) => (
            <StyledTableCell
                key={column.dataField}
                align={column.headerAlign || 'left'}
                sx={{
                    minWidth: column.minWidth || 'auto',
                }}
            >
                {column.sort ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: column.headerAlign === 'center' ? 'center' :
                                column.headerAlign === 'right' ? 'flex-end' : 'flex-start',
                        }}
                        onClick={() => handleRequestSort(null, column.dataField)}
                    >
                        <Typography
                            variant="body1"
                            fontWeight="medium"
                        >
                            {column.text}
                        </Typography>

                        {/* Icon Sort Section */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            {sortField === column.dataField ? (
                                sortOrder === 'asc' ? (
                                    <Icon path={mdiMenuUp} size={1} />
                                ) : (
                                    <Icon path={mdiMenuDown} size={1} />
                                )
                            ) : (
                                <Icon path={mdiMenuSwap} size={1} />
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: column.headerAlign === 'center' ? 'center' :
                                column.headerAlign === 'right' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="span"
                            fontWeight="medium"
                        >
                            {column.text}
                        </Typography>
                    </Box>
                )}
            </StyledTableCell>
        ));
    }, [props.columns, sortField, sortOrder]);

    // Optimasi render body rows dengan useMemo
    const bodyRows = useMemo(() => {
        if (props.appdata.length === 0 && !props.loadingData) {
            return (
                <TableRow>
                    <StyledTableCell colSpan={props.columns.length} align="center">
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.875rem' } }}>
                            No records to display
                        </Typography>
                    </StyledTableCell>
                </TableRow>
            );
        }

        return props.appdata.map((row) => (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row[props.keyField]}
                sx={{
                    "&:hover": {
                        backgroundColor: theme.palette.table.hover,
                    },
                    "&:nth-of-type(even)": {
                        backgroundColor: theme.palette.table.striped,
                    }
                }}
            >
                {props.columns.map((column) => {
                    const value = row[column.dataField];
                    return (
                        <StyledTableCell
                            key={column.dataField}
                            align={column.bodyAlign || 'left'}
                            sx={{
                                minWidth: column.minWidth || 'auto',
                                padding: { xs: '8px 12px', sm: '8px 12px', md: '8px 16px' },
                            }}
                            size="small"
                        >
                            {column.formatter ? column.formatter(value, row) : value}
                        </StyledTableCell>
                    );
                })}
            </TableRow>
        ));
    }, [props.appdata, props.columns, props.keyField, props.loadingData, theme]);

    return (

        <>
            <TableContainer

                sx={{
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: theme.palette.table.border,
                    position: 'relative',
                    overflowX: 'auto',
                }}
            >
                <Table
                    size="small"
                    aria-label="a dense table"
                    width="100%"
                    sx={{
                        border: 'none',
                        tableLayout: 'auto',
                        width: 'max-content',
                        minWidth: '100%'
                    }}
                >
                    <TableHead
                        sx={{
                            bgcolor: theme.palette.table.headerBackground, // <- header bg
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            borderBottom: 'none',
                        }}
                    >
                        <TableRow>
                            {headerColumns}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {bodyRows}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* FOOTER SECTION */}
            <Stack
                direction={{ sm: 'column', md: 'row' }}
                justifyContent={{ sm: 'center', md: 'space-between' }}
                mt={2}
            >
                <Typography variant="body2" textAlign={{ sm: 'center', md: 'left' }}>
                    Showing {from} to {to} of {props.appdataTotal} entries
                </Typography>

                <Box display={"flex"} gap={1} justifyContent={"center"}>
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, 0)}
                        sx={{
                            border: "1px solid",
                            borderColor: theme.palette.primary.main,
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isFirstPage ? 'default' : 'pointer',

                            transition: 'all 0.2s ease',
                            '&:hover': !isFirstPage && {
                                bgcolor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Icon path={mdiChevronDoubleLeft} size={0.9} />
                    </Box>

                    {/* Previous Page Button (<) */}
                    <Box
                        component="button"
                        onClick={() => !isFirstPage && handleChangePage(null, page - 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: theme.palette.primary.main,
                            bgcolor: 'background.paper', // or theme.palette.table.background
                            color: 'text.primary',
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isFirstPage ? 'default' : 'pointer',
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': !isFirstPage && {
                                bgcolor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Icon path={mdiChevronLeft} size={0.9} />
                    </Box>

                    {/* Page Numbers */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                        {renderPageNumbers}
                    </Box>

                    {/* Next Page Button (>) */}
                    <Box
                        component="button"
                        onClick={() => !isLastPage && handleChangePage(null, page + 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: theme.palette.primary.main,
                            bgcolor: 'background.paper', // or theme.palette.table.background
                            color: 'text.primary',
                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isLastPage ? 'default' : 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': !isLastPage && {
                                bgcolor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Icon path={mdiChevronRight} size={0.9} />
                    </Box>

                    {/* Last Page Button (>>) */}
                    <Box
                        component="button"
                        onClick={() => !isLastPage && handleChangePage(null, totalPages - 1)}
                        sx={{
                            border: "1px solid",
                            borderColor: theme.palette.primary.main,
                            bgcolor: 'background.paper', // or theme.palette.table.background
                            color: 'text.primary',

                            borderRadius: 2,
                            minWidth: { xs: 28, sm: 28, md: 36 },
                            height: { xs: 28, sm: 28, md: 36 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isLastPage ? 'default' : 'pointer',

                            transition: 'all 0.2s ease',
                            '&:hover': !isLastPage && {
                                bgcolor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Icon path={mdiChevronDoubleRight} size={0.9} />
                    </Box>
                </Box>

                {/* Show entries selector */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    order: 3,
                    justifyContent: 'center'

                }}>
                    <Typography variant="body2">
                        Show
                    </Typography>
                    <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        sx={{
                            height: { xs: 28, sm: 28, md: 32 },
                            minWidth: { xs: 50, sm: 50, md: 60 },
                            '& .MuiSelect-select': {
                                padding: { xs: '2px 8px', sm: '2px 8px', md: '4px 10px' },
                                minHeight: 'auto',
                            }
                        }}
                    >
                        {props.rowsPerPageOption.map((opt) => (
                            <MenuItem key={opt} value={opt} >
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="body2">
                        entries
                    </Typography>
                </Box>
            </Stack >
        </>
    );
};

TableCustom.propTypes = {
    loadingData: PropTypes.bool.isRequired,
    keyField: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    appdata: PropTypes.array.isRequired,
    appdataTotal: PropTypes.number.isRequired,
    page: PropTypes.number,
    totalPage: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number,
    rowsPerPageOption: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    sortField: PropTypes.string,
    sortOrder: PropTypes.string,
    onRequestSort: PropTypes.func,
};


export default TableCustom;