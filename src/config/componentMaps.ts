// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import { FormDesignerManager } from '../components/FormDesignerManager.tsx';
import { QuestionCreatorPanel } from '../components/QuestionCreatorPanel.tsx';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../enums';
import type { PanelsAndModalsMapComponentMap } from '../types';

export const panelsAndModalsMap: PanelsAndModalsMapComponentMap = {
  [ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL]: FormDesignerManager,
  [ModalsAndPanelsViewsEnum.QUESTION_SELECTOR_PANEL]: QuestionCreatorPanel,
  [FormDesignerPanelsEnum.UNKNOWN]: () => null,
};
