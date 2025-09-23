// @ts-ignore
// @ts-ignore
import { useAxios } from '@kurocado-studio/axios-client-react';
import { get } from 'lodash-es';

import { axiosHtmlFormsService } from '../../config/htmlFormsServiceInstance';
import type {
  FormNode,
  QuestionDto,
  SectionNode,
  TextFieldVariantDto,
  UseCreateQuestion,
  VariantDto,
} from '../../lib';

export const useCreateQuestion: UseCreateQuestion = () => {
  const [createQuestionState, createQuestionHandler] = useAxios({
    axiosInstance: axiosHtmlFormsService,
  });

  const createQuestion = async (payload: {
    form: FormNode;
    section: SectionNode;
    question: QuestionDto;
    variant: VariantDto;
  }): Promise<void> => {
    const { question, variant, form, section } = payload;

    const formId = get(form, ['id'], '');
    const sectionId = get(section, ['id'], '');

    try {
      const vfcvcvcv = await createQuestionHandler({
        url: `/forms/${formId}/sections/${sectionId}/questions`,
        method: 'POST',
        data: {
          question,
          variant,
        },
      });
      console.log({ vfcvcvcv });
      // onSuccess?.(createQuestionState.data);
    } catch {
      // onError?.(undefined);
    } finally {
      createQuestionState.resetState();
    }
  };

  const createTextFieldQuestion = async (payload: {
    form: FormNode;
    section: SectionNode;
    question: QuestionDto;
    variantPayload: TextFieldVariantDto;
  }): Promise<void> => {
    const { form, question, section, variantPayload } = payload;

    await createQuestion({
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
