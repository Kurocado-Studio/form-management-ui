import { create } from 'zustand';

import type {
  FormsStoreSlice,
  QuestionsStoreSlice,
  SectionsStoreSlice,
} from '../types';
import { composeFormsStoreSlice } from './Forms/composeFormsStoreSlice';
import { composeQuestionStoreSlice } from './Questions/composeQuestionStoreSlice';
import { composeSectionsStoreSlice } from './Sections/composeSectionsStoreSlice';

export type FormKitStore = FormsStoreSlice &
  QuestionsStoreSlice &
  SectionsStoreSlice & {
    composePaths: () => {
      toCurrentForm: Array<string>;
      toCurrentSection: Array<string>;
      toSections: Array<string>;
      toCurrentQuestion: Array<string>;
      toQuestions: Array<string>;
    };
  };

export const useFormKitStore = create<FormKitStore>((...storeParameters) => ({
  ...composeQuestionStoreSlice(...storeParameters),
  ...composeSectionsStoreSlice(...storeParameters),
  ...composeFormsStoreSlice(...storeParameters),
  composePaths: () => {
    const getState = storeParameters[1];

    const formId = getState().formIdBeingEdited ?? '';
    const sectionId = getState().sectionIdBeingEdited ?? '';
    const questionId = getState().questionIdBeingEdited ?? '';

    const toCurrentForm = [formId];
    const toSections = [...toCurrentForm, 'sections'];
    const toCurrentSection = [...toSections, sectionId];
    const toQuestions = [...toCurrentSection, 'questions'];
    const toCurrentQuestion = [...toQuestions, questionId];

    return {
      toCurrentForm,
      toSections,
      toCurrentSection,
      toQuestions,
      toCurrentQuestion,
    };
  },
}));
