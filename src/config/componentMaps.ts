// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import { FormDesignerManagerPanel } from '../components/FormDesignerManagerPanel';
import { FormNodeEditor } from '../components/forms/FormNode.form';
import { QuestionCreatorPanel } from '../components/panels/QuestionCreatorPanel';
import { QuestionEditorSelector } from '../components/questions/QuestionEditorSelector';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../enums';
import type {
  FormDesignerComponentMap,
  PanelsAndModalsMapComponentMap,
} from '../types';

export const panelsAndModalsMap: PanelsAndModalsMapComponentMap = {
  [ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL]: FormDesignerManagerPanel,
  [ModalsAndPanelsViewsEnum.QUESTION_SELECTOR_PANEL]: QuestionCreatorPanel,
  [FormDesignerPanelsEnum.UNKNOWN]: () => null,
};

export const formDesignerComponentMap: FormDesignerComponentMap = {
  [FormDesignerPanelsEnum.QUESTION]: QuestionEditorSelector,
  [FormDesignerPanelsEnum.FORM]: FormNodeEditor,
  [FormDesignerPanelsEnum.SECTION]: () => null,
  [FormDesignerPanelsEnum.UNKNOWN]: () => null,
};
