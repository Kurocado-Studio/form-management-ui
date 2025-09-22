import { useAxios } from '@kurocado-studio/axios-client-react';
import * as React from 'react';

import { axiosHtmlFormsService } from '../../config/htmlFormsServiceInstance';

export const useFormKitService = () => {
  const [forms, setForms] = React.useState();

  const [{ data, isLoading, error }, handler] = useAxios({
    axiosInstance: axiosHtmlFormsService,
  });

  React.useEffect(() => {
    const shouldGetData = [
      !isLoading,
      data === undefined,
      error === undefined,
    ].every((isTrue) => isTrue);

    if (shouldGetData) {
      handler({ url: '/forms/demo', method: 'GET' }).then();
    }
  }, [data, handler, error, isLoading]);

  const createQuestion = React.useCallback(() => {

      const dfdf = '/form/{formId}/sections/{sectionId}/questions'
  }, []);

  return {
    createQuestion,
  };
};
