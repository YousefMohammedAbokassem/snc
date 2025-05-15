import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";

const NotificationDialog = ({ open, setOpen, notifications }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        {t("notifications.title")}
      </DialogTitle>
      <DialogContent>
        {notifications.length === 0 ? (
          <Typography align="center" sx={{ py: 2 }}>
            {t("notifications.empty")}
          </Typography>
        ) : (
          notifications.map((notif) => (
            <Box
              key={notif.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderBottom: "1px solid #ddd",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                <NotificationsIcon />
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {notif.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notif.message}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {notif.since}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          {t("notifications.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
