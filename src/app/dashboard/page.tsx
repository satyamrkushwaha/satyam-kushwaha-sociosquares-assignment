"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OutlinedCard from '@/components/Card';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    company: {
        name: string;
    };
    website: string;
}

export default function Dashboard() {

    const { data: apiUsers, isLoading } = useFetchUsersQuery('');

    const router = useRouter();

    const [allUsers, setAllUsers] = useState<User[]>([]);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 16,
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

    const handleLogout = () => {
        router.push('/login');
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        const registered = sessionStorage.getItem('registered');
        if (!registered) {
            router.push('/');
        }
    }, [router]);


    useEffect(() => {
        if (apiUsers) {
            setAllUsers([...apiUsers]);
        }
    }, [apiUsers]);


    return (< Box className={styles.dashboardContainer}>
        <Box className={styles.logoutBtnBox}>
            <h1>User Dashboard</h1>
            <Button className={styles.logoutBtn} size="medium" variant="contained" color="error" onClick={handleLogout}>Logout <LogoutIcon fontSize="small" /></Button>
        </Box>


        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="List View" {...a11yProps(0)} />
                <Tab label="Grid View" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        { isLoading ?  <Skeleton animation="wave" variant="rectangular" width={'100%'} height={600} /> : (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
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

                             (
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
                            )

                        ))
                        }
                    </TableBody>
                   
                </Table>
            </TableContainer>
        )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
                {allUsers.map((user) => (
                    <OutlinedCard
                        key={user?.id}
                        name={user?.name || 'NA'}
                        username={user?.username || 'NA'}
                        email={user?.email || 'NA'}
                        company={user?.company?.name || 'NA'}
                        website={user?.website || 'NA'}
                    />
                ))}
            </Grid>
        </CustomTabPanel>
    </ Box>)
}
