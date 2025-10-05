import { get, set } from 'lodash-es';

import { useFormKitStore } from '../../../store/useFormikStore';
import type { FormUpdaterDto } from '../../../types';

export const useUpdateFormUseCase = () => {
  const { formsNodeTree, composePaths, handleUpdateFormsNodeTree } =
    useFormKitStore();

  const executeUpdateForm = (payload: FormUpdaterDto): void => {
    const { updatedProperties } = payload;
    const updatedNodeTree = { ...formsNodeTree };
    const { toCurrentForm } = composePaths();

    const updatedForm = get(updatedNodeTree, toCurrentForm);

    if (updatedForm === undefined) return;

    for (const [key, value] of Object.entries(updatedProperties)) {
      set(updatedForm, [key], value);
    }

    handleUpdateFormsNodeTree(updatedNodeTree);
  };

  return { executeUpdateForm };
};
