import { VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { Card } from '@kurocado-studio/react-design-system';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitStore } from '../application/useFormikStore';
import { useCreateTextFieldQuestionUseCase } from '../application/usecase/Questions/useCreateQuestion.usecase';
import type { TextFieldQuestionCreatorDto } from '../types';

export function QuestionCreator(): React.ReactNode {
  const { composeApiLoadingState, composePaths, formsNodeTree } =
    useFormKitStore((state) => state);

  const { isAnyLoading } = composeApiLoadingState();
  const { toQuestions } = composePaths();

  const { executeCreateTextFieldQuestion } =
    useCreateTextFieldQuestionUseCase();

  const comingSoonProperties = {
    fullWidth: true,
    disabled: true,
    variant: 'secondary',
  };

  const numberOfQuestions = Object.keys(
    get(formsNodeTree, toQuestions, {}),
  ).length;

  const question = `Untitled Question ${numberOfQuestions}`;
  const name = `question${numberOfQuestions}`;

  const emptyQuestionCreatorPayload: TextFieldQuestionCreatorDto = {
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
  };

  return (
    <Card className='relative block h-full overflow-y-auto'>
      <Card.Body className={'space-y-2'}>
        <Button
          disabled={isAnyLoading}
          fullWidth
          variant='secondary'
          onClick={() => {
            executeCreateTextFieldQuestion(emptyQuestionCreatorPayload).then();
          }}
        >
          Text Field
        </Button>
        <Button {...comingSoonProperties}>Checkbox (soon)</Button>
        <Button {...comingSoonProperties}>Radio (soon)</Button>
        <Button {...comingSoonProperties}>Dropdown (soon)</Button>
      </Card.Body>
    </Card>
  );
}
