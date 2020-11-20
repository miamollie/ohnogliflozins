import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useMachine } from '@xstate/react';
import { postOpMachine } from '../machines';

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

function PostOp() {
  const classes = useStyles();
  const [state, send] = useMachine(postOpMachine);

  console.log(state);

  React.useEffect(() => {
    send('NEXT');
  }, [send]);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.strip}>
          {/* TODO need a "header" component */}
          <Typography variant="h3" gutterBottom>
            Post Op Guide
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="/">Back Home</Link>
          </Typography>
          {/* renderCurrentStep() -> switch on state */}
          <Typography variant="body1" gutterBottom>
            First question goes here. I am in state: {state.value}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default PostOp;
