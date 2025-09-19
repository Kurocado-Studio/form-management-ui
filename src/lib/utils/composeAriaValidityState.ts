import { get } from 'lodash-es';

import type { ValidityStateProperties } from '../types';

export const composeAriaValidityState = (
  validityStateProperties?: Partial<ValidityStateProperties>,
): ValidityStateProperties => {
  return {
    ...validityStateProperties,
    badInput: get(validityStateProperties, ['badInput'], false),
    customError: get(validityStateProperties, ['customError'], false),
    patternMismatch: get(validityStateProperties, ['patternMismatch'], false),
    rangeOverflow: get(validityStateProperties, ['rangeOverflow'], false),
    rangeUnderflow: get(validityStateProperties, ['rangeUnderflow'], false),
    stepMismatch: get(validityStateProperties, ['stepMismatch'], false),
    tooLong: get(validityStateProperties, ['tooLong'], false),
    tooShort: get(validityStateProperties, ['tooShort'], false),
    typeMismatch: get(validityStateProperties, ['typeMismatch'], false),
    valid: get(validityStateProperties, ['valid'], true),
    valueMissing: get(validityStateProperties, ['valueMissing'], false),
  };
};
