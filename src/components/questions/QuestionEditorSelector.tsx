// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import { VariantEnum } from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitStore } from '../../application/useFormikStore';
import { TextFieldNodeForm } from './TextFieldNode.form';

type QuestionEditorComponentMap = {
  TEXT: React.FC;
};

const questionEditorComponentMap: QuestionEditorComponentMap = {
  TEXT: TextFieldNodeForm,
};

export function QuestionEditorSelector(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore();
  const { toCurrentQuestion } = composePaths();

  const questionType: VariantEnum = get(
    formsNodeTree,
    [...toCurrentQuestion, 'variant'],
    VariantEnum.TEXT,
  );

  const QuestionEditor = get(
    questionEditorComponentMap,
    [questionType],
    () => null,
  );

  return <QuestionEditor />;
}
