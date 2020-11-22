import * as React from 'react';
import { useMachine } from '@xstate/react';
import { postOpMachine } from '../machines';
import Layout from '../components/Layout';
import QuestionCard from 'components/QuestionCard';

function PostOp() {
  const [state, send] = useMachine(postOpMachine);

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
      case 'repeatKetones':
        return (
          <QuestionCard
            question="Repeat ketones and BGL in PACU"
            primaryAction={{ copy: 'Ketones > 1.0 mmol/L', action: sendYes }}
            secondaryAction={{ copy: 'Ketones <= 1.0 mmol/L', action: sendNo }}
            returnToPrevState={goBack}
          />
        );
      case 'checkBE':
        return (
          <QuestionCard
            question="ABG/VBG"
            primaryAction={{ copy: 'BE >= -5', action: sendYes }}
            secondaryAction={{ copy: 'BE < -5', action: sendNo }}
            returnToPrevState={goBack}
          />
        );
      case 'daySurgery':
        return (
          <QuestionCard
            question="Day surgery?"
            primaryAction={{ copy: 'Yes', action: sendYes }}
            secondaryAction={{ copy: 'No', action: sendNo }}
            returnToPrevState={goBack}
          />
        );

      case 'inpatient':
        return (
          <div color="red">
            Recheck ketones and BGL every: - 1 hour in PACU then - 2 hourly on ward for 8 hours then - 4 hourly until
            eating and drinking normally again
          </div>
        );
      case 'DKA':
        return (
          <div color="red">
            Suspect DKA. Contact endocrinology, start DKA insulin/dextrose infusion, Consider HDU Bed
          </div>
        );
      case 'discharge':
        return (
          <div color="green">
            BGL and ketone every 2 hours until eating and drinking normally. Consider 50 ml 50% dextrose and 2-4 units
            insulin bolus to facilitate ketone clearance. This should be followed by BGL & ketone check at 15 minutes
            and then hourly, and VBG (for potassium) 1 hour later. Consider overnight admission if vomiting / poor oral
            intake and persistent ketosis Resume SGLT2i when appropriate*
          </div>
        );
      default:
        return null;
    }
  }

  return <Layout heading="Post Op Guide">{renderCurrentStep()}</Layout>;
}

export default PostOp;
