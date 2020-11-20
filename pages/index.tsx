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

const preOpMachine = Machine({
  id: 'preop',
  initial: 'initial',
  states: {
    initial: {
      on: {
        NEXT: 'withheldSg',
      },
    },
    withheldSg: {
      on: {
        YES: 'insulinDeficientUnwell',
        NO: 'ketones',
      },
    },
    insulinDeficientUnwell: {
      on: {
        YES: 'cancel',
        NO: 'ketones',
      },
    },
    ketones: {
      on: {
        YES: 'checkBE',
        NO: 'proceed',
      },
    },
    checkBE: {
      on: {
        GREATER: 'contactEndo',
        LESS: 'DKA',
      },
    },
    cancel: {
      type: 'final',
    },
    proceed: {
      type: 'final',
    },
    contactEndo: {
      type: 'final',
    },
    DKA: {
      type: 'final',
    },
  },
});

const postOpMachine = Machine({
  id: 'postop',
  initial: 'initial',
  states: {
    initial: {
      on: {
        NEXT: 'repeatKetones',
      },
    },
    repeatKetones: {
      on: {
        GREATER: 'daySurgery',
        LESS: 'checkBE',
      },
    },
    checkBE: {
      on: {
        GREATER: 'daySurgery',
        LESS: 'DKA',
      },
    },
    daySurgery: {
      on: {
        NO: 'inpatient',
        YES: 'discharge',
      },
    },
    inpatient: {
      type: 'final',
    },
    discharge: {
      type: 'final',
    },
    DKA: {
      type: 'final',
    },
  },
});
