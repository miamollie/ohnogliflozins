import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
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

function Flows() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.strip}>
          <Typography variant="h3" gutterBottom>
            Pick a guide!
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="/preop">Preop Guide</Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="/postop">Postop Guide</Link>
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Flows;
