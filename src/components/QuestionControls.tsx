import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Button,
  Card,
} from '@kurocado-studio/ui-react-research-and-development';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

export interface QuestionControls {
  className?: string;
  id?: string;
  setQuestionToEdit: (
    question: Record<string, unknown>,
    shouldTriggerPanel: boolean,
  ) => void;
  question: Record<string, unknown>;
}

export function QuestionControls(
  properties: React.PropsWithChildren<QuestionControls>,
): React.ReactNode {
  const { size } = useWindowSize();

  const shouldTriggerMobilePanel = size.innerWidth < 1024;

  const handleFocus = (): void => {
    properties.setQuestionToEdit(properties.question, shouldTriggerMobilePanel);
  };

  return (
    <Card
      id={properties.id}
      className={twMerge(
        properties.className,
        'focus:outline-none focus:ring-2 focus:ring-purple-600',
      )}
      onFocus={!shouldTriggerMobilePanel ? handleFocus : undefined}
      role='button'
      tabIndex={0}
    >
      <Card.Body>{properties.children}</Card.Body>
      {shouldTriggerMobilePanel ? (
        <Card.Footer>
          <Button
            variant='secondary'
            onClick={() =>
              properties.setQuestionToEdit(properties.question, true)
            }
          >
            Edit
          </Button>
        </Card.Footer>
      ) : null}
    </Card>
  );
}
