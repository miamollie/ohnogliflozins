import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Link from 'next/link';

const useStyles = makeStyles((theme: any) => ({
  root: {
    textAlign: 'center',
    height: '100vh',
    position: 'relative',
    display: 'flex',
  },
  strip: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  paper: {
    height: '90vh',
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
  showHome = true,
}: {
  heading: string;
  children: React.ReactNode;
  showHome?: boolean;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.strip}>
          {/* nav goes here with logo and App name */}
          <Typography variant="h5" component="h2" gutterBottom>
            {heading}
          </Typography>
          {showHome && (
            <Typography variant="body1" gutterBottom>
              <Link href="/">Back Home</Link>
            </Typography>
          )}
        </div>
        {children}
      </Paper>
    </div>
  );
}

export default Layout;
