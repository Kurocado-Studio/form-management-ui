import {
  type Question,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { TextFieldNode } from './questions/TextFieldNode';

export interface QuestionNodeTypeRendererProperties {
  questionBeingEdited: Question;
}

const questionTypeComponentMap = {
  [VariantEnum.TEXT]: TextFieldNode,
};

export function QuestionTypeManager(
  properties: QuestionNodeTypeRendererProperties,
): React.ReactNode {
  const { questionBeingEdited } = properties;
  const variant = get(properties, ['questionBeingEdited', 'variant']);
  const hidden = get(properties, ['questionBeingEdited', 'hidden']);

  const MappedQuestionType = get(
    questionTypeComponentMap,
    [variant],
    () => null,
  );

  return (
    <div className={twMerge(hidden && 'z-30 bg-amber-200/20')}>
      <MappedQuestionType question={questionBeingEdited} />
    </div>
  );
}
