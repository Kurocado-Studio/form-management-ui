import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import React from 'react';

import { axiosFormKitInstance } from '../config/axiosFormKitInstance';
import type { UseGetFormById } from '../types';

export const useGetFormById: UseGetFormById = () => {
  const [formById, getSingleFormHandler] = useAxios<Form>({
    axiosInstance: axiosFormKitInstance,
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
