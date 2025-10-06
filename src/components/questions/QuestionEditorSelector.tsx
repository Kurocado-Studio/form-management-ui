import { get } from 'lodash-es';
import React from 'react';

import type { FormDesignerEditorDto } from '../../types';
import {
  TextFieldNodeForm,
  type TextFieldNodeFormProperties,
  type TextFieldQuestionUpdaterHandler,
} from './TextFieldNode.form';

export interface QuestionEditorSelectorProperties
  extends FormDesignerEditorDto {
  handleUpdateQuestion: TextFieldQuestionUpdaterHandler;
}

type QuestionEditorComponentMap = {
  TEXT: React.FC<TextFieldNodeFormProperties>;
};

const questionEditorComponentMap: QuestionEditorComponentMap = {
  TEXT: TextFieldNodeForm,
};

export function QuestionEditorSelector(
  properties: React.PropsWithChildren<QuestionEditorSelectorProperties>,
): React.ReactNode {
  const {
    formBeingEdited,
    handleUpdateQuestion,
    sectionBeingEdited,
    questionBeingEdited,
  } = properties;

  const questionType = get(questionBeingEdited, ['variant'], 'TEXT') as string;

  const QuestionEditor = get(
    questionEditorComponentMap,
    [questionType],
    'TEXT',
  );
  return (
    <QuestionEditor
      handleUpdateQuestion={handleUpdateQuestion}
      formBeingEdited={formBeingEdited}
      questionBeingEdited={questionBeingEdited}
      sectionBeingEdited={sectionBeingEdited}
      questionType={questionType}
    />
  );
}
