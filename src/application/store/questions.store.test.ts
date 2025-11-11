import { beforeEach, describe, expect, it } from 'vitest';
import { type StoreApi, createStore } from 'zustand/vanilla';

import { DEFAULT_API_STATE } from '../../config/constants';
import type { QuestionStoreApiNames, QuestionsStore } from '../../types';
import { questionsStore } from './questions.store';

describe('questionsStore', () => {
  let store: StoreApi<QuestionsStore>;

  beforeEach(() => {
    store = createStore(questionsStore);
  });

  it('should initialize with default values', () => {
    const state = store.getState();

    expect(state.questionIdBeingEdited).toBeUndefined();
    expect(state.createQuestionState).toEqual(DEFAULT_API_STATE);
  });

  it('should handle setting question to be edited', () => {
    store.getState().handleSetQuestionToBeEdited({ id: 'question-123' });

    expect(store.getState().questionIdBeingEdited).toBe('question-123');
  });

  it('should update QuestionsStore API state correctly', () => {
    const newApiState = { isLoading: true, error: undefined };

    store
      .getState()
      .handleUpdateQuestionsStoreApiState(newApiState, 'createQuestionState');

    const updatedState = store.getState();

    expect(updatedState.createQuestionState).toEqual(newApiState);
  });

  it('should not affect unrelated state when updating API state', () => {
    const initial = store.getState();

    const newApiState = { isLoading: true, error: undefined };
    store
      .getState()
      .handleUpdateQuestionsStoreApiState(newApiState, 'createQuestionState');

    const afterUpdate = store.getState();

    expect(afterUpdate.createQuestionState).toEqual(newApiState);
    expect(afterUpdate.questionIdBeingEdited).toBe(
      initial.questionIdBeingEdited,
    );
  });

  it('should safely handle invalid QuestionStoreApiNames', () => {
    const invalidApiName = 'nonExistentApiState' as QuestionStoreApiNames;

    expect(() => {
      store
        .getState()
        .handleUpdateQuestionsStoreApiState(
          { isLoading: true, error: undefined },
          invalidApiName,
        );
    }).not.toThrow();

    expect(store.getState().createQuestionState).toEqual(DEFAULT_API_STATE);
  });
});
