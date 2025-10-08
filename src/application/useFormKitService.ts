import { useGetFormByIdUseCase } from './usecase/Forms/useGetFormById.usecase';
import { useReadFormUseCase } from './usecase/Forms/useReadForm.usecase';
import { useUpdateFormUseCase } from './usecase/Forms/useUpdateForm.usecase';
import { useCreateTextFieldQuestionUseCase } from './usecase/Questions/useCreateQuestion.usecase';
import { useReadQuestionUseCase } from './usecase/Questions/useReadQuestion.usecase';
import { useUpdateQuestionUseCase } from './usecase/Questions/useUpdateQuestion.usecase';

export const useFormKitService = () => {
  const { executeGetFormById } = useGetFormByIdUseCase();
  const { executeReadForm } = useReadFormUseCase();
  const { executeReadQuestion } = useReadQuestionUseCase();
  const { executeUpdateQuestion } = useUpdateQuestionUseCase();
  const { executeUpdateForm } = useUpdateFormUseCase();
  const { executeCreateTextFieldQuestion } =
    useCreateTextFieldQuestionUseCase();

  return {
    executeUpdateForm,
    executeUpdateQuestion,
    executeReadQuestion,
    executeGetFormById,
    executeCreateTextFieldQuestion,
    executeReadForm,
  };
};
