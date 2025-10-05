import { useWindowSize } from '@kurocado-studio/react-utils';

import { VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import { useFormKitStore } from '../../../store/useFormikStore';

export const useReadFormUseCase = () => {
  const { handleSetFormBeingEdited, handleSetQuestionToBeEdited } =
    useFormKitStore();

  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();
  const { size } = useWindowSize();

  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { FORM } = FormDesignerPanelsEnum;

  const shouldTriggerMobilePanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const executeReadForm = (payload: { id: string | undefined }) => {
    const { id } = payload;

    handleSetQuestionToBeEdited({ id: undefined });
    handleSetFormBeingEdited({ id });
    handleFormDesignerState(FORM);

    if (shouldTriggerMobilePanel) {
      handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
    }
  };

  return { executeReadForm };
};
