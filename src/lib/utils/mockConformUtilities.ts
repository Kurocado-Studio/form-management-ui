import type { FormValue } from '@conform-to/dom';
import type { FieldMetadata, FormMetadata } from '@conform-to/react';
import { get } from 'lodash-es';
import { vi } from 'vitest';

export const composeRandomId = (): string => new Date().toISOString();

export const mockFieldMetadata = <
  FieldSchema = string,
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FieldMetadata<FieldSchema, FormSchema, FormError>>,
): FieldMetadata<FieldSchema, FormSchema, FormError> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    ...(config ? { ...config } : {}),
    ...(config?.initialValue ? { initialValue: config.initialValue } : {}),
    defaultChecked: get(config, ['defaultChecked'], false),
    allErrors: get(config, ['allErrors'], {}),
    defaultOptions: get(config, ['defaultOptions'], []),
    descriptionId: get(config, ['descriptionId'], ''),
    dirty: get(config, ['dirty'], false),
    errorId: get(config, ['errorId'], composeRandomId()),
    errors: get(config, ['errors']),
    formId: get(config, ['formId'], composeRandomId()),
    id: get(config, ['id'], composeRandomId()),
    key: get(config, ['key']),
    name: get(config, ['name'], `test-name-${composeRandomId()}`),
    valid: get(config, ['valid'], true),
    value: get(config, ['value'], ''),
    defaultValue: get(config, ['defaultValue']),
  };
};

export const mockFormMetadata = <
  FormSchema extends Record<string, unknown> = Record<string, unknown>,
  FormError = string[],
>(
  config?: Partial<FormMetadata<FormSchema, FormError>>,
): FormMetadata<FormSchema, FormError> => {
  return {
    allErrors: get(config, ['allErrors'], {}),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    context: {},
    descriptionId: '',
    dirty: false,
    errorId: '',
    errors: undefined,
    getFieldset: get(config, ['getFieldset'], vi.fn()),
    id: get(config, ['id'], composeRandomId()),
    initialValue: get(config, ['initialValue'], '') as FormValue<FormSchema>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    insert: get(config, ['insert'], vi.fn()),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: get(config, ['insert'], composeRandomId()),
    name: get(config, ['name'], ''),
    noValidate: get(config, ['noValidate'], true),
    onSubmit: get(config, ['onSubmit'], vi.fn()),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    remove: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reorder: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reset: vi.fn(),
    status: get(config, ['status'], 'success'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    update: vi.fn(),
    valid: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validate: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    value: get(config, ['value']),
  };
};
