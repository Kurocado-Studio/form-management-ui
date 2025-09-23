import { Button } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitService } from '../hooks/useFormKitService';
import type { FormNode, SectionNode } from '../lib';

export function QuestionTypeCreator(properties: {
  formBeingEdited?: FormNode;
  sectionBeingEdited?: SectionNode;
}): React.ReactNode {
  const { formBeingEdited = {}, sectionBeingEdited = {} } = properties;
  const { addTextFieldQuestion } = useFormKitService();

  const commingSoonProperties = {
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
          addTextFieldQuestion({
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

      <pre>
        {JSON.stringify(
          get(formBeingEdited, ['sections', 0, 'questions']),
          null,
          2,
        )}
      </pre>
      <Button {...commingSoonProperties}>Checkbox (soon)</Button>
      <Button {...commingSoonProperties}>Radio (soon)</Button>
      <Button {...commingSoonProperties}>Dropdown (soon)</Button>
    </div>
  );
}
