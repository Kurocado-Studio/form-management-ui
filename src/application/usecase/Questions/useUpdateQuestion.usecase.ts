import { type Question } from '@kurocado-studio/html-form-service-ui-config';
import { get, set } from 'lodash-es';

import type { TextFieldNodeUpdaterSchema } from '../../../components/questions/TextFieldNode.schema';
import { useFormKitStore } from '../../../store/useFormikStore';

export type UseUpdateQuestionUseCase = () => {
  executeUpdateQuestion: (payload: {
    updatedQuestionProperties: TextFieldNodeUpdaterSchema;
  }) => void;
};

export const useUpdateQuestionUseCase: UseUpdateQuestionUseCase = () => {
  const { formsNodeTree, handleUpdateFormsNodeTree, composePaths } =
    useFormKitStore((state) => state);

  const executeUpdateQuestion = (payload: {
    updatedQuestionProperties: TextFieldNodeUpdaterSchema;
  }): void => {
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
