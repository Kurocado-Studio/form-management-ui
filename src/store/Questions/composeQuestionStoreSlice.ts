import { get, set } from 'lodash-es';

import { DEFAULT_API_STATE } from '../../config/constants';
import type {
  QuestionStoreApiNames,
  QuestionsStoreSlice,
  StoreSliceCreator,
} from '../../types';
import { createQuestionHandler } from './handlers';

export const composeQuestionStoreSlice: StoreSliceCreator<
  QuestionsStoreSlice
> = (setState, getState) => {
  return {
    questionIdBeingEdited: undefined,
    createQuestionState: DEFAULT_API_STATE,
    handleCreateQuestion: (payload) => {
      const { variant, question } = payload;
      const formStore = createQuestionHandler({
        question,
        store: getState(),
      });
      setState(formStore);
    },
    handleSetQuestionToBeEdited: ({ id }) => {
      setState((prevState) => {
        return { ...prevState, questionIdBeingEdited: id };
      });
    },
    handleUpdateQuestionsStoreApiState: (payload, name) => {
      const questionStoreApiMap: Record<QuestionStoreApiNames, string> = {
        createQuestionState: 'createQuestionState',
      };

      setState((prevState) => {
        const updatedQuestionsStore = { ...prevState };
        const apiStateSelected = get(questionStoreApiMap, [name]);

        set(updatedQuestionsStore, [apiStateSelected], payload);

        return updatedQuestionsStore;
      });
    },
  };
};
