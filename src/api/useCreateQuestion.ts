import { useAxios } from '@kurocado-studio/axios-client-react';
import { get } from 'lodash-es';

import { axiosHtmlFormsService } from '../config/axiosHtmlFormsService';
import type {
  FormNode,
  QuestionCreatorDto,
  QuestionNode,
  SectionNode,
  VariantCreatorDto,
} from '../lib';
import type { TextFieldQuestionCreatorDto, UseCreateQuestion } from '../types';

export const useCreateQuestion: UseCreateQuestion = () => {
  const [createQuestionState, createQuestionHandler] = useAxios<QuestionNode>({
    axiosInstance: axiosHtmlFormsService,
  });

  const createQuestion = async (payload: {
    form: FormNode;
    section: SectionNode;
    question: QuestionCreatorDto;
    variant: VariantCreatorDto;
  }): Promise<QuestionNode> => {
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
