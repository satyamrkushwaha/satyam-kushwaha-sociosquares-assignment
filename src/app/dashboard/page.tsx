"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useFetchUsersQuery } from "@/redux/userApi";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";

// Lazy load the Card component
const OutlinedCard = React.lazy(() => import("@/components/Card"));

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

// Memoized Styled Components to avoid re-render
const StyledTableCell = React.memo(
  styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))
);

const StyledTableRow = React.memo(
  styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))
);

// Accessible props for tabs
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Reusable Tab Panel component
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

export default function Dashboard() {
  const { data: apiUsers, isLoading, error } = useFetchUsersQuery("");
  const router = useRouter();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [value, setValue] = useState(0);

  // Handle tab change with useCallback
  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  // Logout handler using useCallback
  const handleLogout = useCallback(() => {
    router.push("/login");
    sessionStorage.setItem("registered", "false");
  }, [router]);

  // UseEffect for API data fetching and user redirection
  useEffect(() => {
    const registered = sessionStorage.getItem("registered");
    if (registered === "false") {
      router.push("/");
    } else if (registered === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  // Update user data when API fetch completes
  useEffect(() => {
    if (apiUsers) {
      setAllUsers([...apiUsers]);
    }
  }, [apiUsers]);

  // Render the component
  return (
    <Box className={styles.dashboardContainer}>
      <Box className={styles.logoutBtnBox}>
        <h1>User Dashboard</h1>
        <Button
          className={styles.logoutBtn}
          size="medium"
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout <LogoutIcon fontSize="small" />
        </Button>
      </Box>

      {/* Tabs for switching views */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="List View" {...a11yProps(0)} />
          <Tab label="Grid View" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* List View (Tab 0) */}
      <CustomTabPanel value={value} index={0} >
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" width="100%" height={500} />
        ) : error ? (
          <p>Failed to load users. Please try again later.</p>
        ) : (
          <TableContainer component={Paper} >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
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
                  <StyledTableRow key={user?.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1 || "NA"}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {user?.name || "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user?.username || "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user?.email || "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user?.company?.name || "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {user?.website || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CustomTabPanel>

      {/* Grid View (Tab 1) */}
      <CustomTabPanel value={value} index={1}>
        <Suspense
          fallback={<Skeleton animation="wave" variant="rectangular" width="100%" height={500} />}
        >
          <Grid container spacing={2} className={styles.tableContainer}>
            {allUsers.map((user) => (
              <OutlinedCard
                key={user?.id}
                name={user?.name || "NA"}
                username={user?.username || "NA"}
                email={user?.email || "NA"}
                company={user?.company?.name || "NA"}
                website={user?.website || "NA"}
              />
            ))}
          </Grid>
        </Suspense>
      </CustomTabPanel>
    </Box>
  );
}
