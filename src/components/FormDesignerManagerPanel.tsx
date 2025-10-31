import { Card } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Button,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { formDesignerComponentMap } from '../config/componentMaps';
import { useFormDesignerContext } from '../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { ModalsAndPanelsViewsEnum } from '../enums';

function CardPanel(properties: React.PropsWithChildren): React.ReactNode {
  return (
    <Card className='z-20 hidden h-full overflow-y-auto md:col-span-4 md:w-full lg:block'>
      <Card.Body>{properties.children}</Card.Body>
    </Card>
  );
}

function SlideOutPanel(properties: React.PropsWithChildren): React.ReactNode {
  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { children } = properties;

  const { handlePanelsAndModalsState, panelsAndModalsState } =
    usePanelsAndModalsContext();

  const handleQuestionSelectorPanel = (): void => {
    handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
  };

  return (
    <Panel
      triggerPanel={handleQuestionSelectorPanel}
      isOpen={panelsAndModalsState[FORM_DESIGNER_PANEL]}
    >
      {children}
      <div className='sticky right-8 bottom-8'>
        <Button fullWidth onClick={handleQuestionSelectorPanel}>
          Close Panel
        </Button>
      </div>
    </Panel>
  );
}

export function FormDesignerManagerPanel(): React.ReactNode {
  const {} = usePanelsAndModalsContext();

  const {
    size: { innerWidth },
  } = useWindowSize();

  const Component = innerWidth < 1024 ? SlideOutPanel : CardPanel;

  const { formDesignerState } = useFormDesignerContext();

  const FormDesignerEditor = get(
    formDesignerComponentMap,
    [formDesignerState],
    formDesignerComponentMap.FORM,
  );

  return (
    <Component>
      <FormDesignerEditor />
    </Component>
  );
}
