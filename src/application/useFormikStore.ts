import { create } from 'zustand';

import type {
  FormsStoreSlice,
  QuestionsStoreSlice,
  SectionsStoreSlice,
} from '../types';
import { formsStore } from './store/forms.store';
import { questionsStore } from './store/questions.store';
import { sectionsStore } from './store/sections.store';

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
  ...questionsStore(...storeParameters),
  ...sectionsStore(...storeParameters),
  ...formsStore(...storeParameters),
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
