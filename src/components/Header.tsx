import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import {
  Avatar,
  Button,
  Grid,
} from '@kurocado-studio/ui-react-research-and-development';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';
import { useFormKitStore } from '../application/useFormikStore';
import { CONTAINER_MAX_WIDTH, GRID_LAYOUT } from '../config/constants';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { ModalsAndPanelsViewsEnum } from '../enums';

const { QUESTION_SELECTOR_PANEL } = ModalsAndPanelsViewsEnum;

export function Header(): React.ReactNode {
  const { getFormByIdState, formIdBeingEdited } = useFormKitStore();

  const { executeReadForm } = useFormKitService();

  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();

  const { fadeInBottom, fadeInDefault } = useFadeAnimations();

  return (
    <>
      <Grid
        {...GRID_LAYOUT}
        {...fadeInBottom.initial}
        className={twMerge(
          'z-20 rounded-full bg-white p-1',
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
        <header className='col-span-5 w-full'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={() => handlePanelsAndModalsState(QUESTION_SELECTOR_PANEL)}
          >
            Add Question
          </Button>
        </header>
        <div className='col-span-5 col-start-8 flex w-full justify-end'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={() => executeReadForm({ id: formIdBeingEdited })}
          >
            Form Settings
          </Button>
        </div>
      </Grid>
    </>
  );
}
