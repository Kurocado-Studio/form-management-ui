import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { get, set } from 'lodash-es';

import type { QuestionsStoreSlice } from '../../types';

export function createQuestionHandler(payload: {
  question: Question;
  store: QuestionsStoreSlice;
}): QuestionsStoreSlice {
  const { store, question } = payload;

  const { formsNodeTree, formIdBeingEdited, sectionIdBeingEdited } = store;

  const updatedState = { ...store };

  const createdQuestionPath = [
    formIdBeingEdited,
    'sections',
    sectionIdBeingEdited,
    'questions',
  ];

  const updatedQuestionMap = {
    ...get(formsNodeTree, createdQuestionPath, {}),
    [question.id]: question,
  };

  set(updatedState, createdQuestionPath, updatedQuestionMap);

  return updatedState;
}
