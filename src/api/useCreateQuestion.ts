import { useAxios } from '@kurocado-studio/axios-client-react';
import { get } from 'lodash-es';

import { axiosHtmlFormsService } from '../config/axiosHtmlFormsService';
import type {
  FormNode,
  QuestionDto,
  QuestionNode,
  SectionNode,
  VariantDto,
} from '../lib';
import type { TextFieldQuestionCreatorDto, UseCreateQuestion } from '../types';

export const useCreateQuestion: UseCreateQuestion = () => {
  const [createQuestionState, createQuestionHandler] = useAxios({
    axiosInstance: axiosHtmlFormsService,
  });

  const createQuestion = async (payload: {
    form: FormNode;
    section: SectionNode;
    question: QuestionDto;
    variant: VariantDto;
  }): Promise<QuestionNode> => {
    const { question, variant, form, section } = payload;

    const formId = get(form, ['id'], '');
    const sectionId = get(section, ['id'], '');

    createQuestionState.resetState();

    return createQuestionHandler({
      url: `/forms/${formId}/sections/${sectionId}/questions`,
      method: 'POST',
      data: {
        question,
        variant,
      },
    });
  };

  const createTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<QuestionNode> => {
    const { form, question, section, variantPayload } = payload;

    return createQuestion({
      form,
      section,
      question,
      variant: {
        variantPayload,
        variantType: 'TEXT',
      },
    });
  };

  return {
    createTextFieldQuestion,
  };
};
