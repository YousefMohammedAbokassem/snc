// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#275963',
      light: '#53818b',
      dark: '#1a3d45',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057', // يمكنك تغيير هذا اللون الثانوي إذا أردت
    },
  },
  typography: {
    fontFamily: '"Tajawal", "Arial", sans-serif', // يمكنك تغيير الخط إذا أردت
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // يمكنك تعديل زوايا الأزرار
        },
      },
    },
  },
});

export default theme;