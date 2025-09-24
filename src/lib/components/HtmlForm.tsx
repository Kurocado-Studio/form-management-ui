import type { SubmissionResult } from '@conform-to/dom';
import { type DefaultValue, FormProvider, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { type ZodObject, type ZodRawShape } from 'zod';

export interface HTMLErrorSubmissionResult<T extends Record<string, unknown>>
  extends Omit<SubmissionResult, 'error'> {
  error: {
    [K in keyof T]?: Array<string> | null;
  };
}

export type HtmlFormProperties<T extends Record<string, unknown>> = {
  children?: React.ReactNode;
  schema: ZodObject<ZodRawShape>;
  className?: string;
  defaultValue?: DefaultValue<T>;
  onSuccess?: (payload: T) => void;
  onError?: (payload: HTMLErrorSubmissionResult<T>) => void;
} & Omit<Parameters<typeof useForm>[0], 'onValidate' | 'defaultValue'>;

export function HtmlForm<T extends Record<string, unknown>>({
  children,
  className,
  schema,
  onSuccess,
  onError,
  ...useFormOptions
}: HtmlFormProperties<T>): React.ReactNode {
  const [htmlFormProperties] = useForm({
    ...useFormOptions,
    onValidate({ formData }) {
      const validationResults = parseWithZod(formData, { schema });
      const { status } = validationResults;

      switch (status) {
        case 'error':
          onError?.(validationResults as HTMLErrorSubmissionResult<T>);
          return validationResults;
        case 'success':
          onSuccess?.(validationResults.payload as T);
          return validationResults;
        case undefined: {
          const errors = validationResults.error || {};
          const hasErrors = Object.keys(errors).length > 0;

          if (hasErrors) {
            onError?.(validationResults as HTMLErrorSubmissionResult<T>);
            return validationResults;
          }

          onSuccess?.(validationResults.payload as T);
          return validationResults;
        }
      }
    },
  });

  return (
    <FormProvider context={htmlFormProperties.context}>
      <form
        {...htmlFormProperties}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          htmlFormProperties.onSubmit(event);
        }}
        id={htmlFormProperties.id}
        className={twMerge('contents', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
