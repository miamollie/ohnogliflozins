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
            question="Has the SGLT2i been ceased appropriately?"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
          >
            <p>
              For procedures requiring a stay of <b>one or more days</b> in hospital, or procedures requiring "bowel
              preparation" including <b>colonoscopy</b>, SGLT2i should be withheld 2 days prior to the procedure and the
              day of procedure.
            </p>
            <p>
              For <b>day stay</b> procedures including <b>gastroscopy</b>, SGLT2i should be withheld for the day of
              procedure only. Fasting before and after the procedure should be minimised.
            </p>
          </QuestionCard>
        );
      case 'withHeldWell':
      case 'continuedWell':
        return (
          <QuestionCard
            question="Is the patient clinically well?"
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
      {isCurrentStepFinal && (
        <Button variant="outlined" onClick={sendReset}>
          <Typography variant="body1">Start again</Typography>
        </Button>
      )}
    </Layout>
  );
}

export default PreOp;
