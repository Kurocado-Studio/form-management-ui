import { FormProvider, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React from 'react';
import { z } from 'zod';

export type HtmlFormProperties = {
  children: React.ReactNode;
  className?: string;
} & Parameters<typeof useForm>[0];

const schema = z.object({
  MY_INPUT: z.string().email('Incorrect email format'),
  MY_INPUT_TWO: z.enum(['General', 'Bugs', 'Collab']),
});

export function HtmlForm({
  children,
  className,
  ...useFormOptions
}: HtmlFormProperties): React.ReactNode {
  const [htmlFormProperties] = useForm({
    ...useFormOptions,
    onValidate({ formData }) {
      const validationResults = parseWithZod(formData, { schema });

      const { payload, status, error } = validationResults;

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
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
