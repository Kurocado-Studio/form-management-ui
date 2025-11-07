import {
  PolymorphicMotionElement,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import React from 'react';
import JsonView from 'react18-json-view';
import { twMerge } from 'tailwind-merge';

import { JSONViewerProperties } from '../types';

export function JsonViewer(properties: JSONViewerProperties): React.ReactNode {
  const { payload, ...rest } = properties;
  const { fadeInDefault } = useFadeAnimations();

  return (
    <PolymorphicMotionElement {...rest} {...fadeInDefault.initial}>
      <JsonView
        theme={'github'}
        className={twMerge('overflow-y-auto text-xs')}
        src={payload ?? { type: 'No data available' }}
      />
    </PolymorphicMotionElement>
  );
}
