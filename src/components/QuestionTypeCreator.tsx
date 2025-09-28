import type {
  Form,
  Section,
} from '@kurocado-studio/html-form-service-ui-config';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { EMPTY_FORM_NODE, EMPTY_SECTION_NODE } from '../config/constants';
import type { TextFieldQuestionCreatorDto } from '../types';

export function QuestionTypeCreator(properties: {
  formBeingEdited?: Form;
  sectionBeingEdited?: Section;
  isApiInProgress?: boolean;
  handleCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<void>;
}): React.ReactNode {
  const {
    formBeingEdited,
    isApiInProgress,
    sectionBeingEdited,
    handleCreateTextFieldQuestion,
  } = properties;

  const comingSoonProperties = {
    fullWidth: true,
    disabled: true,
    variant: 'secondary',
  };

  const numberOfQuestions = get(sectionBeingEdited, ['questions', 'length'], 0);

  const question = `Untitled Question ${numberOfQuestions}`;
  const name = `question${numberOfQuestions}`;

  return (
    <div className='flex flex-col h-screen space-y-2'>
      <Button
        disabled={isApiInProgress}
        fullWidth
        variant='secondary'
        onClick={() => {
          handleCreateTextFieldQuestion({
            form: formBeingEdited || EMPTY_FORM_NODE,
            section: sectionBeingEdited || EMPTY_SECTION_NODE,
            question: {
              hidden: false,
              description: 'None provided',
              name,
              question,
              required: false,
            },
            variantPayload: {
              name,
            },
          }).then();
        }}
      >
        Text Field
      </Button>
      <Button {...comingSoonProperties}>Checkbox (soon)</Button>
      <Button {...comingSoonProperties}>Radio (soon)</Button>
      <Button {...comingSoonProperties}>Dropdown (soon)</Button>
    </div>
  );
}
