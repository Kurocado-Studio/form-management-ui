import { cloneDeep, get, set } from 'lodash-es';
import * as React from 'react';

import { useCreateQuestion } from '../api/useCreateQuestion';
import { useGetFormById } from '../api/useGetFormById';
import type { FormNode, QuestionNode, SectionNode } from '../lib';
import type {
  FormNodeUpdaterDto,
  TextFieldQuestionCreatorDto,
  TextFieldQuestionUpdaterDto,
} from '../types';

// API is in WIP
//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFormKitService = () => {
  const { createTextFieldQuestion } = useCreateQuestion();
  const { getFormById, formById } = useGetFormById();

  const [formBeingEdited, setFormBeingEdited] = React.useState<
    FormNode | undefined
  >(undefined);

  const [sectionBeingEdited, setSectionBeingEdited] = React.useState<
    SectionNode | undefined
  >(undefined);

  const [questionBeingEdited, setQuestionBeingEdited] = React.useState<
    QuestionNode | undefined
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

  const handleAddTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<QuestionNode> => {
    const { form, section, variantPayload, question } = payload;

    const newlyCreatedQuestion = await createTextFieldQuestion({
      form,
      section,
      question,
      variantPayload,
    });

    const updatedForm = { ...form };

    const currentQuestions = get(updatedForm, ['sections', 0, 'questions'], []);

    set(
      updatedForm,
      ['sections', 0, 'questions'],
      [...currentQuestions, newlyCreatedQuestion],
    );

    setFormBeingEdited(updatedForm);
    setSectionBeingEdited(get(updatedForm, ['sections', 0], []));
    setQuestionBeingEdited(newlyCreatedQuestion);

    return newlyCreatedQuestion;
  };

  const handleUpdateQuestion = async (
    payload: TextFieldQuestionUpdaterDto,
  ): Promise<void> => {
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
      updatedSection.questions.map((question: QuestionNode) => [
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

  const handleUpdateForm = async (
    payload: FormNodeUpdaterDto,
  ): Promise<FormNode> => {
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
