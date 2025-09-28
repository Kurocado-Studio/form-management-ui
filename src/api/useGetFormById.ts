import { useAxios } from '@kurocado-studio/axios-client-react';
import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import React from 'react';

import { axiosHtmlFormsService } from '../config/axiosHtmlFormsService';
import type { UseGetFormById } from '../types';

export const useGetFormById: UseGetFormById = () => {
  const [formById, getSingleFormHandler] = useAxios<Form>({
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
