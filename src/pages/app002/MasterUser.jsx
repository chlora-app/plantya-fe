import React, { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import { Button } from "@mui/material";
import RootPageCustom from "../../components/common/RootPageCustom";
import TableCustom from "../../components/common/TableCustom";

const MasterUser = () => {

    const [firstRender, setFirstRender] = useState(false)
    const [app002p01Page, setApp002p01Page] = useState(true);

    const [app002Msg, setApp002setMsg] = useState("");
    const [app002MsgStatus, setApp002setMsgStatus] = useState("");

    // --- TAMBAHKAN STATE UNTUK TABEL ---
    // 4. State untuk data dan pencarian tabel
    const [app002UserData, setApp002UserData] = useState([]);
    const [app002UserTotal, setApp002UserTotal] = useState(0);

    const [app002p01TableSearch, setApp002p01TableSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "userId",
        order: "asc",
        search: {
            any: ""
        },
        render: true
    });

    useEffect(() => {
        console.log('MasterUser: State app002UserData berubah:', app002UserData);
    }, [app002UserData]);

    // --- BUAT FUNGSI API PALSU ---
    // Ini adalah contoh `urlHelper`. Ganti dengan pemanggilan API asli Anda.
    const getUserListDummy = useCallback(async (params) => {
        console.log('MasterUser: getUserListDummy dipanggil dengan params:', params);
        await new Promise(resolve => setTimeout(resolve, 500));

        const allUsers = Array.from({ length: 85 }, (_, i) => ({
            userId: i + 1, userName: `User ${i + 1}`, email: `user${i + 1}@example.com`,
            role: i % 3 === 0 ? 'Admin' : 'User', isActive: i % 2 === 0,
        }));

        // --- PERBAIKAN: Tambahkan pengecekan aman untuk `params.search` ---
        const searchTerm = params.search?.any || ''; // Jika params.search atau params.search.any tidak ada, gunakan string kosong

        const filteredUsers = allUsers.filter(user =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // ... sisanya tetap sama
        const sortedUsers = filteredUsers.sort((a, b) => {
            if (a[params.sort] < b[params.sort]) return params.order === 'asc' ? -1 : 1;
            if (a[params.sort] > b[params.sort]) return params.order === 'asc' ? 1 : -1;
            return 0;
        });

        const paginatedUsers = sortedUsers.slice(params.offset, params.offset + params.limit);

        const response = {
            status: "0",
            message: "Success (Dummy Data)",
            data: { user: paginatedUsers, usertotal: filteredUsers.length }
        };

        console.log('MasterUser: getUserListDummy akan mengembalikan:', response);
        return response;
    }, []);

    // const getUserList = async (params) => {
    //     console.log('Mengambil data user dengan params:', params);
    //     // Simulasi delay network
    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     // Data palsu
    //     const allUsers = Array.from({ length: 85 }, (_, i) => ({
    //         userId: i + 1,
    //         userName: `User ${i + 1}`,
    //         email: `user${i + 1}@example.com`,
    //         role: i % 3 === 0 ? 'Admin' : 'User',
    //         isActive: i % 2 === 0,
    //     }));

    //     // Simulasi filter
    //     const filteredUsers = allUsers.filter(user =>
    //         user.userName.toLowerCase().includes(params.search.any.toLowerCase())
    //     );

    //     // Simulasi sorting
    //     const sortedUsers = filteredUsers.sort((a, b) => {
    //         if (a[params.sort] < b[params.sort]) return params.order === 'asc' ? -1 : 1;
    //         if (a[params.sort] > b[params.sort]) return params.order === 'asc' ? 1 : -1;
    //         return 0;
    //     });

    //     // Simulasi pagination
    //     const paginatedUsers = sortedUsers.slice(params.offset, params.offset + params.limit);

    //     return {
    //         status: "0",
    //         message: "Success",
    //         data: {
    //             user: paginatedUsers,
    //             usertotal: filteredUsers.length
    //         }
    //     };
    // };

    // --- DEFINISIKAN KOLOM TABEL ---
    // 5. Definisi kolom, mirip dengan yang Anda lakukan di komponen Grade
    const app002UserColumns = [
        {
            dataField: "action",
            text: "Aksi",
            headerStyle: { textAlign: 'center', width: '100px' },
            formatter: (cellContent, row) => (
                <div style={{ justifyContent: 'center' }} className="d-flex gap-3">
                    <i className="mdi mdi-pencil font-size-18 text-primary" style={{ cursor: 'pointer' }} onClick={() => console.log('Edit user:', row)} />
                    <i className="mdi mdi-delete font-size-18 text-danger" style={{ cursor: 'pointer' }} onClick={() => console.log('Delete user:', row)} />
                </div>
            ),
        },
        {
            dataField: "userId",
            text: "ID User",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "userName",
            text: "Nama User",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "isActive",
            text: "Status",
            sort: true,
            align: "center",
            headerStyle: { textAlign: 'center' },
            formatter: (cell) => (
                <span className={`badge ${cell ? 'bg-success' : 'bg-danger'}`}>
                    {cell ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ];

    return (
        <React.Fragment>
            <RootPageCustom
                msgStateGet={app002Msg}
                msgStateSet={setApp002setMsg}
                msgStateGetStatus={app002MsgStatus}
                setFirstRender={setFirstRender}
            >
                <Container maxWidth="xxl" sx={{ display: app002p01Page ? "block" : "none" }}>
                    <Typography variant="h4" gutterBottom>
                        Master User
                    </Typography>

                    {/* Bungkus dengan Paper agar lebih rapi */}
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Grid item>
                                <Typography variant="h6">Daftar User</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <i className="bx bx-plus font-size-16 align-middle me-2"></i>
                                    Tambah User
                                </Button>
                            </Grid>
                        </Grid>

                        {/* 6. Gunakan komponen TableCustomMUI */}
                        <TableCustom
                            keyField="userId"
                            columns={app002UserColumns}
                            appdata={app002UserData.data?.user || []}
                            // appdata={app028p01GradeData.data != null ? app028p01GradeData.data.grade : []}
                            // appdataTotal={app028p01GradeData.data != null ? app028p01GradeData.data.gradetotal : 0}
                            appdataTotal={app002UserData.data?.usertotal || 0}
                            searchSet={setApp002p01TableSearch}
                            searchGet={app002p01TableSearch}
                            setData={setApp002UserData}
                            urlHelper={getUserListDummy}
                        />
                    </Paper>

                    {/* Bagian untuk tombol alert bisa dipindahkan ke bawah atau dihapus jika tidak perlu */}
                </Container>
            </RootPageCustom>
        </React.Fragment>
    );
}

export default MasterUser;