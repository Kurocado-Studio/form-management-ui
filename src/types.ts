import type { AxiosDataState } from '@kurocado-studio/axios-client-react';

import type {
  OnErrorHandler,
  OnSuccessHandler,
} from './hooks/useFormKitService';
import type { FormNode, QuestionDto, TextFieldVariantDto } from './lib';

type CommonApiHandlers = {
  onSuccess?: OnSuccessHandler;
  onError?: OnErrorHandler;
};

export type UseGetFormById = () => {
  formById: AxiosDataState<Record<string, unknown>>;
  getFormById: (id: string) => Promise<FormNode>;
};

export type UseCreateQuestion = (payload: CommonApiHandlers) => {
  createTextFieldQuestion: (payload: {
    formId: string;
    sectionId: string;
    question: QuestionDto;
    variantPayload: TextFieldVariantDto;
  }) => Promise<void>;
};
