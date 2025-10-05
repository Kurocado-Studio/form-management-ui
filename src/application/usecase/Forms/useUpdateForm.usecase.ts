import { set } from 'lodash-es';

import { useFormKitStore } from '../../../store/useFormikStore';
import type { FormUpdaterDto } from '../../../types';

export const useUpdateFormUseCase = () => {
  const { formsNodeTree, formIdBeingEdited, handleUpdateFormsNodeTree } =
    useFormKitStore();

  const executeUpdateForm = (payload: FormUpdaterDto): void => {
    const { updatedProperties } = payload;
    const updatedNodeTree = { ...formsNodeTree };

    for (const [key, value] of Object.entries(updatedProperties)) {
      set(updatedNodeTree, [formIdBeingEdited ?? '', key], value);
    }

    handleUpdateFormsNodeTree(updatedNodeTree);
  };

  return { executeUpdateForm };
};
