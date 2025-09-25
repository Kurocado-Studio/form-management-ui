import { get } from 'lodash-es';
import React from 'react';

import { CurrentFormViewEnum } from '../../config/enums';
import type { FormDesignerEditorDto } from '../../types';
import {
  QuestionEditorSelector,
  type QuestionEditorSelectorProperties,
} from '../questions/QuestionEditorSelector';

export interface FormDesignerProperties
  extends FormDesignerEditorDto,
    QuestionEditorSelectorProperties {
  currentFormView: CurrentFormViewEnum;
}

type FormDesignerComponentMap = {
  [CurrentFormViewEnum.QUESTION]: React.FC<QuestionEditorSelectorProperties>;
  [CurrentFormViewEnum.FORM]: React.FC;
  [CurrentFormViewEnum.SECTION]: React.FC;
};

const formDesignerComponentMap: FormDesignerComponentMap = {
  [CurrentFormViewEnum.QUESTION]: QuestionEditorSelector,
  [CurrentFormViewEnum.FORM]: () => {
    return <p>formBeingEdited</p>;
  },
  [CurrentFormViewEnum.SECTION]: () => null,
};

export function FormDesignerManager(
  properties: FormDesignerProperties,
): React.ReactNode {
  const {
    handleUpdateQuestion,
    formBeingEdited,
    currentFormView,
    sectionBeingEdited,
    questionBeingEdited,
  } = properties;

  const FormDesignerEditor = get(
    formDesignerComponentMap,
    [currentFormView],
    formDesignerComponentMap[CurrentFormViewEnum.FORM],
  );

  return (
    <FormDesignerEditor
      handleUpdateQuestion={handleUpdateQuestion}
      questionBeingEdited={questionBeingEdited}
      formBeingEdited={formBeingEdited}
      sectionBeingEdited={sectionBeingEdited}
    />
  );
}
