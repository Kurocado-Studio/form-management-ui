import { get } from 'lodash-es';
import React from 'react';

import type { QuestionNode } from '../../lib';
import { TextField } from '../TextField';

export const TextFieldNode = (properties: { question: QuestionNode }) => {
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
};
