import type { AxiosDataState } from '@kurocado-studio/axios-client-react';

import type { TextFieldNodeUpdaterSchema } from './components/questions/TextFieldNode.schema';
import type {
  FormNode,
  QuestionDto,
  QuestionNode,
  SectionNode,
  TextFieldVariantDto,
} from './lib';

export interface FormDesignerEditorDto {
  questionBeingEdited: QuestionNode;
  formBeingEdited: FormNode;
  sectionBeingEdited: SectionNode;
}

export interface TextFieldQuestionCreatorDto {
  form: FormNode;
  section: SectionNode;
  question: QuestionDto;
  variantPayload: TextFieldVariantDto;
}

export interface TextFieldQuestionUpdaterDto {
  formBeingEdited: FormNode;
  sectionBeingEdited: SectionNode;
  questionBeingEdited: QuestionNode;
  updatedProperties: TextFieldNodeUpdaterSchema;
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
