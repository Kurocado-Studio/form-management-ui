import { type Question } from '@kurocado-studio/html-form-service-ui-config';

import { FormDesignerPanelsEnum } from '../../../enums';
import { type TextFieldQuestionCreatorDto } from '../../../types';

type QuestionCreatorReturnType = Question | undefined;

export type UseUpdateQuestionUseCase = () => {
  executeUpdateQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<QuestionCreatorReturnType>;
};

export const useUpdateQuestionUseCase: UseUpdateQuestionUseCase = () => {
  const executeUpdateQuestion = (
    questionToBeEdited: Question,
    shouldTriggerPanel: boolean,
  ): void => {
    setQuestionToEdit(questionToBeEdited);
    if (shouldTriggerPanel) {
      setIsConfigPanelOpen(true);
    }
    handleScrollToQuestionNode(questionToBeEdited?.['id'] as string);
    handlePanelsAndModalsState(FormDesignerPanelsEnum.QUESTION);
  };

  return { executeUpdateQuestion };
};
