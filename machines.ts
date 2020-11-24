import { Machine } from 'xstate';

export const FINAL_STEPS = ['DKA', 'discharge', 'inpatient', 'cancel', 'contactEndo'];
export const preOpMachine = Machine({
  id: 'preop',
  initial: 'initial',
  states: {
    initial: {
      on: {
        NEXT: 'withheldSg',
      },
    },
    withheldSg: {
      on: {
        YES: 'insulinDeficientUnwell',
        NO: 'ketones',
      },
    },
    insulinDeficientUnwell: {
      on: {
        YES: 'cancel',
        NO: 'ketones',
      },
    },
    ketones: {
      on: {
        YES: 'checkBE',
        NO: 'proceed',
      },
    },
    checkBE: {
      on: {
        YES: 'contactEndo', //Greater
        NO: 'DKA', //Less
      },
    },
    cancel: {
      on: {
        RESET: 'initial',
      },
    },
    proceed: {
      on: {
        RESET: 'initial',
      },
    },
    contactEndo: {
      on: {
        RESET: 'initial',
      },
    },
    DKA: {
      on: {
        RESET: 'initial',
      },
    },
  },
});

export const postOpMachine = Machine({
  id: 'postop',
  initial: 'initial',
  states: {
    initial: {
      on: {
        NEXT: 'repeatKetones',
      },
    },
    repeatKetones: {
      on: {
        YES: 'daySurgery', //Greater
        NO: 'checkBE', //Less
      },
    },
    checkBE: {
      on: {
        YES: 'daySurgery', //Greater
        NO: 'DKA', //Less
      },
    },
    daySurgery: {
      on: {
        NO: 'inpatient',
        YES: 'discharge',
      },
    },
    inpatient: {
      on: {
        RESET: 'initial',
      },
    },
    discharge: {
      on: {
        RESET: 'initial',
      },
    },
    DKA: {
      on: {
        RESET: 'initial',
      },
    },
  },
});
