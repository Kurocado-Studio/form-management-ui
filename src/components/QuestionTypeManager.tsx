import { get } from 'lodash-es';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { QuestionNode } from '../lib';
import { TextFieldNode } from './questions/TextFieldNode';

export interface QuestionNodeTypeRendererProperties {
  questionBeingEdited: QuestionNode;
}

const questionTypeComponentMap = {
  TEXT: TextFieldNode,
};

export const QuestionTypeManager = (
  properties: QuestionNodeTypeRendererProperties,
): React.ReactNode => {
  const { questionBeingEdited } = properties;
  const { variant, hidden } = questionBeingEdited;

  const MappedQuestionType = get(
    questionTypeComponentMap,
    [variant as string],
    'TEXT',
  );

  return (
    <div className={twMerge('', (hidden as boolean) && 'z-30 bg-amber-200/20')}>
      <MappedQuestionType question={questionBeingEdited} />
    </div>
  );
};
