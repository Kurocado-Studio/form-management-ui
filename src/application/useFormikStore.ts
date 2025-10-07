import { get } from 'lodash-es';
import { create } from 'zustand';

import { FormsStore, QuestionsStore, SectionsStore } from '../types';
import { formsStore } from './store/forms.store';
import { questionsStore } from './store/questions.store';
import { sectionsStore } from './store/sections.store';

export type FormKitStore = FormsStore &
  QuestionsStore &
  SectionsStore & {
    composeApiLoadingState: () => {
      getFormById: boolean;
      createQuestion: boolean;
      isAnyLoading: boolean;
    };
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
  composeApiLoadingState: () => {
    const state = storeParameters[1]();

    const getFormById = get(state, ['getFormByIdState', 'isLoading'], false);
    const createQuestion = get(
      state,
      ['createQuestionState', 'isLoading'],
      false,
    );
    const isAnyLoading = [getFormById, createQuestion].some(Boolean);

    return {
      getFormById,
      createQuestion,
      isAnyLoading,
    };
  },
  composePaths: () => {
    const state = storeParameters[1]();

    const formId = state.formIdBeingEdited ?? '';
    const sectionId = state.sectionIdBeingEdited ?? '';
    const questionId = state.questionIdBeingEdited ?? '';

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
