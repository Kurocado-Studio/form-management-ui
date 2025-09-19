// lib/hooks/useConformTextField.ts
import { useField } from '@conform-to/react';
import { useRef } from 'react';
import { useTextField } from 'react-aria';

type UseConformTextFieldProps = {
  name: string;
  label?: string;
  description?: string;
};

export function useConformTextField({
  name,
  label,
  description,
}: UseConformTextFieldProps) {
  const inputReference = useRef(null);
  const [meta] = useField(name);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        ...meta,
        label,
        description,
        errorMessage: meta.errors?.toString(),
        isRequired: meta.required,
        isInvalid: Boolean(meta.errors),
        name: meta.name,
        // optionally pass defaultValue or value here too
      },
      inputReference,
    );

  return {
    labelProps,
    inputProps: {
      ...inputProps,
      ref: inputReference,
    },
    descriptionProps,
    errorMessageProps,
  };
}
