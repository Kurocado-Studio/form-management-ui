import {
  TextArea as BaseTextArea,
  Label,
} from '@kurocado-studio/ui-react-research-and-development';
import { useAriaTextArea } from '@kurocado-studio/web-forms-react';
import React from 'react';

export function TextArea(
  properties: {
    name: string;
    label?: string;
    description?: string;
  } & Partial<HTMLElementTagNameMap['textarea']>,
): React.ReactNode {
  const { labelProps, textAreaProps, descriptionProps, errorMessageProps } =
    useAriaTextArea(properties);

  return (
    <>
      <Label {...labelProps} />
      <BaseTextArea {...textAreaProps} />
      <p className='block w-full' {...descriptionProps} />
      <span className='block w-full text-red-700' {...errorMessageProps} />
    </>
  );
}
