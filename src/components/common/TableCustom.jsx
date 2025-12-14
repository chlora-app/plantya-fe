// src/components/common/TableCustom.jsx

import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel, Box,
    CircularProgress, Typography
} from "@mui/material";

const TableCustom = ({
    columns,
    keyField,
    appdata,
    appdataTotal,
    loading,
    page,           // 0-based
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    sortField,
    sortOrder,
    onRequestSort,
}) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.text.secondary,
            backgroundColor: '#807d7dff',
            borderBottom: `1px solid ${theme.palette.custom.line}`,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <>
            <TableContainer sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', position: 'relative' }}>
                {loading && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
                        <CircularProgress />
                    </Box>
                )}
                <Table aria-label="customized table" sx={{ borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'custom.line' }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.dataField}
                                    align={column.align || 'left'}
                                    style={{ ...column.headerStyle }}
                                    sortDirection={sortField === column.dataField ? sortOrder : false}
                                >
                                    {column.sort ? (
                                        <TableSortLabel
                                            active={sortField === column.dataField}
                                            direction={sortField === column.dataField ? sortOrder : 'asc'}
                                            onClick={() => onRequestSort(null, column.dataField)}
                                        >
                                            {column.text}
                                        </TableSortLabel>
                                    ) : (column.text)}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appdata.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row[keyField]} sx={{ borderBottom: '1px solid', borderColor: 'custom.line' }}>
                                {columns.map((column) => {
                                    const value = row[column.dataField];
                                    return (
                                        <TableCell key={column.dataField} align={column.align || 'left'} sx={{ borderBottom: 'none' }}>
                                            {column.formatter ? column.formatter(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {appdata.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="body2">No records to display</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 25]}
                component="div"
                count={appdataTotal}
                rowsPerPage={rowsPerPage}
                page={page} // Sudah 0-based
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </>
    );
};

TableCustom.propTypes = {
    columns: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired,
    appdata: PropTypes.array.isRequired,
    appdataTotal: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
    sortField: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

export default TableCustom;