import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

const useStyles = makeStyles((_theme: any) => ({
  root: {
    textAlign: 'center',
    height: 'calc(100vh - 64px)',
    position: 'relative',
  },

  strip: {
    paddingTop: 30,
    paddingBottom: 30,
  },
}));

function Index() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Head>
          <title>Gliflozin Guide</title>
        </Head>
        <div className={classes.strip}>
          <Typography variant="h3" gutterBottom>
            Gliflozin Guide
          </Typography>
          Hello Jamie this is your app
        </div>
      </div>
    </>
  );
}

export default Index;
