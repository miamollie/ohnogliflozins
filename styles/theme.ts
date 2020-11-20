import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';


const theme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: {
      main: "#2d2d2d",
      text: "#fff",
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    typography: {
      useNextVariants: true,
    },
  },
} as any);
export type Theme = typeof theme;
export default theme;


