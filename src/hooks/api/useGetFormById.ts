import { useAxios } from '@kurocado-studio/axios-client-react';
import React from 'react';

import { axiosHtmlFormsService } from '../../config/htmlFormsServiceInstance';
import type { UseGetFormById } from '../../types';

export const useGetFormById: UseGetFormById = () => {
  const [formById, getSingleFormHandler] = useAxios({
    axiosInstance: axiosHtmlFormsService,
  });

  const getFormById = React.useCallback(
    async (id: string) => {
      formById.resetState();
      return getSingleFormHandler({
        url: `/forms/${id}`,
        method: 'GET',
      });
    },
    [formById, getSingleFormHandler],
  );

  return {
    formById,
    getFormById,
  };
};
