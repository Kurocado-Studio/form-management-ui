import {
  Avatar,
  Grid,
} from '@kurocado-studio/ui-react-research-and-development';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { CONTAINER_MAX_WIDTH, GRID_LAYOUT } from '../config/constants';

export function Header(): React.ReactNode {
  return (
    <Grid
      {...GRID_LAYOUT}
      className={twMerge('z-20 rounded-full bg-white p-1', CONTAINER_MAX_WIDTH)}
    >
      <Avatar
        alt='kurocado-studio'
        src='https://avatars.githubusercontent.com/u/148841069?s=200&v=4'
        className='col-span-3'
      />
    </Grid>
  );
}
