// @ts-expect-error while we fix typings
import type { AxiosDataState, AxiosState } from '@kurocado-studio/axios-react';
import type {
  Form,
  Question,
  QuestionCreatorDto,
  Section,
  VariantCreatorDto,
} from '@kurocado-studio/formkit-ui-models';
import type { PolymorphicMotionProperties } from '@kurocado-studio/react-design-system';
import type React from 'react';
import { type ZodTypeAny, z } from 'zod';
import type { StoreApi } from 'zustand';

import type { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from './enums';
import type { FormNodeFormSchema } from './schemas/formNode.schema.ts';
import { textFieldNodeFormSchema } from './schemas/textFieldNode.schema.ts';

export type StoreCreator<T> = (
  set: StoreApi<T>['setState'],
  get: StoreApi<T>['getState'],
  api: StoreApi<T>,
) => T;

export interface FormDesignerEditorDto {
  questionBeingEdited: Question;
  formBeingEdited: Form;
  sectionBeingEdited: Section;
}

export type UseReadQuestionUseCase = () => {
  executeReadQuestion: (payload: { question: Question }) => void;
};

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

export type FormsNodeTree = Record<
  string,
  Omit<Form, 'sections'> & {
    sections: Record<string, SectionNodeTree>;
  }
>;

export type FormsNodeTreeFallback = {
  [formId: string]: Omit<Form, 'sections'> & {
    sections: {
      [sectionId: string]: SectionNodeTree;
    };
  };
};

export type FormsNode = {
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

export interface FormsStore {
  formIdBeingEdited: string | undefined;
  formsNodeTree: FormsNodeTree;
  getFormByIdState: ApiState;
  handleUpdateFormsStoreApiState: (
    apiState: ApiState,
    name: FormsStoreApiNames,
  ) => void;
  handleUpdateFormsNodeTree: (payload: FormsNodeTree) => void;
  handleSetFormBeingEdited: (payload: { id: string | undefined }) => void;
  handleComposeFormsNodeTree: (payload: { forms: Array<Form> }) => void;
  handleAddQuestionToForm: (payload: { question: Question }) => void;
}

export interface QuestionCreatorPayload extends Record<string, unknown> {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export type UseCreateQuestionUseCase = () => {
  executeCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<Question>;
};

export interface FormViewContextType {
  panelsAndModalsState: PanelsAndModalsMap;
  handlePanelsAndModalsState: (view: ModalsAndPanelsViewsEnum) => void;
}

export interface FormDesignerContext {
  formDesignerState: FormDesignerPanelsEnum;
  handleFormDesignerState: (view: FormDesignerPanelsEnum) => void;
}

export interface QuestionsStore {
  createQuestionState: ApiState;
  questionIdBeingEdited: string | undefined;
  handleSetQuestionToBeEdited: (payload: { id?: string }) => void;
  handleUpdateQuestionsStoreApiState: (
    apiState: ApiState,
    name: QuestionStoreApiNames,
  ) => void;
}

export type UseReadFormUseCase = () => {
  executeReadForm: (payload: {
    id?: string;
    shouldOpenFormDesignerPanel?: boolean;
  }) => void;
};

export type UseUpdateFormUseCase = () => {
  executeUpdateForm: (payload: FormUpdaterDto) => void;
};

export type UseGetFormByIdUseCase = () => {
  executeGetFormById: (payload: { id: string }) => Promise<FormsNodeTree>;
};

export interface SectionsStore {
  sectionIdBeingEdited: string | undefined;
  handleUpdateSectionBeingEdited: (payload: { id: string }) => void;
}

export type PanelsAndModalsMapComponentMap = {
  [k in ModalsAndPanelsViewsEnum]: React.FC;
};

export type PanelsAndModalsMap = {
  [k in ModalsAndPanelsViewsEnum]: boolean;
};

export interface JSONViewerProperties extends PolymorphicMotionProperties {
  payload?: unknown;
}

export interface TextFieldNodeUpdaterSchema extends Record<string, unknown> {
  question: string;
}

export type TextFieldNodeUpdaterSchemaShape = {
  [K in keyof TextFieldNodeUpdaterSchema]: ZodTypeAny;
};

export type TextFieldNodeSchema = z.infer<typeof textFieldNodeFormSchema>;
