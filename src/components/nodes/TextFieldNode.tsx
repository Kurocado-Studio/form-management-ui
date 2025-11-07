import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';

import { TextField } from '../controls/TextField.tsx';

export function TextFieldNode(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant as string, 'id']);
  const required = get(variants, [variant as string, 'required']);

  return (
    <TextField
      required={required}
      name={name}
      label={question}
      description={description}
    />
  );
}
