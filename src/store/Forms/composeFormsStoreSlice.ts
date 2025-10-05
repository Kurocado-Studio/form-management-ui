import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { get, set } from 'lodash-es';

import { DEFAULT_API_STATE, EMPTY_NODE_TREE } from '../../config/constants';
import type {
  FormsNodeTree,
  FormsStoreSlice,
  StoreSliceCreator,
} from '../../types';
import { useFormKitStore } from '../useFormikStore';
import { composeFormsNodeTree } from './composeFormsNodeTree';
import {
  getFormByIdHandler,
  updateFormsStoreApiStateHandler,
} from './handlers';

export const composeFormsStoreSlice: StoreSliceCreator<FormsStoreSlice> = (
  setState,
  getState,
) => {
  return {
    getFormByIdState: DEFAULT_API_STATE,
    formIdBeingEdited: undefined,
    formsNodeTree: EMPTY_NODE_TREE,
    handleGetFormById: (payload: { formNodeTree: FormsNodeTree }) => {
      const updatedFormStore = getFormByIdHandler({
        formNode: payload.formNodeTree,
        store: getState(),
      });

      setState(updatedFormStore);
    },
    handleSetFormBeingEdited: ({ id }) => {
      setState((prevState) => {
        const updatedState = { ...prevState };
        set(updatedState, ['formIdBeingEdited'], id);
        return updatedState;
      });
    },
    handleUpdateFormsStoreApiState: (payload, name) => {
      const updatedFormStore = updateFormsStoreApiStateHandler({
        name,
        apiState: payload,
        store: getState(),
      });

      setState(updatedFormStore);
    },
    handleComposeFormsNodeTree: ({ forms }) => {
      setState((prevState) => ({
        ...prevState,
        formsNodeTree: composeFormsNodeTree(forms),
      }));
    },
    handleUpdateFormsNodeTree: (formsNodeTree) => {
      setState({ formsNodeTree });
    },
    handleAddQuestionToForm: (payload: { question: Question }) => {
      const { toQuestions } = useFormKitStore.getState().composePaths();
      const { question } = payload;

      const formsNodeTree = { ...getState().formsNodeTree };

      const currentQuestions = get(formsNodeTree, toQuestions, {});

      set(formsNodeTree, toQuestions, {
        ...currentQuestions,
        [question.id]: question,
      });

      setState({ formsNodeTree });
    },
  };
};
