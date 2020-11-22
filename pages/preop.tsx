import * as React from 'react';
import { useMachine } from '@xstate/react';
import { preOpMachine } from '../machines';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ResultCard from 'components/ResultCard';

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
  function renderCurrentStep() {
    switch (state.value) {
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
            returnToPrevState={goBack}
          />
        );
      case 'insulinDeficientUnwell':
        return (
          <QuestionCard
            question="HbA1c available and > 9%? OR clinically unwell"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
            returnToPrevState={goBack}
          />
        );
      case 'ketones':
        return (
          <QuestionCard
            question="Ketones > 1.0 mmol/L"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
            returnToPrevState={goBack}
          />
        );
      case 'checkBE':
        return (
          <QuestionCard
            question="Urgent ABG/VBG"
            primaryAction={{ copy: 'BE >= -5', action: sendYes }}
            secondaryAction={{ copy: 'BE < -5', action: sendNo }}
            returnToPrevState={goBack}
          />
        );
      case 'cancel':
        return (
          <ResultCard result="cancel" tryAgain={sendReset}>
            Strongly consider cancellation regardless of ketones If ketones {'>'} 1.0, urgent ABG/VBG and manage
            accordingly
          </ResultCard>
        );
      case 'DKA':
        return (
          <ResultCard result="DKA" tryAgain={sendReset}>
            Postpone surgery Suspect DKA, commence DKA insulin/dextrose infusion, contact endocrinology
          </ResultCard>
        );
      case 'proceed':
        return (
          <ResultCard result="proceed" tryAgain={sendReset}>
            Proceed if patient is clinically well Consider checking BGL and ketones every hour intraoperatively
          </ResultCard>
        );
      case 'contactEndo':
        return (
          <ResultCard result="contactEndo" tryAgain={sendReset}>
            Contact endocrinology for advice and post-op follow up. Consider proceeding with surgery with concurrent
            dextrose and variable rate insulin infusion with hourly BGL and ketone monitoring. (Alternatively 50ml 50%
            dextrose and 2-4 units insulin bolus can be considered.)
          </ResultCard>
        );
      default:
        return null;
    }
  }

  return <Layout heading="Pre Op Guide">{renderCurrentStep()}</Layout>;
}

export default PreOp;
