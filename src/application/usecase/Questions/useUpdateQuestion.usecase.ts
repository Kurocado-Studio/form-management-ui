import { type Question } from '@kurocado-studio/formkit-ui-models';
import { get, set } from 'lodash-es';

import type { TextFieldNodeUpdaterSchema } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

export type UseUpdateQuestionUseCase = () => {
  executeUpdateQuestion: (payload: {
    updatedQuestionProperties: TextFieldNodeUpdaterSchema;
  }) => void;
};

export const useUpdateQuestionUseCase: UseUpdateQuestionUseCase = () => {
  const { formsNodeTree, handleUpdateFormsNodeTree, composePaths } =
    useFormKitStore((state) => state);

  const executeUpdateQuestion: ReturnType<UseUpdateQuestionUseCase>['executeUpdateQuestion'] =
    (payload) => {
      const { toCurrentQuestion } = composePaths();
      const { updatedQuestionProperties } = payload;

      const nodeTree = { ...formsNodeTree };

      const currentQuestion: Question | undefined = get(
        nodeTree,
        toCurrentQuestion,
      );

      if (currentQuestion === undefined) return;

      for (const [key, value] of Object.entries(updatedQuestionProperties)) {
        set(currentQuestion, [key], value);
      }

      set(nodeTree, toCurrentQuestion, currentQuestion);

      handleUpdateFormsNodeTree(nodeTree);
    };

  return { executeUpdateQuestion };
};
