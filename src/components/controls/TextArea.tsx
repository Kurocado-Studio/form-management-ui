import {
  Label,
  TextArea as BaseTextArea,
} from '@kurocado-studio/ui-react-research-and-development';
import { useAriaTextField } from '@kurocado-studio/web-forms-react';
import React from 'react';

export function TextArea(
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
      {/*  @ts-expect-error type mismatch*/}
      <BaseTextArea {...inputProps} />
      <p className='block w-full' {...descriptionProps} />
      <span className='block w-full text-red-700' {...errorMessageProps} />
    </>
  );
}
