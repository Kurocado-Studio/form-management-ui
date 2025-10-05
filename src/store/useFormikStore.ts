import { create } from 'zustand';

import type {
  FormsStoreSlice,
  QuestionsStoreSlice,
  SectionsStoreSlice,
} from '../types';
import { composeFormsStoreSlice } from './Forms/composeFormsStoreSlice';
import { composeQuestionStoreSlice } from './Questions/composeQuestionStoreSlice';
import { composeSectionsStoreSlice } from './Sections/composeSectionsStoreSlice';

export type FormKitStore = FormsStoreSlice &
  QuestionsStoreSlice &
  SectionsStoreSlice;

export const useFormKitStore = create<FormKitStore>((...storeParameters) => ({
  ...composeQuestionStoreSlice(...storeParameters),
  ...composeSectionsStoreSlice(...storeParameters),
  ...composeFormsStoreSlice(...storeParameters),
}));
