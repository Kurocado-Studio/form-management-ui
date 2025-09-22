import { FormProvider, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React from 'react';
import { type ZodObject, type ZodRawShape, z } from 'zod';
import {twMerge} from "tailwind-merge";

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

      const { payload, status, error } = validationResults;

      console.log({ validationResults });
      if (status === 'success') {
        //triggers 'props.handle success(payload)'
        return validationResults;
      }
      //triggers 'props.handle error(payload)'
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
