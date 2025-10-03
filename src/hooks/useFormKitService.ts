import type {
  Form,
  Question,
  Section,
} from '@kurocado-studio/html-form-service-ui-config';
import { cloneDeep, get, set } from 'lodash-es';
import * as React from 'react';

import { useCreateQuestion } from '../api/useCreateQuestion';
import { useGetFormById } from '../api/useGetFormById';
import type {
  FormUpdaterDto,
  TextFieldQuestionCreatorDto,
  TextFieldQuestionUpdaterDto,
} from '../types';

// API is in WIP
//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFormKitService = () => {
  const { createTextFieldQuestion } = useCreateQuestion();
  const { getFormById, formById } = useGetFormById();

  const [formBeingEdited, setFormBeingEdited] = React.useState<
    Form | undefined
  >(undefined);

  const [sectionBeingEdited, setSectionBeingEdited] = React.useState<
    Section | undefined
  >(undefined);

  const [questionBeingEdited, setQuestionBeingEdited] = React.useState<
    Question | undefined
  >(undefined);

  const handleGetFormById = async (id: string): Promise<void> => {
    try {
      const payload = await getFormById(id);
      setFormBeingEdited(payload);
      setSectionBeingEdited(get(payload, ['sections', 0]));
    } catch {
      setFormBeingEdited(undefined);
      setSectionBeingEdited(undefined);
    }
  };

  const handleAddTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<Question> => {
    const { form, section, variantPayload, question } = payload;

    const newlyCreatedQuestion = await createTextFieldQuestion({
      form,
      section,
      question,
      variantPayload,
    });

    const updatedForm = cloneDeep({ ...form });

    const currentQuestions = get(updatedForm, ['sections', 0, 'questions'], []);

    set(
      updatedForm,
      ['sections', 0, 'questions'],
      [...currentQuestions, newlyCreatedQuestion],
    );

    setFormBeingEdited(updatedForm);
    setSectionBeingEdited(get(updatedForm, ['sections', 0]));
    setQuestionBeingEdited(newlyCreatedQuestion);

    return newlyCreatedQuestion;
  };

  const handleUpdateQuestion = async (
    payload: TextFieldQuestionUpdaterDto,
  ): Promise<Question> => {
    const {
      formBeingEdited,
      updatedProperties,
      sectionBeingEdited,
      questionBeingEdited,
    } = payload;

    const currentQuestionId = get(questionBeingEdited, ['id'], '') as string;
    const updatedForm = cloneDeep({ ...formBeingEdited });
    const updatedSection = cloneDeep({ ...sectionBeingEdited });

    const mappedQuestionsByUuid = Object.fromEntries(
      updatedSection.questions.map((question: Question) => [
        question['id'],
        question,
      ]),
    );

    for (const [key, value] of Object.entries(updatedProperties)) {
      set(mappedQuestionsByUuid, [currentQuestionId, key], value);
    }

    const updatedQuestion = get(mappedQuestionsByUuid, [currentQuestionId]);

    set(updatedSection, ['questions'], Object.values(mappedQuestionsByUuid));

    set(updatedForm, ['sections', 0], updatedSection);

    setFormBeingEdited(updatedForm);
    setSectionBeingEdited(updatedSection);
    setQuestionBeingEdited(updatedQuestion);

    return updatedQuestion;
  };

  const handleUpdateForm = async (payload: FormUpdaterDto): Promise<Form> => {
    const { formBeingEdited, updatedProperties } = payload;

    const updatedForm = cloneDeep({ ...formBeingEdited });

    for (const [key, value] of Object.entries(updatedProperties)) {
      set(updatedForm, [key], value);
    }

    setFormBeingEdited(updatedForm);

    return updatedForm;
  };

  const isApiInProgress = [formById.isLoading].some(Boolean);

  return {
    isApiInProgress,
    formBeingEdited,
    handleUpdateForm,
    sectionBeingEdited,
    questionBeingEdited,
    formByIdState: formById,
    handleAddTextFieldQuestion,
    setSectionBeingEdited,
    handleUpdateQuestion,
    getFormById: handleGetFormById,
    setFormToEdit: setFormBeingEdited,
    setQuestionToEdit: setQuestionBeingEdited,
  };
};
