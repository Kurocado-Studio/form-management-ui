// @ts-expect-error while we fix typings
import type { AxiosDataState } from '@kurocado-studio/axios-client-react';
import type {
  Form,
  Question,
  QuestionCreatorDto,
  QuestionCreatorPayload,
  Section,
} from '@kurocado-studio/html-form-service-ui-config';

import type { FormNodeFormSchema } from './components/forms/FormNode.schema';
import type { TextFieldNodeUpdaterSchema } from './components/questions/TextFieldNode.schema';

export interface FormDesignerEditorDto {
  questionBeingEdited: Question;
  formBeingEdited: Form;
  sectionBeingEdited: Section;
}

export interface TextFieldQuestionCreatorDto {
  form: Form;
  section: Section;
  question: QuestionCreatorDto;
  variantPayload: QuestionCreatorPayload['variant']['variantPayload'];
}

export interface TextFieldQuestionUpdaterDto {
  formBeingEdited: Form;
  sectionBeingEdited: Section;
  questionBeingEdited: Question;
  updatedProperties: TextFieldNodeUpdaterSchema;
}

export interface FormUpdaterDto {
  formBeingEdited: Form;
  updatedProperties: FormNodeFormSchema;
}

export type UseGetFormById = () => {
  formById: AxiosDataState<Record<string, unknown>>;
  getFormById: (id: string) => Promise<Form>;
};

export type UseCreateQuestion = () => {
  createTextFieldQuestion: (payload: {
    form: Form;
    section: Section;
    question: QuestionCreatorDto;
    variantPayload: QuestionCreatorPayload['variant']['variantPayload'];
  }) => Promise<Question>;
};
