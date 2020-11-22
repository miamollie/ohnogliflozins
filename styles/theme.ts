import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: {
      main: '#f9f9f9',
      text: '#444',
    },
    secondary: {
      dark: '#004c8b',
      light: '#0277bc',
      main: '#004c8b',
      text: '#fff',
    },
    typography: {
      useNextVariants: true,
    },
  },
} as any);
export type Theme = typeof theme;
export default theme;
