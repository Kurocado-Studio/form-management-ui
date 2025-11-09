import { DirectionEnum, Panel } from '@kurocado-studio/react-design-system';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import * as React from 'react';

import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext.tsx';
import { ModalsAndPanelsViewsEnum } from '../enums.ts';
import { QuestionCreator } from './QuestionCreator.tsx';

const { QUESTION_SELECTOR_PANEL } = ModalsAndPanelsViewsEnum;

export function QuestionCreatorPanel(): React.ReactNode {
  const { handlePanelsAndModalsState, panelsAndModalsState } =
    usePanelsAndModalsContext();

  const handleQuestionSelectorPanel = (): void => {
    handlePanelsAndModalsState(QUESTION_SELECTOR_PANEL);
  };

  return (
    <Panel
      anchor={'left'}
      onEnterDirection={DirectionEnum.LEFT}
      onExitDirection={DirectionEnum.LEFT}
      triggerPanel={handleQuestionSelectorPanel}
      isOpen={panelsAndModalsState[QUESTION_SELECTOR_PANEL]}
    >
      <QuestionCreator />
      <div className='absolute right-8 bottom-8 left-8'>
        <Button fullWidth onClick={handleQuestionSelectorPanel}>
          Close Panel
        </Button>
      </div>
    </Panel>
  );
}
