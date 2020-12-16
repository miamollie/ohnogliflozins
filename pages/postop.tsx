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
            question="Repeat Ketones and Glucose in PACU"
            primaryAction={{ copy: 'Ketones > 1.0', action: sendYes }}
            secondaryAction={{ copy: 'Ketones ≤ 1.0', action: sendNo }}
          >
            <p>
              What is the patient's ketone result? (mmol/L)
            </p>
            
          </QuestionCard>
        );
      case 'checkBE':
        return (
          <QuestionCard
            question="Obtain an Arterial or Venous Blood Gas"
            primaryAction={{ copy: '≥ -5', action: sendYes }}
            secondaryAction={{ copy: '< -5', action: sendNo }}
          >
            <p> 
              What is the Standard Base Excess?
            </p>
          </QuestionCard>
        );
      case 'daySurgery':
        return (
          <QuestionCard
            question="Day surgery?"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          >
            <p>
              Is the patient expected to be discharged the day of the procedure?
            </p>
          </QuestionCard>
            
        );

      case 'inpatient':
        return (
          <ResultCard result="inpatient">
            <p>
              Recheck ketones and blood glucose every 1 hour in PACU, then 2 hourly on ward for 8 hours then 4 hourly until eating and drinking normally again.
            </p>
            
            <p>
              Only restart SGLT2i when eating and drinking and close to discharge (usually 3-5 days after major surgery)
            </p>            
          </ResultCard>
        );
      case 'DKA':
        return (
          <ResultCard result="Metabolic Acidosis">
            <p>
              Suspect DKA. Contact endocrinology, start DKA insulin/dextrose infusion. Consider HDU bed for close monitoring.
            </p>
          </ResultCard>
        );
      case 'discharge':
        return (
          <ResultCard result="discharge">
            <p>
              Check BGL and ketone every 2 hours until eating and drinking normally. Resume SGLT2i when patient returns to full oral intake. Advise patients
              to check blood glucose and ketones at home if feeling unwell in the week following surgery.
            </p>
            
            <p>
              Consider overnight admission if vomiting / poor oral intake and persistent ketosis. 
            </p>
            
            <p>
              (If ketones {'>'} 1.0, consider 50 ml 50% dextrose and 2-4 units insulin bolus to facilitate ketone clearance. 
              This should be followed by BGL & ketone check at 15 minutes and then hourly, and VBG (for potassium) 1 hour later.)
            </p>
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
