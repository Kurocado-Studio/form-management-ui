import type { AxiosDataState } from '@kurocado-studio/axios-client-react';

import type {
  FormNode,
  QuestionDto,
  QuestionNode,
  SectionNode,
  TextFieldVariantDto,
} from './lib';

export interface TextFieldQuestionCreatorDto {
  form: FormNode;
  section: SectionNode;
  question: QuestionDto;
  variantPayload: TextFieldVariantDto;
}

export type UseGetFormById = () => {
  formById: AxiosDataState<Record<string, unknown>>;
  getFormById: (id: string) => Promise<FormNode>;
};

export type UseCreateQuestion = () => {
  createTextFieldQuestion: (payload: {
    form: FormNode;
    section: SectionNode;
    question: QuestionDto;
    variantPayload: TextFieldVariantDto;
  }) => Promise<QuestionNode>;
};
