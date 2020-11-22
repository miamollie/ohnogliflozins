import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: any) => ({
  root: {
    textAlign: 'center',
    height: 'calc(100vh)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '80px',
  },
  strip: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  inline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inlineCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
  },
  logo: {
    width: '80vw',
  },
  logoIcon: {
    height: '4rem',
    margin: '10px 0',
  },
  paper: {
    height: 'calc(100vh - 64px)',
    maxWidth: '600px',
    width: '90%',
    margin: 'auto',
    padding: 30,
    [theme.breakpoints.down('md')]: {
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
    <div className={classes.root}>
      <Header heading={heading} isHomePage={isHome} />
      <Paper className={classes.paper}>{children}</Paper>
    </div>
  );
}

function Header({ heading, isHomePage = false }: { heading?: string; isHomePage: boolean }) {
  const classes = useStyles();
  function headerContents() {
    if (isHomePage) {
      return (
        <section className={classes.inlineCenter}>
          <img className={classes.logo} src="/mainLogo.png" alt="Gliflozin Guide" />
        </section>
      );
    }

    return (
      <section className={classes.inline}>
        <Link href="/">
          <HomeOutlinedIcon color="secondary" />
        </Link>
        <Typography variant="h5" component="h1" color="secondary">
          {heading}
        </Typography>
        <img className={classes.logoIcon} src="/logoIcon.png" alt="Gliflozin Guide" />
      </section>
    );
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>{headerContents()}</Toolbar>
    </AppBar>
  );
}

export default Layout;
