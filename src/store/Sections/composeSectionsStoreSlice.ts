import { set } from 'lodash-es';

import type { SectionsStoreSlice, StoreSliceCreator } from '../../types';

export const composeSectionsStoreSlice: StoreSliceCreator<
  SectionsStoreSlice
> = (setState) => {
  return {
    sectionIdBeingEdited: undefined,
    handleUpdateSectionBeingEdited: ({ id }) => {
      setState((prevState) => {
        const updatedState = { ...prevState };
        set(updatedState, ['sectionIdBeingEdited'], id);
        return updatedState;
      });
    },
  };
};
