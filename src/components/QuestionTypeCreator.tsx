import { Button } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import type { FormNode, SectionNode } from '../lib';
import type { TextFieldQuestionCreatorDto } from '../types';

export function QuestionTypeCreator(properties: {
  formBeingEdited?: FormNode;
  sectionBeingEdited?: SectionNode;
  handleCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<void>;
}): React.ReactNode {
  const {
    formBeingEdited = {},
    sectionBeingEdited = {},
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
        fullWidth
        variant='secondary'
        onClick={() => {
          handleCreateTextFieldQuestion({
            form: formBeingEdited,
            section: sectionBeingEdited,
            question: {
              hidden: false,
              name,
              question,
              required: false,
              variant: 'TEXT',
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
