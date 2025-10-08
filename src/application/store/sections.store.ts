import type { SectionsStore, StoreCreator } from '../../types';

export const sectionsStore: StoreCreator<SectionsStore> = (setState) => {
  return {
    sectionIdBeingEdited: undefined,
    handleUpdateSectionBeingEdited: ({ id }) => {
      setState({ sectionIdBeingEdited: id });
    },
  };
};
