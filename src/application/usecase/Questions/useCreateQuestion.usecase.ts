import { useAxios } from '@kurocado-studio/axios-react';
import { type Question, VariantEnum } from '@kurocado-studio/formkit-ui-models';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import {
  EMPTY_QUESTION_NODE,
  KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
} from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type {
  QuestionCreatorPayload,
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
    ): Promise<Question> => {
      const { question, variant } = payload;

      const data = {
        question,
        variant,
      };

      try {
        resetState();
        const question: Question = await createQuestionHandler({
          url: `/api/v1/organizations/${KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT}/forms/${formIdBeingEdited}/sections/${sectionIdBeingEdited}/questions`,
          method: 'POST',
          //   @ts-expect-error while we sync typings
          data,
        });

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
        return EMPTY_QUESTION_NODE;
      }
    };

    const executeCreateTextFieldQuestion: ReturnType<UseCreateQuestionUseCase>['executeCreateTextFieldQuestion'] =
      async (payload) => {
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
