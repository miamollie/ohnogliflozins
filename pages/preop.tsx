import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { useMachine } from '@xstate/react';
import { preOpMachine } from '../machines';
import Layout from '../components/Layout';

function PreOp() {
  const [state, send] = useMachine(preOpMachine);

  console.log(state);

//   React.useEffect(() => {
//     send('NEXT');
//   }, [send]);

  return (
    <Layout heading="Pre Op Guide">
      {/* renderCurrentStep() -> switch on state */}
      <Typography variant="body1" gutterBottom>
        First question goes here. I am in state: {state.value}
      </Typography>
    </Layout>
  );
}

export default PreOp;
