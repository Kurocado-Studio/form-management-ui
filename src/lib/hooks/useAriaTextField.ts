import { useField } from '@conform-to/react';
import { mergeProps } from '@react-aria/utils';
import { get } from 'lodash-es';
import { useRef } from 'react';
import { useTextField } from 'react-aria';

import type {
  TextFieldApi,
  TextFieldMeta,
  TextFieldProperties,
  ValidityStateProperties,
} from '../types';

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

export const useAriaTextField = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError extends string[] = string[],
>(
  config: TextFieldProperties<FieldSchema, FormSchema, FormError>,
  formMeta?: TextFieldMeta<FormSchema, FormError>,
): TextFieldApi => {
  const inputReference = useRef(null);

  const { name, label } = config;

  const [meta] = useField(name, formMeta);

  const required = get(config, ['isRequired'], false);

  const metaErrors = Array.isArray(meta.errors) ? meta.errors : [];

  const combinedErrors = config.errorMessage
    ? [config.errorMessage, ...metaErrors]
    : metaErrors;

  const errorMessage =
    Array.isArray(combinedErrors) && combinedErrors.length > 0
      ? combinedErrors.join(', ')
      : undefined;

  const fallbackLabelReference = useRef(
    `label-${meta.descriptionId ?? `descriptionId-fallback-${name}`}`,
  );

  const labelOrFallback = config.label ?? fallbackLabelReference.current;

  const ariaTextFieldProperties = {
    'aria-describedby': meta.descriptionId,
    'aria-details': get(config, ['aria-details']),
    'aria-errormessage': errorMessage,
    'aria-label': labelOrFallback,
    'aria-labelledby': labelOrFallback,
    autoCapitalize: get(config, ['autoCapitalize'], 'off'),
    defaultValue: get(config, ['defaultValue'], meta.initialValue as string),
    errorMessage,
    htmlFor: labelOrFallback,
    isInvalid: get(config, ['isInvalid'], !meta.valid),
    label,
    name: get(meta, ['name'], name),
    validationBehavior: get(config, ['validationBehavior'], 'aria'),
  };

  const {
    labelProps,
    inputProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    ...restTextFieldProperties
  } = useTextField(ariaTextFieldProperties, inputReference);

  const combinedInputProperties = mergeProps({
    ...inputProps,
    'aria-invalid': get(inputProps, ['aria-invalid'], false),
    ref: inputReference,
  });

  const validationDetails = composeAriaValidityState(
    restTextFieldProperties.validationDetails,
  );

  return {
    labelProps: {
      ...labelProps,
      children: config.label,
      htmlFor: labelOrFallback,
      required,
    },
    inputProps: combinedInputProperties,
    descriptionProps: {
      ...descriptionProps,
      children: config.description,
      id: meta.descriptionId,
    },
    errorMessageProps: {
      ...errorMessageProps,
      id: meta.errorId,
      children: errorMessage,
    },
    isInvalid: !meta.valid,
    validationDetails,
    validationErrors,
  };
};
