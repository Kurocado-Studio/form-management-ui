import { FormProvider, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { type ZodObject, type ZodRawShape, z } from 'zod';

export type HtmlFormProperties = {
  children: React.ReactNode;
  schema: ZodObject<ZodRawShape>;
  className?: string;
} & Parameters<typeof useForm>[0];

export function HtmlForm({
  children,
  className,
  schema,
  ...useFormOptions
}: HtmlFormProperties): React.ReactNode {
  const [htmlFormProperties] = useForm({
    ...useFormOptions,
    onValidate({ formData }) {
      const validationResults = parseWithZod(formData, { schema });

      const { status } = validationResults;

      console.log({ validationResults });
      if (status === 'success') {
        return validationResults;
      }
      return validationResults;
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
