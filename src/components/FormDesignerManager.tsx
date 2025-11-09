import {
  AnimateMotionPresence,
  Panel,
} from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import { Button } from '@kurocado-studio/ui-react-research-and-development';
import React from 'react';

import { useFormKitStore } from '../application/useFormikStore';
import { useFormDesignerContext } from '../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../enums';
import { FormNodeEditor } from './forms/FormNode.form';
import { TextFieldNodeForm } from './forms/TextFieldNode.form.tsx';

export function FormDesignerManager(): React.ReactNode {
  const {
    size: { innerWidth },
  } = useWindowSize();
  const { questionIdBeingEdited, formIdBeingEdited } = useFormKitStore(
    (state) => state,
  );
  const { formDesignerState } = useFormDesignerContext();

  const Component =
    innerWidth < 1024 ? SlideOutPanel : FormDesignerEditorWrapper;

  return (
    <Component>
      <AnimateMotionPresence
        mode='wait'
        isVisible={!!formIdBeingEdited || !!questionIdBeingEdited}
      >
        {formDesignerState === FormDesignerPanelsEnum.FORM && (
          <FormNodeEditor key='form-panel' />
        )}
        {formDesignerState === FormDesignerPanelsEnum.QUESTION && (
          <TextFieldNodeForm key={questionIdBeingEdited} />
        )}
      </AnimateMotionPresence>
    </Component>
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
      <div className='absolute right-8 bottom-8 left-8'>
        <Button fullWidth onClick={handleQuestionSelectorPanel}>
          Close Panel
        </Button>
      </div>
    </Panel>
  );
}

function FormDesignerEditorWrapper(
  properties: React.PropsWithChildren,
): React.ReactNode {
  return properties.children;
}
