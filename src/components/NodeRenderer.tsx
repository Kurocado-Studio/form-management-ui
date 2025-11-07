// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import {
  type Question,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { TextFieldNode } from '@/src/components/nodes/TextFieldNode';

export interface QuestionNodeTypeRendererProperties {
  questionBeingEdited: Question;
}

const nodeComponentMap = {
  [VariantEnum.TEXT]: TextFieldNode,
};

export function NodeRenderer(
  properties: QuestionNodeTypeRendererProperties,
): React.ReactNode {
  const { questionBeingEdited } = properties;
  const variant = get(properties, ['questionBeingEdited', 'variant']);
  const hidden = get(properties, ['questionBeingEdited', 'hidden']);

  const MappedQuestionType = get(nodeComponentMap, [variant], () => null);

  return (
    <div className={twMerge(hidden && 'z-30 bg-amber-200/20')}>
      <MappedQuestionType question={questionBeingEdited} />
    </div>
  );
}
