import * as React from 'react';
import { useMachine } from '@xstate/react';
import { postOpMachine, FINAL_STEPS } from '../machines';
import Layout from '../components/Layout';
import QuestionCard from 'components/QuestionCard';
import ResultCard from 'components/ResultCard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function PostOp() {
  const [state, send] = useMachine(postOpMachine);

  function sendYes() {
    send('YES');
  }
  function sendNo() {
    send('NO');
  }
  function sendReset() {
    send('RESET');
  }
  const { value } = state;

  function renderCurrentStep() {
    switch (value) {
      case 'initial':
        return (
          <QuestionCard
            question="Patient usually prescribed a SGLT2i"
            primaryAction={{ copy: 'Next', action: () => send('NEXT') }}
          />
        );
      case 'repeatKetones':
        return (
          <QuestionCard
            question="Repeat ketones and BGL in PACU"
            primaryAction={{ copy: 'Ketones > 1.0 mmol/L', action: sendYes }}
            secondaryAction={{ copy: 'Ketones <= 1.0 mmol/L', action: sendNo }}
          />
        );
      case 'checkBE':
        return (
          <QuestionCard
            question="ABG/VBG"
            primaryAction={{ copy: 'BE >= -5', action: sendYes }}
            secondaryAction={{ copy: 'BE < -5', action: sendNo }}
          />
        );
      case 'daySurgery':
        return (
          <QuestionCard
            question="Day surgery?"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          />
        );

      case 'inpatient':
        return (
          <ResultCard result="inpatient">
            Recheck ketones and BGL every: - 1 hour in PACU then - 2 hourly on ward for 8 hours then - 4 hourly until
            eating and drinking normally again
          </ResultCard>
        );
      case 'DKA':
        return (
          <ResultCard result="DKA">
            Suspect DKA. Contact endocrinology, start DKA insulin/dextrose infusion, Consider HDU Bed
          </ResultCard>
        );
      case 'discharge':
        return (
          <ResultCard result="discharge">
            BGL and ketone every 2 hours until eating and drinking normally. Consider 50 ml 50% dextrose and 2-4 units
            insulin bolus to facilitate ketone clearance. This should be followed by BGL & ketone check at 15 minutes
            and then hourly, and VBG (for potassium) 1 hour later. Consider overnight admission if vomiting / poor oral
            intake and persistent ketosis Resume SGLT2i when appropriate*
          </ResultCard>
        );
      default:
        return null;
    }
  }
  const isCurrentStepFinal = FINAL_STEPS.includes(value as string);

  return (
    <Layout heading="Post Op Guide">
      {renderCurrentStep()}{' '}
      {isCurrentStepFinal && (
        <Button variant="outlined" onClick={sendReset}>
          <Typography variant="body1">Start again</Typography>
        </Button>
      )}
    </Layout>
  );
}

export default PostOp;
