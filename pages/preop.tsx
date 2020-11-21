import * as React from 'react';
import { useMachine } from '@xstate/react';
import { preOpMachine } from '../machines';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';

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
        return <div color="red"> CANCEL</div>;
      case 'DKA':
        return <div color="red"> DKA</div>;
      case 'proceed':
        return <div color="green">Proceed :)</div>;
      case 'contactEndo':
        return <div color="orange">Uh oh contact endooo</div>;
      default:
        return null;
    }
  }

  return <Layout heading="Pre Op Guide">{renderCurrentStep()}</Layout>;
}

export default PreOp;
