import {
  Button,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import * as React from 'react';

import { usePanelsAndModalsContext } from '../../context/PanelsAndModalsContext';
import { ModalsAndPanelsViewsEnum } from '../../enums';
import { QuestionCreator } from '../QuestionCreator';

export function QuestionCreatorPanel(): React.ReactNode {
  const { QUESTION_SELECTOR_PANEL } = ModalsAndPanelsViewsEnum;

  const { handlePanelsAndModalsState, panelsAndModalsState } =
    usePanelsAndModalsContext();

  const handleQuestionSelectorPanel = (): void => {
    handlePanelsAndModalsState(QUESTION_SELECTOR_PANEL);
  };

  return (
    <Panel
      triggerPanel={handleQuestionSelectorPanel}
      isOpen={panelsAndModalsState[QUESTION_SELECTOR_PANEL]}
    >
      <QuestionCreator />
      <div className='sticky bottom-8 right-8'>
        <Button fullWidth onClick={handleQuestionSelectorPanel}>
          Close Panel
        </Button>
      </div>
    </Panel>
  );
}
