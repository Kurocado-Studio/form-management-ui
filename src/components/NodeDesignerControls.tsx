// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import type { Question } from '@kurocado-studio/formkit-ui-models';
import {
  Card,
  type CardProperties,
} from '@kurocado-studio/react-design-system';
import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';
import { useFormKitStore } from '../application/useFormikStore';

export interface QuestionControls extends CardProperties {
  className?: string;
  id?: string;
  question: Question;
}

export function NodeDesignerControls(
  properties: React.PropsWithChildren<QuestionControls>,
): React.ReactNode {
  const { executeReadQuestion } = useFormKitService();
  const { size } = useWindowSize();

  const { questionIdBeingEdited } = useFormKitStore((store) => store);

  const { fadeInDefault } = useFadeAnimations();

  const { question, className, ...restProperties } = properties;

  const shouldTriggerMobilePanel = size.innerWidth < 1024;

  const handleFocus = (): void => {
    executeReadQuestion({ question });
  };

  return (
    <Card
      {...fadeInDefault.initial}
      {...restProperties}
      id={question.id}
      className={twMerge(
        'cursor-pointer',
        className,
        question.id === questionIdBeingEdited &&
          'ring-2 ring-blue-600 outline-none',
        'outline-none hover:bg-gray-50',
        question.id === questionIdBeingEdited
          ? 'hover:ring-2 hover:ring-blue-600'
          : 'hover:ring-1 hover:ring-blue-400',
      )}
      onFocus={shouldTriggerMobilePanel ? undefined : handleFocus}
      role='button'
      tabIndex={0}
    >
      <Card.Header>{properties.children}</Card.Header>
      {shouldTriggerMobilePanel ? (
        <Card.Footer>
          <Button variant='secondary' onClick={handleFocus}>
            Edit
          </Button>
        </Card.Footer>
      ) : null}
    </Card>
  );
}
