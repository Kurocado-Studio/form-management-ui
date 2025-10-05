import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { Card } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';

export interface QuestionControls {
  className?: string;
  id?: string;
  question: Question;
}

export function QuestionControls(
  properties: React.PropsWithChildren<QuestionControls>,
): React.ReactNode {
  const { size } = useWindowSize();
  const { question } = properties;
  const { executeReadQuestion } = useFormKitService();
  const shouldTriggerMobilePanel = size.innerWidth < 1024;

  const handleFocus = (): void => {
    executeReadQuestion({ question });
  };

  return (
    <Card
      id={question.id}
      className={twMerge(
        properties.className,
        'focus:outline-none focus:ring-2 focus:ring-purple-600',
      )}
      onFocus={!shouldTriggerMobilePanel ? handleFocus : undefined}
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
