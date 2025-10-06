import type { SectionsStoreSlice, StoreSliceCreator } from '../../types';

export const sectionsStore: StoreSliceCreator<SectionsStoreSlice> = (
  setState,
) => {
  return {
    sectionIdBeingEdited: undefined,
    handleUpdateSectionBeingEdited: ({ id }) => {
      setState({ sectionIdBeingEdited: id });
    },
  };
};
