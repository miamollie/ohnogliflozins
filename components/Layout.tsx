import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

const HEADER_HEIGHT = '64px';
const useStyles = makeStyles((theme: any) => ({
  root: {
    textAlign: 'center',
    height: `100vh`,
    position: 'relative',
  },
  nav: {
    height: HEADER_HEIGHT,
  },
  strip: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  fullWidth: {
    width: '100%',
  },
  logo: {
    width: '80vw',
    maxWidth: '300px',
  },
  logoIcon: {
    height: '4rem',
    margin: '10px 0',
  },
  paper: {
    maxWidth: '600px',
    width: '90%',
    margin: 'auto',
    padding: 30,
    [theme.breakpoints.down('md')]: {
      //TODO fix breakpoints
      width: '100%',
      height: '100%',
    },
  },
}));

function Layout({
  heading,
  children,
  isHome = false,
}: {
  heading?: string;
  children: React.ReactNode;
  isHome?: boolean;
}) {
  const classes = useStyles();
  return (
    <Box component="main" display="flex" flexDirection="column" className={classes.root}>
      <Header heading={heading} isHomePage={isHome} />
      <Paper className={classes.paper}>
        <Box display="flex" flexDirection="column" justifyContent="space-around" style={{ height: '100%' }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

function Header({ heading, isHomePage = false }: { heading?: string; isHomePage: boolean }) {
  const classes = useStyles();
  function headerContents() {
    if (isHomePage) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.fullWidth}>
          <img className={classes.logo} src="/mainLogo.png" alt="Gliflozin Guide" />
        </Box>
      );
    }

    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.fullWidth}>
        <Link href="/">
          <HomeOutlinedIcon color="secondary" />
        </Link>
        <Typography variant="h5" component="h1" color="secondary">
          {heading}
        </Typography>
        <img className={classes.logoIcon} src="/logoIcon.png" alt="Gliflozin Guide" />
      </Box>
    );
  }

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar>{headerContents()}</Toolbar>
    </AppBar>
  );
}

export default Layout;
