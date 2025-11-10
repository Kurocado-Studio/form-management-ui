import { get, set } from 'lodash-es';

import { UseUpdateFormUseCase } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

export const useUpdateFormUseCase: UseUpdateFormUseCase = () => {
  const { formsNodeTree, composePaths, handleUpdateFormsNodeTree } =
    useFormKitStore();

  const executeUpdateForm: ReturnType<UseUpdateFormUseCase>['executeUpdateForm'] =
    (payload) => {
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
