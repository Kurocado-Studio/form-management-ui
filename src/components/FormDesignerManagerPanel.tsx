import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Button,
  Card,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import React from 'react';

import {
  FormDesignerManager,
  type FormDesignerProperties,
} from './forms/FormDesignerManager';

export interface FormDesignerManagerPanelProperties
  extends FormDesignerProperties {
  isOpen: boolean;
  handleTriggerPanel: (isOpen: boolean) => void;
}

function CardPanel(properties: React.PropsWithChildren): React.ReactNode {
  return (
    <Card className='hidden lg:block z-20 md:w-full md:col-span-4 overflow-y-auto h-full'>
      <Card.Body>{properties.children}</Card.Body>
    </Card>
  );
}

function SlideOutPanel(
  properties: React.PropsWithChildren<
    Pick<FormDesignerManagerPanelProperties, 'handleTriggerPanel' | 'isOpen'>
  >,
): React.ReactNode {
  const { handleTriggerPanel, isOpen, children } = properties;
  return (
    <Panel triggerPanel={handleTriggerPanel} isOpen={isOpen}>
      {children}
      <div className='sticky bottom-8 right-8'>
        <Button fullWidth onClick={handleTriggerPanel}>
          Close Panel
        </Button>
      </div>
    </Panel>
  );
}

export function FormDesignerManagerPanel(
  properties: FormDesignerManagerPanelProperties,
): React.ReactNode {
  const { handleTriggerPanel, isOpen, ...rest } = properties;

  const {
    size: { innerWidth },
  } = useWindowSize();

  const Component = innerWidth < 1024 ? SlideOutPanel : CardPanel;

  return (
    <Component handleTriggerPanel={handleTriggerPanel} isOpen={isOpen}>
      <FormDesignerManager {...rest} />
    </Component>
  );
}
