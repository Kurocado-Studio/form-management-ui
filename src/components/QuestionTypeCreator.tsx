import { Button } from '@kurocado-studio/ui-react-research-and-development';
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

  return (
    <div className='flex flex-col space-y-2'>
      <Button
        fullWidth
        variant='secondary'
        onClick={() => {
          handleCreateTextFieldQuestion({
            form: formBeingEdited,
            section: sectionBeingEdited,
            question: {
              hidden: false,
              hint: 'Some hinting',
              name: 'string',
              question: 'Untitled Question',
              required: true,
              tooltip: '',
              variant: 'TEXT',
            },
            variantPayload: {},
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
