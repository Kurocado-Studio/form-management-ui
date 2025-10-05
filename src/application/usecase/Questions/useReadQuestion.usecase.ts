import { type Question } from '@kurocado-studio/html-form-service-ui-config';
import { useWindowSize } from '@kurocado-studio/react-utils';
import { get } from 'lodash-es';

import { VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import { useFormKitStore } from '../../../store/useFormikStore';
import { scrollToElement } from '../../../utils/scrollToElement';

export type UseCreateQuestionUseCase = () => {
  executeReadQuestion: (payload: { question: Question }) => void;
};

export const useReadQuestionUseCase: UseCreateQuestionUseCase = () => {
  const { handleSetQuestionToBeEdited } = useFormKitStore((state) => state);
  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();
  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { QUESTION } = FormDesignerPanelsEnum;
  const { size } = useWindowSize();

  const shouldTriggerMobilePanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const executeReadQuestion = (payload: { question: Question }): void => {
    const id = get(payload, ['question', 'id']);

    handleSetQuestionToBeEdited({ id });
    scrollToElement(id);
    handleFormDesignerState(QUESTION);

    if (shouldTriggerMobilePanel) {
      handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
    }
  };

  return { executeReadQuestion };
};
