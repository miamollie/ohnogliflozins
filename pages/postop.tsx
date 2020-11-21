import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useMachine } from '@xstate/react';
import { postOpMachine } from '../machines';
import Layout from '../components/Layout';

function PostOp() {
  const [state, send] = useMachine(postOpMachine);

  return (
    <Layout heading="Post Op Guide">
      {/* renderCurrentStep() -> switch on state */}
      <Typography variant="body1" gutterBottom>
        First question goes here. I am in state: {state.value}
      </Typography>
    </Layout>
  );
}

export default PostOp;
