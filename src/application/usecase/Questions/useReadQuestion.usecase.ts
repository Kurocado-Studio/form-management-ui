import { useWindowSize } from '@kurocado-studio/react-utils';
import { get } from 'lodash-es';

import { VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type { UseReadQuestionUseCase } from '../../../types';
import { scrollToElement } from '../../../utils/scrollToElement';
import { useFormKitStore } from '../../useFormikStore';

export const useReadQuestionUseCase: UseReadQuestionUseCase = () => {
  const { handleSetQuestionToBeEdited } = useFormKitStore((state) => state);
  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();
  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { QUESTION } = FormDesignerPanelsEnum;
  const { size } = useWindowSize();

  const shouldTriggerMobilePanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const executeReadQuestion: ReturnType<UseReadQuestionUseCase>['executeReadQuestion'] =
    (payload) => {
      const id = get(payload, ['question', 'id']);

      handleSetQuestionToBeEdited({ id });
      handleFormDesignerState(QUESTION);
      scrollToElement(id);

      if (shouldTriggerMobilePanel) {
        handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
      }
    };

  return { executeReadQuestion };
};
