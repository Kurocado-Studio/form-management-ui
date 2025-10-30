import { VariantEnum } from '@kurocado-studio/html-form-service-ui-config';
import {
  Button,
  FadeIn,
} from '@kurocado-studio/ui-react-research-and-development';
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
    <FadeIn as={'div'} className='flex h-full flex-col space-y-2'>
      <FadeIn staggerOrder={0} fadeInDirection={'UP'}>
        <Button
          fullWidth
          disabled={isAnyLoading}
          variant='secondary'
          onClick={() => {
            executeCreateTextFieldQuestion(emptyQuestionCreatorPayload).then();
          }}
        >
          Text Field
        </Button>
      </FadeIn>
      <FadeIn staggerOrder={2} fadeInDirection={'UP'}>
        <Button {...comingSoonProperties}>Checkbox (soon)</Button>
      </FadeIn>
      <FadeIn staggerOrder={3} fadeInDirection={'UP'}>
        <Button {...comingSoonProperties}>Radio (soon)</Button>
      </FadeIn>
      <FadeIn staggerOrder={4} fadeInDirection={'UP'}>
        <Button {...comingSoonProperties}>Dropdown (soon)</Button>
      </FadeIn>
    </FadeIn>
  );
}
