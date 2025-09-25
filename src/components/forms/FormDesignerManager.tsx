import { get } from 'lodash-es';
import React from 'react';

import { CurrentFormViewEnum } from '../../config/enums';
import type { FormDesignerEditorDto } from '../../types';
import {
  QuestionEditorSelector,
  type QuestionEditorSelectorProperties,
} from '../questions/QuestionEditorSelector';
// eslint-disable-next-line
import {
  type FormEditorSelectorProperties,
  FormNodeEditor,
  FormNodeUpdaterHandler,
} from './FormNode.form';

export interface FormDesignerProperties
  extends FormDesignerEditorDto,
    QuestionEditorSelectorProperties {
  currentFormView: CurrentFormViewEnum;
  handleUpdateForm: FormNodeUpdaterHandler;
}

type FormDesignerComponentMap = {
  [CurrentFormViewEnum.QUESTION]: React.FC<QuestionEditorSelectorProperties>;
  [CurrentFormViewEnum.FORM]: React.FC<FormEditorSelectorProperties>;
  [CurrentFormViewEnum.SECTION]: React.FC;
  [CurrentFormViewEnum.UNKNOWN]: React.FC;
};

const formDesignerComponentMap: FormDesignerComponentMap = {
  [CurrentFormViewEnum.QUESTION]: QuestionEditorSelector,
  [CurrentFormViewEnum.FORM]: FormNodeEditor,
  [CurrentFormViewEnum.SECTION]: () => null,
  [CurrentFormViewEnum.UNKNOWN]: () => null,
};

export function FormDesignerManager(
  properties: FormDesignerProperties,
): React.ReactNode {
  const {
    handleUpdateForm,
    handleUpdateQuestion,
    formBeingEdited,
    currentFormView,
    sectionBeingEdited,
    questionBeingEdited,
  } = properties;

  const FormDesignerEditor = get(
    formDesignerComponentMap,
    [currentFormView],
    formDesignerComponentMap[CurrentFormViewEnum.UNKNOWN],
  );

  return (
    <FormDesignerEditor
      handleUpdateForm={handleUpdateForm}
      handleUpdateQuestion={handleUpdateQuestion}
      questionBeingEdited={questionBeingEdited}
      formBeingEdited={formBeingEdited}
      sectionBeingEdited={sectionBeingEdited}
    />
  );
}
