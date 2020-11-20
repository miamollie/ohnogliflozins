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
        GREATER: 'contactEndo',
        LESS: 'DKA',
      },
    },
    cancel: {
      type: 'final',
    },
    proceed: {
      type: 'final',
    },
    contactEndo: {
      type: 'final',
    },
    DKA: {
      type: 'final',
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
        GREATER: 'daySurgery',
        LESS: 'checkBE',
      },
    },
    checkBE: {
      on: {
        GREATER: 'daySurgery',
        LESS: 'DKA',
      },
    },
    daySurgery: {
      on: {
        NO: 'inpatient',
        YES: 'discharge',
      },
    },
    inpatient: {
      type: 'final',
    },
    discharge: {
      type: 'final',
    },
    DKA: {
      type: 'final',
    },
  },
});
