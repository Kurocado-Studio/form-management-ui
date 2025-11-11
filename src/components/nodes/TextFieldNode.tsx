import type { Question } from '@kurocado-studio/formkit-ui-models';
import { Controls } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

export function TextFieldNode(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant as string, 'id']);
  const required = get(variants, [variant as string, 'required']);

  return (
    <Controls.InputTextField
      required={required}
      name={name}
      label={question}
      description={description}
    />
  );
}
