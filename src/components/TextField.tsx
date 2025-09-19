// components/TextField.tsx
import React from 'react';

import { useAriaTextField } from '../lib';

export function TextField(properties: {
  name: string;
  label?: string;
  description?: string;
}) {
  // const { inputProps } = useConformTextField(properties);
  const { inputProps } = useAriaTextField(properties);

  return (
    <>
      <input className={'w-full h-10 bg-red-100'} {...inputProps} />
    </>
  );
}
