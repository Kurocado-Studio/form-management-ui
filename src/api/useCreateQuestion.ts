import { useAxios } from '@kurocado-studio/axios-client-react';
import {
  type Form,
  type Question,
  type QuestionCreatorDto,
  type Section,
  type VariantCreatorDto,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';

import { axiosHtmlFormsService } from '../config/axiosHtmlFormsService';
import type { TextFieldQuestionCreatorDto, UseCreateQuestion } from '../types';

export const useCreateQuestion: UseCreateQuestion = () => {
  const [createQuestionState, createQuestionHandler] = useAxios<Question>({
    axiosInstance: axiosHtmlFormsService,
  });

  const createQuestion = async (payload: {
    form: Form;
    section: Section;
    question: QuestionCreatorDto;
    variant: VariantCreatorDto;
  }): Promise<Question> => {
    const { question, variant, form, section } = payload;

    const formId = get(form, ['id'], '');
    const sectionId = get(section, ['id'], '');

    createQuestionState.resetState();

    return createQuestionHandler({
      url: `/forms/${formId}/sections/${sectionId}/questions`,
      method: 'POST',
      data: {
        // @ts-expect-error while we fix typings
        question,
        // @ts-expect-error while we fix typings
        variant,
      },
    });
  };

  const createTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<Question> => {
    const { form, question, section, variantPayload } = payload;

    return createQuestion({
      form,
      section,
      question,
      variant: {
        variantPayload,
        variantType: VariantEnum.TEXT,
      },
    });
  };

  return {
    createTextFieldQuestion,
  };
};
