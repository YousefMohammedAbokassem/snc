import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
  TextField,
  TablePagination,
} from "@mui/material";

export default function Charts() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}huns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
        // timeout: 10000,
      });
      setData(res.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      if (
        error.response?.data?.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        setError(new Error(t("requests_restricted")));
      } else if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          // navigate("/noInternet");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // const interval = setInterval(fetchData, 60000);
    // return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) =>
    item.country_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "balance") {
      const element = document.getElementById("balance");
      if (element) {
        // تأخير بسيط لضمان تحميل الصفحة بالكامل
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.state]);
  return (
    <div className="container my-8" id="balance">
      <Box
        sx={{
          // p: 3,
          // maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            // background: "linear-gradient(145deg, #f5f7fa, #e4e8f0)",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              borderBottom: "1px solid #e0e0e0",
              pb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#2d3748",
                fontSize: "1rem",
              }}
            >
              {t("crypto_exchange_rates")}
            </Typography>
            <Button
              variant="contained"
              onClick={fetchData}
              disabled={loading}
              sx={{
                bgcolor: "#275963",
                "&:hover": {
                  bgcolor: "#254349",
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("refresh")
              )}
            </Button>
          </Box>

          {/* Search Bar */}
          <TextField
            label={t("search_country")}
            variant="outlined"
            fullWidth
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {error.message}
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
                bgcolor: "rgba(245, 247, 250, 0.7)",
                borderRadius: 3,
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{ color: "#275963" }}
              />
            </Box>
          )}

          {/* Data Table */}
          {!loading && data.length > 0 && (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                  mb: 2,
                  overflow: "hidden",
                  overflow: "auto",
                }}
              >
                <Table
                  aria-label="crypto exchange table"
                  sx={{
                    minWidth: 650,
                  }}
                >
                  <TableHead
                    sx={{
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#4a5568",
                          py: 2,
                          borderBottom: "2px solid #e2e8f0",
                        }}
                      >
                        {t("flag")}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#4a5568",
                          py: 2,
                          borderBottom: "2px solid #e2e8f0",
                        }}
                      >
                        {t("country")}
                      </TableCell>
                      {/* <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#4a5568",
                          py: 2,
                          borderBottom: "2px solid #e2e8f0",
                        }}
                      >
                        {t("currency")}
                      </TableCell> */}
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#4a5568",
                          py: 2,
                          borderBottom: "2px solid #e2e8f0",
                        }}
                      >
                        {t("currency_value")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.country_name}
                          sx={{
                            "&:nth-of-type(even)": {
                              bgcolor: "#f8fafc",
                            },
                            "&:hover": {
                              bgcolor: "#f1f5f9",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              borderBottom: "1px solid #edf2f7",
                            }}
                          >
                            <img
                              src={`${import.meta.env.VITE_API_URL_IMAGE}${
                                row.country_flag
                              }`}
                              alt={row.country_name}
                              style={{
                                width: "40px",
                                height: "auto",
                                // borderRadius: "",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            align="center"
                            scope="row"
                            sx={{
                              fontWeight: 500,
                              color: "#2d3748",
                              borderBottom: "1px solid #edf2f7",
                            }}
                          >
                            {row.country_name}
                          </TableCell>
                          {/* <TableCell
                            align="center"
                            sx={{
                              fontWeight: 500,
                              color: "#4a5568",
                              borderBottom: "1px solid #edf2f7",
                            }}
                          >
                            {row.country_currency}
                          </TableCell> */}
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: 600,
                              color: "#275963",
                              borderBottom: "1px solid #edf2f7",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p>
                              {row.country_currency} <bdi>{row.value}</bdi>{" "}
                              {t("inFront")} SNC <bdi>1</bdi>
                            </p>
                            <img src="/images/7.png" alt="" width={60} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={t("rows_per_page")}
                sx={{
                  mt: 2,
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                      fontSize: "0.875rem",
                    },
                }}
              />
            </>
          )}

          {/* Empty State */}
          {!loading && data.length === 0 && !error && (
            <Alert
              severity="info"
              sx={{
                mt: 3,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {t("no_data_available")}
            </Alert>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "right",
                mt: 2,
                color: "#718096",
                fontSize: "0.75rem",
              }}
            >
              {t("last_updated")}: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
        </Paper>
      </Box>
    </div>
  );
}
