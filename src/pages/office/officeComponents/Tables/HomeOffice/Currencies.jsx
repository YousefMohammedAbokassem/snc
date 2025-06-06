import React, { useEffect, useState } from "react";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Currencies() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLocalDialog, setOpenLocalDialog] = useState(false);
  const [openInternationalDialog, setOpenInternationalDialog] = useState(false);
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState(null); // 'local' or 'international'
  const [isTransferring, setIsTransferring] = useState(false); // To control the spinner for transfer
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}my_profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setProfile(res.data?.data || null);
      console.log(res.data.data);
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      //
      if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
      if (
        error?.response?.data?.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransfer = async (type) => {
    setIsTransferring(true);
    try {
      const apiUrl =
        type === "local"
          ? `${import.meta.env.VITE_API_URL}transfer_from_local`
          : `${import.meta.env.VITE_API_URL}transfer_from_international`;

      const res = await axios.post(
        apiUrl,
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log("Transfer successful:", res.data);
      if (type === "local") {
        setOpenLocalDialog(false); // Close the local dialog
      } else {
        setOpenInternationalDialog(false); // Close the international dialog
      }
      fetchData();
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setIsTransferring(false); // Stop spinner
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* National Balance Card */}
      <div className="flex justify-between items-center shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] p-4 rounded-lg">
        <div className="info flex items-center gap-4">
          <div className="icon p-2 bg-[#4ad99244] inline-block rounded-lg">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.31446 42.1251H44.7628C46.2152 42.1251 47.3927 43.3026 47.3927 44.755C47.3927 46.2075 46.2152 47.3849 44.7628 47.3849H2.68458C1.23213 47.3849 0.0546875 46.2075 0.0546875 44.755V2.67676C0.0546875 1.22432 1.23213 0.046875 2.68458 0.046875C4.13702 0.046875 5.31446 1.22432 5.31446 2.67676V42.1251Z"
                fill="#4AD991"
              />
            </svg>
          </div>
          <div>
            <span>{t("cart.national_balance")}</span>
            <div onClick={() => setOpenLocalDialog(true)}>
              <Button variant="outlined" color="success" fullWidth>
                {t("cart.convert_to_international")}
              </Button>
            </div>
          </div>
        </div>
        <div className="money">
          {loading ? (
            <Skeleton width="100px" />
          ) : (
            profile?.local_financial_balance
          )}
        </div>
      </div>

      {/* International Balance Card */}
      <div className="flex justify-between items-center shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] p-4 rounded-lg">
        <div className="info flex items-center gap-4">
          <div className="icon p-2 bg-[#ffa2382a] inline-block rounded-lg">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.31446 42.1251H44.7628C46.2152 42.1251 47.3927 43.3026 47.3927 44.755C47.3927 46.2075 46.2152 47.3849 44.7628 47.3849H2.68458C1.23213 47.3849 0.0546875 46.2075 0.0546875 44.755V2.67676C0.0546875 1.22432 1.23213 0.046875 2.68458 0.046875C4.13702 0.046875 5.31446 1.22432 5.31446 2.67676V42.1251Z"
                fill="#FFA138"
              />
            </svg>
          </div>
          <div>
            <span>{t("cart.international_balance")}</span>
            <div onClick={() => setOpenInternationalDialog(true)}>
              <Button variant="outlined" color="warning" fullWidth>
                {t("cart.convert_to_national")}
              </Button>
            </div>
          </div>
        </div>
        <div className="money flex items-center">
          {loading ? (
            <Skeleton width="100px" />
          ) : (
            <>
              <img src="/images/7.png" alt="" width={40} />

              <span>{profile?.international_financial_balance} </span>
            </>
          )}
        </div>
      </div>

      {/* Dialog for local transfer */}
      <Dialog open={openLocalDialog} onClose={() => setOpenLocalDialog(false)}>
        <DialogTitle>
          {t("cart.transfer_title_local_to_international")}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={t("cart.amount")}
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (parseInt(value) >= 1 && parseInt(value) % 1 === 0)
              ) {
                setAmount(value);
              }
            }}
            inputProps={{
              min: 1,
              step: 1,
            }}
            onBlur={(e) => {
              if (e.target.value && parseInt(e.target.value) % 1 !== 0) {
                const correctedValue =
                  Math.round(parseInt(e.target.value) / 1) * 1;
                setAmount(correctedValue.toString());
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLocalDialog(false)} color="primary">
            {t("cart.cancel")}
          </Button>
          <Button
            onClick={() => handleTransfer("local")}
            color="primary"
            disabled={isTransferring}
          >
            {isTransferring ? (
              <CircularProgress size={24} />
            ) : (
              t("cart.transfer")
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for international transfer */}
      <Dialog
        open={openInternationalDialog}
        onClose={() => setOpenInternationalDialog(false)}
      >
        <DialogTitle>
          {t("cart.transfer_title_international_to_local")}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={t("cart.amount")}
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (parseInt(value) >= 1 && parseInt(value) % 1 === 0)
              ) {
                setAmount(value);
              }
            }}
            inputProps={{
              min: 1,
              step: 1,
            }}
            onBlur={(e) => {
              if (e.target.value && parseInt(e.target.value) % 1 !== 0) {
                const correctedValue =
                  Math.round(parseInt(e.target.value) / 1) * 1;
                setAmount(correctedValue.toString());
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenInternationalDialog(false)}
            color="primary"
          >
            {t("cart.cancel")}
          </Button>
          <Button
            onClick={() => handleTransfer("international")}
            color="primary"
            disabled={isTransferring}
          >
            {isTransferring ? (
              <CircularProgress size={24} />
            ) : (
              t("cart.transfer")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
