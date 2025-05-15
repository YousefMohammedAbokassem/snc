import React from "react";
import {
  Box,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import {
  CheckCircle,
  MonetizationOn,
  Security,
  Public,
  TrendingUp,
  Schedule,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function WhoUs() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: "rtl" }}>
      {/* العنوان الرئيسي */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h2"
          component="h1"
          color="primary.main"
          fontWeight="bold"
          gutterBottom
        >
          {t("whoUs.title")}
        </Typography>
        <Divider sx={{ my: 2, borderColor: "primary.main" }} />
      </Box>

      {/* الفقرة الافتتاحية */}
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", lineHeight: 2 }}
      >
        {t("whoUs.intro")}
      </Typography>

      {/* معلومات الاعتماد */}
      <Box bgcolor="#f5f5f5" p={3} borderRadius={2} mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.credentialsTitle")}
        </Typography>
        <Typography variant="body1">{t("whoUs.credentialsText")}</Typography>
      </Box>

      {/* الخط الزمني */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.timelineTitle")}
        </Typography>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          <Box textAlign="center" p={2}>
            <Schedule fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              2012-2019
            </Typography>
            <Typography variant="body2">{t("whoUs.timelineStage1")}</Typography>
          </Box>
          <Box textAlign="center" p={2}>
            <TrendingUp fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              2020-2025
            </Typography>
            <Typography variant="body2">{t("whoUs.timelineStage2")}</Typography>
          </Box>
          <Box textAlign="center" p={2}>
            <Public fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              2030
            </Typography>
            <Typography variant="body2">{t("whoUs.timelineStage3")}</Typography>
          </Box>
        </Box>
      </Box>

      {/* ميزات المنظومة */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.systemFeaturesTitle")}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <Typography>{t("whoUs.systemFeature1")}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <Typography>{t("whoUs.systemFeature2")}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <Typography>{t("whoUs.systemFeature3")}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <Typography>{t("whoUs.systemFeature4")}</Typography>
          </ListItem>
        </List>
      </Box>

      {/* آلية العمل */}
      <Box bgcolor="#f0f7ff" p={3} borderRadius={2} mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.howItWorksTitle")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("whoUs.howItWorksStep1")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("whoUs.howItWorksStep2")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("whoUs.howItWorksStep3")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("whoUs.howItWorksStep4")}
        </Typography>
      </Box>

      {/* فوائد للفعاليات الاقتصادية */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.economicBenefitsTitle")}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box
            flex="1"
            minWidth="200px"
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
          >
            <MonetizationOn fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              {t("whoUs.economicBenefit1")}
            </Typography>
          </Box>
          <Box
            flex="1"
            minWidth="200px"
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
          >
            <TrendingUp fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              {t("whoUs.economicBenefit2")}
            </Typography>
          </Box>
          <Box
            flex="1"
            minWidth="200px"
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
          >
            <Security fontSize="large" color="primary" />
            <Typography variant="body1" fontWeight="bold">
              {t("whoUs.economicBenefit3")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* الالتزام القانوني */}
      <Box textAlign="center" p={3} bgcolor="#f5f5f5" borderRadius={2}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("whoUs.legalCommitmentTitle")}
        </Typography>
        <Typography variant="body1">
          {t("whoUs.legalCommitmentText")}
        </Typography>
      </Box>

      {/* حقوق النشر */}
      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          {t("whoUs.copyright")} © SNC {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
}
