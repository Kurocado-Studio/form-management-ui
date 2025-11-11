import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Avatar,
  Button,
  Grid,
} from '@kurocado-studio/ui-react-research-and-development';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';
import { useFormKitStore } from '../application/useFormikStore';
import {
  CONTAINER_MAX_WIDTH,
  GRID_LAYOUT,
  VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL,
} from '../config/constants';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { ModalsAndPanelsViewsEnum } from '../enums';

const { QUESTION_SELECTOR_PANEL } = ModalsAndPanelsViewsEnum;

export function Header(): React.ReactNode {
  const { getFormByIdState, formIdBeingEdited } = useFormKitStore();
  const { size } = useWindowSize();

  const shouldOpenFormDesignerPanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const { executeReadForm } = useFormKitService();

  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();

  const { fadeInBottom, fadeInDefault } = useFadeAnimations();

  const handleReadCurrentForm = () => {
    executeReadForm({
      id: formIdBeingEdited,
      shouldOpenFormDesignerPanel,
    });
  };

  return (
    <>
      <Grid
        as='header'
        {...GRID_LAYOUT}
        {...fadeInBottom.initial}
        className={twMerge(
          'fixed inset-x-0 z-20 rounded-full bg-white p-1 md:relative',
          CONTAINER_MAX_WIDTH,
        )}
      >
        <Avatar
          alt='kurocado-studio'
          src='https://avatars.githubusercontent.com/u/148841069?s=200&v=4'
          className='col-span-3 size-12'
        />
      </Grid>
      <Grid
        {...GRID_LAYOUT}
        {...fadeInDefault.secondary}
        className='fixed inset-x-0 top-14 z-20 p-1 lg:hidden'
      >
        <div className='col-span-5 w-full'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={() => handlePanelsAndModalsState(QUESTION_SELECTOR_PANEL)}
          >
            Add Question
          </Button>
        </div>
        <div className='col-span-5 col-start-8 flex w-full justify-end'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={handleReadCurrentForm}
          >
            Form Settings
          </Button>
        </div>
      </Grid>
    </>
  );
}
