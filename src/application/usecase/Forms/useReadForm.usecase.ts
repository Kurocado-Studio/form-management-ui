import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type { UseReadFormUseCase } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

export const useReadFormUseCase: UseReadFormUseCase = () => {
  const { handleSetFormBeingEdited, handleSetQuestionToBeEdited } =
    useFormKitStore();

  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();

  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { FORM } = FormDesignerPanelsEnum;

  const executeReadForm: ReturnType<UseReadFormUseCase>['executeReadForm'] = ({
    id,
    shouldOpenFormDesignerPanel,
  }) => {
    if (id === undefined) return;

    handleSetQuestionToBeEdited({ id: undefined });
    handleSetFormBeingEdited({ id });
    handleFormDesignerState(FORM);

    if (shouldOpenFormDesignerPanel) {
      handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
    }
  };

  return { executeReadForm };
};
