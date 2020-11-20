import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    height: 'calc(100vh - 65px)',
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
        <div className={classes.strip}>
          <Typography variant="h3" gutterBottom>
            Gliflozin Guide
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here is some explanation about what this guide is. There will also be a disclaimer in the footer..
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="/flows">Get started &gt;</Link>
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Index;
