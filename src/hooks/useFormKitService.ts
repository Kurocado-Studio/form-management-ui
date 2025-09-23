import { get, set } from 'lodash-es';
import * as React from 'react';

import { FormNode, SectionNode } from '../lib';
import { useCreateQuestion } from './api/useCreateQuestion';
import { useGetFormById } from './api/useGetFormById';

export type OnSuccessHandler<
  T extends Record<string, unknown> = Record<string, unknown>,
> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type OnErrorHandler<
  T extends Record<string, unknown> = Record<string, unknown>,
> = OnSuccessHandler<T>;

export const useFormKitService = () => {
  const { createTextFieldQuestion } = useCreateQuestion();
  const { getFormById, formById } = useGetFormById();

  const [formBeingEdited, setFormBeingEdited] = React.useState<
    Record<string, unknown> | undefined
  >(undefined);

  const [sectionBeingEdited, setSectionBeingEdited] = React.useState<
    Record<string, unknown> | undefined
  >(undefined);

  const [questionBeingEdited, setQuestionBeingEdited] = React.useState<
    Record<string, unknown> | undefined
  >(undefined);

  const handleSetFormBeingEdited = (
    newlyCreatedQuestion: Record<string, unknown>,
  ) => {
    setFormBeingEdited((prevState) => {
      if (prevState === undefined) return prevState;

      const currentQuestions = get(prevState, ['sections', 0, 'question']);

      set(
        prevState,
        ['sections', 0],
        [...currentQuestions, newlyCreatedQuestion],
      );

      return prevState;
    });
  };

  const handleGetFormById = async (id: string): Promise<void> => {
    try {
      const payload = await getFormById(id);
      setFormBeingEdited(payload);
      setSectionBeingEdited(get(payload, ['sections', 0], {}));
    } catch {
      setFormBeingEdited(undefined);
      setSectionBeingEdited(undefined);
    }
  };

  const addTextFieldQuestion = async (payload: {
    form: FormNode;
    section: SectionNode;
    question: Record<string, unknown>;
    variantPayload: Record<string, unknown>;
  }): Promise<void> => {
    const { form, section } = payload;
    await createTextFieldQuestion({
      form,
      section,
      question: payload.question,
      variantPayload: payload.variantPayload,
    });
  };

  const isApiInProgress = [formById.isLoading].some(Boolean);

  return {
    isApiInProgress,
    formBeingEdited,
    sectionBeingEdited,
    questionBeingEdited,
    addTextFieldQuestion,
    formByIdState: formById,
    getFormById: handleGetFormById,
    setFormToEdit: setFormBeingEdited,
    setQuestionToEdit: setQuestionBeingEdited,
  };
};
