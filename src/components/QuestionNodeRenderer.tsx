import { get } from 'lodash-es';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { QuestionNode } from '../lib';
import { TextFieldNode } from './variants/TextFieldNode';

export interface QuestionNodeRendererProperties {
  question: QuestionNode;
}

const componentMap = {
  TEXT: TextFieldNode,
};

export const QuestionNodeRenderer = (
  properties: QuestionNodeRendererProperties,
): React.ReactNode => {
  const { question } = properties;
  const { variant, hidden } = question;

  const MappedVariant = get(componentMap, [variant as string], 'TEXT');

  return (
    <div className={twMerge('', (hidden as boolean) && 'z-30 bg-amber-200/20')}>
      <MappedVariant question={question} />
    </div>
  );
};
