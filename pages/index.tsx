import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Machine } from 'xstate';

const useStyles = makeStyles((_theme: any) => ({
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
          Hello Jamie this is your app
        </div>
      </div>
    </>
  );
}

export default Index;
