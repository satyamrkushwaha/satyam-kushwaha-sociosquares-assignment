"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography, CircularProgress } from '@mui/material';
import { useFetchUsersQuery } from '@/redux/userApi'
import { useRouter } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {

    const { data: apiUsers, isLoading } = useFetchUsersQuery('');

    const router = useRouter();

    const [allUsers, setAllUsers] = useState<any[]>([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleSingout = () => {
        localStorage.clear();
        router.push('/login');
    }

    useEffect(() => {
        const registered = localStorage.getItem('registered');
        if (!registered) {
            router.push('/');
        }
    }, [router]);


    useEffect(() => {
        if (apiUsers) {
            const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            setAllUsers([...localUsers, ...apiUsers]);
        }
    }, [apiUsers]);


    return (<>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button className={styles.logoutBtn} size="medium" onClick={handleSingout}>Logout <LogoutIcon /></Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className={styles.tableHead}>
                        <StyledTableCell>User No.</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Username</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Company</StyledTableCell>
                        <StyledTableCell align="right">Website</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers.map((user, index) => (
                        <StyledTableRow
                            key={user?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {index + 1 || 'NA'}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {user?.name || 'NA'}
                            </StyledTableCell>
                            <StyledTableCell align="right">{user?.username || 'NA'}</StyledTableCell>
                            <StyledTableCell align="right">{user?.email || 'NA'}</StyledTableCell>
                            <StyledTableCell align="right">{user?.company?.name || 'NA'}</StyledTableCell>
                            <StyledTableCell align="right">{user?.website || 'NA'}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}
