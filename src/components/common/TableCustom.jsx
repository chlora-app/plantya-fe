// src/components/common/TableCustom.jsx

import React, { useEffect, useCallback, useState } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel, Box,
    CircularProgress, Typography, Paper
} from "@mui/material";
import { BorderBottom, BorderColor } from "@mui/icons-material";

const TableCustom = (props) => {
    const [loading, setLoading] = useState(false);

    // const getApi = useCallback(async (param) => {
    //     console.log('TableCustom: getApi dipanggil dengan params:', param);
    //     setLoading(true);
    //     try {
    //         const response = await props.urlHelper(param);
    //         console.log('TableCustom: Respon diterima dari urlHelper:', response);
    //         props.setData(response);
    //     } catch (e) {
    //         console.error('TableCustom: Error terjadi:', e);
    //         props.setData({ status: "1", message: e.message || "An error occurred", data: [] });
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [props.urlHelper, props.setData]);

    // --- GUNAKAN VERSI `useEffect` INI ---
    useEffect(() => {
        // Hanya jalankan jika props.searchGet ada dan flag `render` tidak false
        if (props.searchGet && props.searchGet.render !== false) {
            // getApi({
            //     page: props.searchGet.page,
            //     limit: props.searchGet.limit,
            //     offset: props.searchGet.offset,
            //     sort: props.searchGet.sort,
            //     order: props.searchGet.order,
            //     search: props.searchGet.search,
            // });
        }
    }, [
        // JANGAN gunakan [props.searchGet, getApi]
        // Gunakan dependency yang spesifik untuk mencegah efek berjalan saat data belum lengkap
        // props.searchGet?.page,
        // props.searchGet?.limit,
        // props.searchGet?.offset,
        // props.searchGet?.sort,
        // props.searchGet?.order,
        // props.searchGet?.search,
        // props.searchGet?.render,
        // getApi,
    ]);

    // ... handler lainnya (handleRequestSort, dll) tetap sama
    const handleRequestSort = (event, property) => {
        const isAsc = props.searchGet.sort === property && props.searchGet.order === 'asc';
        props.searchSet({
            ...props.searchGet,
            page: 1,
            offset: 0,
            sort: property,
            order: isAsc ? 'desc' : 'asc',
            render: true,
        });
    };
    const handleChangePage = (event, newPage) => {
        const newPageNumber = newPage + 1;
        props.searchSet({ ...props.searchGet, page: newPageNumber, offset: newPage * props.searchGet.limit, render: true });
    };
    const handleChangeRowsPerPage = (event) => {
        const newSize = parseInt(event.target.value, 10);
        props.searchSet({ ...props.searchGet, page: 1, limit: newSize, offset: 0, render: true });
    };
    const handleRowClick = (event, row) => {
        if (props.rowEvents && props.rowEvents.onClick) {
            props.rowEvents.onClick(event, row, row[props.keyField]);
        }
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.background.secondary,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.custom.line}`


        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,

        },
    }));

    return (
        <>
            <TableContainer component={Paper} sx={{
                bgcolor: 'red',
                borderRadius: 3
            }}>
                {loading && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
                        <CircularProgress />
                    </Box>
                )}
                <Table aria-label="customized table" sx={{
                    borderLeft: '1px solid',
                    borederRight: '1px solid',
                    borderColor: 'custom.line',
                }}>
                    {/* ... TableHead dan TableBody ... */}
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <StyledTableCell key={column.dataField} align={column.align || 'left'} style={{ ...column.headerStyle }} sortDirection={props.searchGet.sort === column.dataField ? props.searchGet.order : false}>
                                    {column.sort ? (
                                        <TableSortLabel active={props.searchGet.sort === column.dataField} direction={props.searchGet.sort === column.dataField ? props.searchGet.order : 'asc'} onClick={() => handleRequestSort(null, column.dataField)}>
                                            {column.text}
                                        </TableSortLabel>
                                    ) : (column.text)}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.appdata.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row[props.keyField]} onClick={(event) => handleRowClick(event, row)}
                                sx={{
                                    cursor: props.rowEvents ? 'pointer' : 'default',
                                    borderBottom: '1px solid',          // Tambahkan garis bawah
                                    borderColor: 'custom.line'          // Gunakan warna dari tema Anda
                                }}
                            >
                                {props.columns.map((column) => {
                                    const value = row[column.dataField];
                                    return (
                                        <TableCell key={column.dataField} align={column.align || 'left'}
                                            sx={{ borderBottom: 'none' }}

                                        >
                                            {column.formatter ? column.formatter(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {props.appdata.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={props.columns.length} align="center">
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
                count={props.appdataTotal}
                rowsPerPage={props.searchGet.limit || 10}
                page={props.searchGet.page ? props.searchGet.page - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

TableCustom.propTypes = {
    // ... propTypes Anda
    keyField: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    searchSet: PropTypes.func.isRequired,
    searchGet: PropTypes.object.isRequired,
    appdata: PropTypes.array.isRequired,
    appdataTotal: PropTypes.number.isRequired,
    setData: PropTypes.func.isRequired,
    urlHelper: PropTypes.func.isRequired,
    rowEvents: PropTypes.object,
};

export default TableCustom;