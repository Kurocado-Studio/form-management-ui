import { get, set } from 'lodash-es';

import type { FormsNodeTree, FormsStoreSlice } from '../../types';

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
