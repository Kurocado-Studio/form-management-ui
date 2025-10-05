import { VariantEnum } from '@kurocado-studio/html-form-service-ui-config';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { useCreateTextFieldQuestionUseCase } from '../application/usecase/Questions/useCreateQuestion.usecase';
import { useFormKitStore } from '../store/useFormikStore';

export function QuestionCreator(): React.ReactNode {
  const sectionBeingEdited = 'sectionBeingEdited';

  const { createQuestionState } = useFormKitStore((state) => state);

  const { executeCreateTextFieldQuestion } =
    useCreateTextFieldQuestionUseCase();

  const comingSoonProperties = {
    fullWidth: true,
    disabled: true,
    variant: 'secondary',
  };

  const numberOfQuestions = get(sectionBeingEdited, ['questions', 'length'], 0);

  const question = `Untitled Question ${numberOfQuestions}`;
  const name = `question${numberOfQuestions}`;

  return (
    <div className='flex h-full flex-col space-y-2'>
      <Button
        disabled={createQuestionState.isLoading}
        fullWidth
        variant='secondary'
        onClick={() => {
          executeCreateTextFieldQuestion({
            question: {
              hidden: false,
              description: 'None provided',
              name,
              question,
              required: false,
              variant: VariantEnum.TEXT,
            },
            variant: {
              variantType: VariantEnum.TEXT,
              variantPayload: {
                name,
              },
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
