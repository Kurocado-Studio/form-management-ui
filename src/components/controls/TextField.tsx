import {
  Input,
  Label,
} from '@kurocado-studio/ui-react-research-and-development';
import { useAriaTextField } from '@kurocado-studio/web-forms-react';
import React from 'react';

export function TextField(
  properties: {
    name: string;
    label?: string;
    description?: string;
  } & Partial<HTMLElementTagNameMap['input']>,
): React.ReactNode {
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useAriaTextField(properties);

  return (
    <>
      <Label {...labelProps} />
      <Input {...inputProps} />
      <p className='block w-full' {...descriptionProps} />
      <span className='block w-full text-red-700' {...errorMessageProps} />
    </>
  );
}
