import { Machine } from 'xstate';

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
        BACK: 'initial',
      },
    },
    insulinDeficientUnwell: {
      on: {
        YES: 'cancel',
        NO: 'ketones',
        BACK: 'withheldSg',
      },
    },
    ketones: {
      on: {
        YES: 'checkBE',
        NO: 'proceed',
        BACK: 'withheldSg',
      },
    },
    checkBE: {
      on: {
        YES: 'contactEndo', //Greater
        NO: 'DKA', //Less
        BACK: 'ketones',
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
        BACK: 'initial',
      },
    },
    checkBE: {
      on: {
        YES: 'daySurgery', //Greater
        NO: 'DKA', //Less
        BACK: 'repeatKetones',
      },
    },
    daySurgery: {
      on: {
        NO: 'inpatient',
        YES: 'discharge',
        BACK: 'checkBE',
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
