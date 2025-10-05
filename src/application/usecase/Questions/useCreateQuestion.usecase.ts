import { useAxios } from '@kurocado-studio/axios-react';
import {
  type Question,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { useFormKitStore } from '../../../store/useFormikStore';
import type {
  QuestionCreatorPayload,
  QuestionCreatorReturnType,
  TextFieldQuestionCreatorDto,
  UseCreateQuestionUseCase,
} from '../../../types';
import { scrollToElement } from '../../../utils/scrollToElement';

export const useCreateTextFieldQuestionUseCase: UseCreateQuestionUseCase =
  () => {
    const [{ resetState, error, isLoading }, createQuestionHandler] =
      useAxios<Question>({
        axiosInstance: axiosFormKitInstance,
      });

    const {
      formIdBeingEdited,
      sectionIdBeingEdited,
      handleAddQuestionToForm,
      handleSetQuestionToBeEdited,
      handleUpdateQuestionsStoreApiState,
    } = useFormKitStore((state) => state);

    React.useEffect(() => {
      handleUpdateQuestionsStoreApiState(
        { isLoading, error },
        'createQuestionState',
      );
    }, [handleUpdateQuestionsStoreApiState, error, isLoading]);

    const handleCreateQuestion = async (
      payload: QuestionCreatorPayload,
    ): Promise<QuestionCreatorReturnType> => {
      const { question, variant } = payload;

      const data = {
        question,
        variant,
      };

      try {
        resetState();
        const createdQuestion: Question = await createQuestionHandler({
          url: `/forms/${formIdBeingEdited}/sections/${sectionIdBeingEdited}/questions`,
          method: 'POST',
          //   @ts-expect-error while we sync typings
          data,
        });

        if (createdQuestion === undefined) return;

        const { id } = createdQuestion;

        handleAddQuestionToForm({
          sectionId: sectionIdBeingEdited,
          question: createdQuestion,
        });
        handleSetQuestionToBeEdited({ id });
        scrollToElement(id);

        return createdQuestion;
      } catch {
        return undefined;
      }
    };

    const executeCreateTextFieldQuestion = async (
      payload: TextFieldQuestionCreatorDto,
    ): Promise<QuestionCreatorReturnType> => {
      const { question, variant } = payload;

      return handleCreateQuestion({
        question,
        variant: {
          ...variant,
          variantType: VariantEnum.TEXT,
        },
      });
    };

    return { executeCreateTextFieldQuestion };
  };
