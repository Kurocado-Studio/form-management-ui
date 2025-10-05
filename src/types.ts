// @ts-expect-error while we fix typings
import type { AxiosDataState, AxiosState } from '@kurocado-studio/axios-react';
import type {
  QuestionCreatorPayload as BaseQuestionCreatorPayload,
  Form,
  Question,
  QuestionCreatorDto,
  Section,
  VariantCreatorDto,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import type React from 'react';
import type { StoreApi } from 'zustand';

import type { FormNodeFormSchema } from './components/forms/FormNode.schema';
import type { TextFieldNodeUpdaterSchema } from './components/questions/TextFieldNode.schema';
import type { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from './enums';

export type StoreSliceCreator<T> = (
  set: StoreApi<T>['setState'],
  get: StoreApi<T>['getState'],
  api: StoreApi<T>,
) => T;

export interface FormDesignerEditorDto {
  questionBeingEdited: Question;
  formBeingEdited: Form;
  sectionBeingEdited: Section;
}

export interface TextFieldQuestionCreatorDto {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export interface TextFieldQuestionUpdaterDto {
  formBeingEdited: Form;
  sectionBeingEdited: Section;
  questionBeingEdited: Question;
  updatedQuestion: TextFieldNodeUpdaterSchema;
}

export interface FormUpdaterDto {
  updatedProperties: FormNodeFormSchema;
}

export type UseGetFormById = () => {
  formById: AxiosDataState<Form>;
  getFormById: (id: string) => Promise<Form>;
};

export type FormsNodeTree = {
  [formId: string]: Omit<Form, 'sections'> & {
    sections: {
      [sectionId: string]: SectionNodeTree;
    };
  };
};

export interface SectionNodeTree extends Omit<Section, 'questions'> {
  questions: {
    [questionId: string]: Question;
  };
}

export type ApiState = Pick<
  AxiosState<Record<string, unknown>>,
  'isLoading' | 'error'
>;

export type FormsStoreApiNames = 'getFormByIdState';

export type QuestionStoreApiNames = 'createQuestionState';

export interface FormsStoreSlice {
  formIdBeingEdited: string | undefined;
  formsNodeTree: FormsNodeTree;
  getFormByIdState: ApiState;
  handleUpdateFormsStoreApiState: (
    apiState: ApiState,
    name: FormsStoreApiNames,
  ) => void;
  handleUpdateFormsNodeTree: (payload: FormsNodeTree) => void;
  handleSetFormBeingEdited: (payload: { id: string | undefined }) => void;
  handleGetFormById: (payload: { formNodeTree: FormsNodeTree }) => void;
  handleComposeFormsNodeTree: (payload: { forms: Array<Form> }) => void;
  handleAddQuestionToForm: (payload: {
    sectionId: string | undefined;
    question: Question;
  }) => void;
}

export interface QuestionCreatorPayload extends Record<string, unknown> {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export type QuestionCreatorReturnType = Question | undefined;

export type UseCreateQuestionUseCase = () => {
  executeCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<QuestionCreatorReturnType>;
};

export interface FormViewContextType {
  panelsAndModalsState: PanelsAndModalsMap;
  handlePanelsAndModalsState: (view: ModalsAndPanelsViewsEnum) => void;
}

export interface FormDesignerContext {
  formDesignerState: FormDesignerPanelsEnum;
  handleFormDesignerState: (view: FormDesignerPanelsEnum) => void;
}

export interface QuestionsStoreSlice {
  createQuestionState: ApiState;
  questionIdBeingEdited: string | undefined;
  handleSetQuestionToBeEdited: (payload: { id: string | undefined }) => void;
  handleUpdateQuestionsStoreApiState: (
    apiState: ApiState,
    name: QuestionStoreApiNames,
  ) => void;
  handleCreateQuestion: <T extends VariantEnum = VariantEnum.TEXT>(
    payload: BaseQuestionCreatorPayload<T>,
  ) => void;
}

export interface SectionsStoreSlice {
  sectionIdBeingEdited: string | undefined;
  handleUpdateSectionBeingEdited: (payload: { id: string | undefined }) => void;
}

export type FormDesignerComponentMap = {
  [k in FormDesignerPanelsEnum]: React.FC;
};

export type PanelsAndModalsMapComponentMap = {
  [ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL]: React.FC;
  [ModalsAndPanelsViewsEnum.QUESTION_SELECTOR_PANEL]: React.FC;
  [ModalsAndPanelsViewsEnum.UNKNOWN]: React.FC;
};

export type PanelsAndModalsMap = {
  [k in ModalsAndPanelsViewsEnum]: boolean;
};

export type FormDesignerContextState = {
  [k in FormDesignerPanelsEnum]: boolean;
};
