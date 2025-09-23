import { get, set } from 'lodash-es';
import * as React from 'react';

import type { QuestionNode } from '../lib';
import type { TextFieldQuestionCreatorDto } from '../types';
import { useCreateQuestion } from './api/useCreateQuestion';
import { useGetFormById } from './api/useGetFormById';

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

  const addTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<QuestionNode> => {
    const { form, section } = payload;

    const newlyCreatedQuestion = await createTextFieldQuestion({
      form,
      section,
      question: payload.question,
      variantPayload: payload.variantPayload,
    });

    const updatedForm = { ...form };

    const currentQuestions = get(updatedForm, ['sections', 0, 'questions'], []);

    set(
      updatedForm,
      ['sections', 0, 'questions'],
      [...currentQuestions, newlyCreatedQuestion],
    );

    setFormBeingEdited(updatedForm);
    setSectionBeingEdited(get(form, ['sections', 0], []));
    setQuestionBeingEdited(newlyCreatedQuestion);

    return newlyCreatedQuestion;
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
