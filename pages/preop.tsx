import * as React from 'react';
import { useMachine } from '@xstate/react';
import { preOpMachine, FINAL_STEPS } from '../machines';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ResultCard from 'components/ResultCard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function PreOp() {
  const [state, send] = useMachine(preOpMachine);
  function goBack() {
    send('BACK');
  }
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
            question="Patient usually
prescribed a SGLT2i"
            primaryAction={{ copy: 'Next', action: () => send('NEXT') }}
          />
        );
      case 'withheldSg':
        return (
          <QuestionCard
            question="SGLT2i withheld appropriately preoperatively* and patient clinically  well"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          />
        );
      case 'insulinDeficientUnwell':
        return (
          <QuestionCard
            question="HbA1c available and > 9%? OR clinically unwell"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          />
        );
      case 'ketones':
        return (
          <QuestionCard
            question="Ketones > 1.0 mmol/L"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          />
        );
      case 'checkBE':
        return (
          <QuestionCard
            question="Urgent ABG/VBG"
            primaryAction={{ copy: 'BE >= -5', action: sendYes }}
            secondaryAction={{ copy: 'BE < -5', action: sendNo }}
          />
        );
      case 'cancel':
        return (
          <ResultCard result="cancel">
            Strongly consider cancellation regardless of ketones If ketones {'>'} 1.0, urgent ABG/VBG and manage
            accordingly
          </ResultCard>
        );
      case 'DKA':
        return (
          <ResultCard result="DKA">
            Postpone surgery Suspect DKA, commence DKA insulin/dextrose infusion, contact endocrinology
          </ResultCard>
        );
      case 'proceed':
        return (
          <ResultCard result="proceed">
            Proceed if patient is clinically well Consider checking BGL and ketones every hour intraoperatively
          </ResultCard>
        );
      case 'contactEndo':
        return (
          <ResultCard result="contactEndo">
            Contact endocrinology for advice and post-op follow up. Consider proceeding with surgery with concurrent
            dextrose and variable rate insulin infusion with hourly BGL and ketone monitoring. (Alternatively 50ml 50%
            dextrose and 2-4 units insulin bolus can be considered.)
          </ResultCard>
        );
      default:
        return null;
    }
  }

  const isCurrentStepFinal = FINAL_STEPS.includes(value as string);

  return (
    <Layout heading="Pre Op Guide">
      {renderCurrentStep()}
      {value !== 'initial' && (
        <Button variant="outlined" onClick={isCurrentStepFinal ? sendReset : goBack}>
          <Typography variant="body1">{isCurrentStepFinal ? 'Start again' : '< Back'}</Typography>
        </Button>
      )}
    </Layout>
  );
}

export default PreOp;
