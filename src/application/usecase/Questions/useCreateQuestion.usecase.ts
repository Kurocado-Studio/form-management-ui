import { useAxios } from '@kurocado-studio/axios-react';
import {
  type Question,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type {
  QuestionCreatorPayload,
  QuestionCreatorReturnType,
  TextFieldQuestionCreatorDto,
  UseCreateQuestionUseCase,
} from '../../../types';
import { scrollToElement } from '../../../utils/scrollToElement';
import { useFormKitStore } from '../../useFormikStore';

export const useCreateTextFieldQuestionUseCase: UseCreateQuestionUseCase =
  () => {
    const { QUESTION } = FormDesignerPanelsEnum;
    const { UNKNOWN } = ModalsAndPanelsViewsEnum;

    const { panelsAndModalsState, handlePanelsAndModalsState } =
      usePanelsAndModalsContext();

    const [{ resetState, error, isLoading }, createQuestionHandler] =
      useAxios<Question>({
        axiosInstance: axiosFormKitInstance,
      });

    const isQuestionSelectorOpen = panelsAndModalsState.QUESTION_SELECTOR_PANEL;

    const { handleFormDesignerState } = useFormDesignerContext();

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
        const question: Question | undefined = await createQuestionHandler({
          url: `/forms/${formIdBeingEdited}/sections/${sectionIdBeingEdited}/questions`,
          method: 'POST',
          //   @ts-expect-error while we sync typings
          data,
        });

        if (question === undefined) return;

        const { id } = question;

        handleAddQuestionToForm({ question });
        handleSetQuestionToBeEdited({ id });
        scrollToElement(id);
        handleFormDesignerState(QUESTION);

        if (isQuestionSelectorOpen) {
          handlePanelsAndModalsState(UNKNOWN);
        }
        return question;
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
