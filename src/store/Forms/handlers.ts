import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { get, set } from 'lodash-es';

import type {
  ApiState,
  FormsNodeTree,
  FormsStoreApiNames,
  FormsStoreSlice,
} from '../../types';

export function getFormByIdHandler(payload: {
  formNode: FormsNodeTree;
  store: FormsStoreSlice;
}): FormsStoreSlice {
  const { store, formNode } = payload;

  const updatedState = { ...store };

  const updatedQuestionMap = {
    ...get(updatedState, ['formsNodeTree'], {}),
    ...formNode,
  };

  set(updatedState, ['formsNodeTree'], updatedQuestionMap);

  return updatedState;
}

export const addQuestionToFormHandler = (payload: {
  formId: string;
  sectionId: string;
  question: Question;
  store: FormsStoreSlice;
}): FormsStoreSlice => {
  const { store, formId, sectionId, question } = payload;

  const updatedState = { ...store };

  const currentQuestions = get(
    updatedState,
    ['formsNodeTree', formId, 'sections', sectionId, 'questions'],
    {},
  );

  set(
    updatedState,
    ['formsNodeTree', formId, 'sections', sectionId, 'questions'],
    { ...currentQuestions, [question.id]: question },
  );

  return updatedState;
};

export const updateFormsStoreApiStateHandler = (payload: {
  apiState: ApiState;
  name: FormsStoreApiNames;
  store: FormsStoreSlice;
}): FormsStoreSlice => {
  const { name, apiState, store } = payload;

  const formsStoreApiMap: Record<FormsStoreApiNames, string> = {
    getFormByIdState: 'getFormByIdState',
  };

  const updatedFormStore = { ...store };

  const apiStateSelected = get(formsStoreApiMap, [name]);

  set(updatedFormStore, [apiStateSelected], apiState);

  return updatedFormStore;
};
