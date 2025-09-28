import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { TextFieldNode } from './questions/TextFieldNode';

export interface QuestionNodeTypeRendererProperties {
  questionBeingEdited: Question;
}

const questionTypeComponentMap = {
  TEXT: TextFieldNode,
};

export function QuestionTypeManager(
  properties: QuestionNodeTypeRendererProperties,
): React.ReactNode {
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
}
